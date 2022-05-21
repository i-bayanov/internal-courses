/* eslint-disable no-param-reassign */

import {
  IAdditionalAPI, IConsumerAPI, ICredentials, INetworkAPI, IServerAPI, IUser, TimerType,
} from './interfacesAndTypes';
import User from './user';

export default abstract class Server {
  private type: string;

  private name: string;

  private users: Array<IUser>;

  protected connectedUsers: Map<INetworkAPI, IUser> = new Map();

  private lastFiftyMessages: string[] = new Array(50);

  protected inactivityPeriod = 60 * 1000;

  protected node?: IConsumerAPI;

  /**
   * Abstract class for creating a server
   *
   * @param {string} type Server type, inheriting classes must implement their own type
   * @param {string} name Server name
   * @param {string} ownerName Owner login
   * @param {string} ownerPassword Owner password
   */
  constructor(type: string, name: string, ownerName: string, ownerPassword: string) {
    this.type = type;
    this.name = name;
    const owner = new User(ownerName, ownerPassword, true);
    this.users = [owner];
  }

  getName(): string {
    return `${this.type}: ${this.name}`;
  }

  connect(node: IConsumerAPI): void {
    this.node = node;
  }

  disconnect(): void {
    delete this.node;
  }

  abstract subscribe(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI;

  authenticateUser(credentials: ICredentials): [IUser, boolean] {
    const index = this.users.findIndex((user) => user.userName === credentials.userName);

    if (index === -1) {
      const { userName, password } = credentials;
      const newUser = new User(userName, password);
      this.users.push(newUser);

      return [newUser, true];
    }

    if (this.users[index].password === credentials.password) {
      return [this.users[index], false];
    }

    throw new Error('Неправильное имя пользователя или пароль');
  }

  unsubscribe(userAPI: INetworkAPI): void {
    if (!this.connectedUsers.has(userAPI)) return;

    const { userName, timer } = this.connectedUsers.get(userAPI) as IUser;
    clearTimeout(timer as TimerType);
    this.node!.sendMessageTo(userAPI, 'Вы были отключены от сервера');
    this.connectedUsers.delete(userAPI);
    this.node!.disconnectFrom(userAPI);

    if (userName) {
      this.notify(`Пользователь ${userName} был отключён от сервера`);
    }
  }

  makeUserAdmin(adminAPI: INetworkAPI, user: IUser): void {
    if (user.isAdmin) return;
    this.checkAdminPermissions(adminAPI);
    user.isAdmin = true;
    clearTimeout(user.timer as TimerType);
    let userApi = null;
    this.connectedUsers.forEach((connectedUser, connectedApi) => {
      if (connectedUser === user) {
        userApi = connectedApi;
      }
    });

    if (userApi) {
      user.timer = undefined;
      this.notify(`Пользователь ${user.userName} был назначен администратором чата`);
      this.node!.sendNewApiToConnectedNode(this.getAdminAPI(), userApi);
    }
  }

  removeUserFromAdmin(adminAPI: INetworkAPI, user: IUser): void {
    if (!user.isAdmin) return;
    if (user.isOwner) throw new Error('Недостаточно прав для совершения операции');
    this.checkAdminPermissions(adminAPI);
    user.isAdmin = false;
    let userApi: INetworkAPI | null = null;
    this.connectedUsers.forEach((connectedUser, connectedApi) => {
      if (connectedUser === user) {
        userApi = connectedApi;
      }
    });

    if (userApi) {
      user.timer = setTimeout(() => this.disconnectUser(userApi!), this.inactivityPeriod);
      this.notify(`Пользователь ${user.userName} был лишён администраторских прав`);
      this.node!.sendNewApiToConnectedNode({}, userApi);
    }
  }

  checkAdminPermissions(adminAPI: INetworkAPI): void {
    const user = this.connectedUsers.get(adminAPI);
    if (!user!.isAdmin) throw new Error('Недостаточно прав для совершения операции');
  }

  disconnectUser(userAPI: INetworkAPI): void {
    try {
      this.node!.unsubscribeNodeFromServer(userAPI);
    } catch {
      this.unsubscribe(userAPI);
    }
  }

  disableServer(ownerAPI: INetworkAPI): void {
    const user = this.connectedUsers.get(ownerAPI);
    if (!user!.isOwner) throw new Error('Недостаточно прав для совершения операции');
    this.connectedUsers.forEach((_user, api) => this.disconnectUser(api));
    this.node!.disconnect();
  }

  getLastFiftyMessages(): string {
    return this.lastFiftyMessages.reduce((acc, curr) => `${acc} + ${curr} + \n`, '');
  }

  getOnlineUsers(): string {
    const users = Array.from(this.connectedUsers.values()).map((user) => user.userName);

    return users.join('\n');
  }

  notify(message: string): void {
    if (!this.connectedUsers.size) return;
    this.connectedUsers.forEach((_, api) => this.node!.sendMessageTo(api, message));
  }

  update(from: INetworkAPI, message: string): void {
    const user = this.connectedUsers.get(from);
    if (!user!.userName) throw new Error('Вы не авторизованы на сервере и не можете отправлять сообщения');
    const now = (this.constructor as typeof Server).makeStringFromCurrentDate();
    this.notify(`${now} ${user!.userName}: ${message}`);
    if (!user!.isAdmin) {
      clearTimeout(user!.timer as TimerType);
      user!.timer = setTimeout(() => this.disconnectUser(from), this.inactivityPeriod);
    }
  }

  /**
   * API for connecting and interacting with the network
   *
   * @returns {IServerAPI} Methods getName, connect, disconnect, subscribe, unsubscribe, update
   */
  getAPI(): IServerAPI {
    return {
      getName: this.getName.bind(this),
      connect: this.connect.bind(this),
      disconnect: this.disconnect.bind(this),
      subscribe: this.subscribe.bind(this),
      unsubscribe: this.unsubscribe.bind(this),
      update: this.update.bind(this),
      public: {
        getName: this.getName.bind(this),
        subscribe: this.subscribe.bind(this),
        unsubscribe: this.unsubscribe.bind(this),
        update: this.update.bind(this),
      },
    };
  }

  /**
   * API for server admins
   *
   * @returns {IAdditionalAPI} Methods makeUserAdmin, removeUserFromAdmin
   */
  getAdminAPI(): IAdditionalAPI {
    return {
      makeUserAdmin: this.makeUserAdmin.bind(this),
      removeUserFromAdmin: this.removeUserFromAdmin.bind(this),
    };
  }

  /**
   * API for server owner
   *
   * @returns {IAdditionalAPI} Method disableServer
   */
  getOwnerAPI(): IAdditionalAPI {
    return {
      disableServer: this.disableServer.bind(this),
    };
  }

  /**
   * Static class method for adding timestamp to messages
   *
   * @returns {string} String in format [DD.MM.YYYY HH:MM:SS]
   */
  static makeStringFromCurrentDate(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `[${day}.${month}.${year} ${hours}:${minutes}:${seconds}]`;
  }
}
