import {
  IAdditionalAPI, ICredentials, INetworkAPI, IServerAPI, IUser,
} from './interfacesAndTypes';
import Server from './server';

export default class PublicServer extends Server {
  /**
   * Creates Public Server
   *
   * @param {string} name Server name
   * @param {string} ownerName Owner login
   * @param {string} ownerPassword Owner password
   */
  constructor(name: string, ownerName: string, ownerPassword: string) {
    super('Public server', name, ownerName, ownerPassword);
  }

  /**
   * Public server method to subscribe users to new messages. Guests allowed
   *
   * @param {INetworkAPI} api Abonent networ API
   * @param {ICredentials} credentials Optional {userName: 'nameStr', password: 'passStr'}
   * @returns {IAdditionalAPI} Empty object or object with Admin or Owner API
   */
  subscribe(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI {
    let user = {} as IUser;
    let isUserNew = false;
    let additionalAPI = {};

    if (credentials) {
      [user, isUserNew] = this.authenticateUser(credentials);

      if (isUserNew) {
        this.node!.sendMessageTo(api, `Вы зарегистрированы и подключены как ${user.userName}`);
        this.notify(`Зарегистрировался и подключился новый пользователь ${user.userName}`);
      } else {
        this.node!.sendMessageTo(api, `Вы подключены как ${user.userName}`);
        const role = user.isAdmin ? 'администратор' : 'пользователь';
        this.notify(`Подключился ${role} ${user.userName}`);
      }

      this.connectedUsers.set(api, user);
    } else {
      this.connectedUsers.set(api, user);
      this.node!.sendMessageTo(api, 'Вы подключены как гость');
    }

    this.node!.sendMessageTo(api, this.getLastFiftyMessages());
    this.node!.sendMessageTo(api, `Пользователи онлайн:\n${this.getOnlineUsers()}`);

    user.timer = user.isAdmin
      ? undefined
      : setTimeout(() => this.disconnectUser(api), this.inactivityPeriod);
    additionalAPI = user.isAdmin ? { ...this.getAdminAPI(), ...additionalAPI } : additionalAPI;
    additionalAPI = user.isOwner ? { ...this.getOwnerAPI(), ...additionalAPI } : additionalAPI;

    return additionalAPI;
  }

  /**
   * Public server method to reconnect guests to the server as authorized users
   *
   * @param {INetworkAPI} api Abonent networ API
   * @param {ICredentials} credentials Required parameter {userName: 'nameStr', password: 'passStr'}
   * @returns {IAdditionalAPI} Empty object or object with Admin or Owner API
   */
  resubscribe(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI {
    if (!credentials) throw new Error('Вы не указали имя пользователя и пароль');

    const [user, isUserNew] = this.authenticateUser(credentials);
    let additionalAPI = {};

    if (isUserNew) {
      this.node!.sendMessageTo(api, `Вы зарегистрированы и подключены как ${user.userName}`);
      this.notify(`Зарегистрировался и подключился новый пользователь ${user.userName}`);
    } else {
      this.node!.sendMessageTo(api, `Вы подключены как ${user.userName}`);
      const role = user.isAdmin ? 'администратор' : 'пользователь';
      this.notify(`Подключился ${role} ${user.userName}`);
    }

    this.connectedUsers.set(api, user);
    user.timer = user.isAdmin
      ? undefined
      : setTimeout(() => this.disconnectUser(api), this.inactivityPeriod);
    additionalAPI = user.isAdmin ? { ...this.getAdminAPI(), ...additionalAPI } : additionalAPI;
    additionalAPI = user.isOwner ? { ...this.getOwnerAPI(), ...additionalAPI } : additionalAPI;

    return additionalAPI;
  }

  /**
   * Overriding a parent abstract class method
   *
   * @returns {IServerAPI} Methods getName, connect, disconnect, subscribe, unsubscribe, update and new method resubscribe
   */
  getAPI(): IServerAPI {
    const api = super.getAPI();

    return {
      ...api,
      ...{
        resubscribe: this.resubscribe.bind(this),
        public: { ...api.public, resubscribe: this.resubscribe.bind(this) },
      },
    };
  }
}
