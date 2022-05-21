import { IAdditionalAPI, ICredentials, INetworkAPI } from './interfacesAndTypes';
import Server from './server';

export default class PrivateServer extends Server {
  private blockedIPs: string[] = [];

  /**
   * Creates Private Server
   *
   * @param {string} name Server name
   * @param {string} ownerName Owner login
   * @param {string} ownerPassword Owner password
   */
  constructor(name: string, ownerName: string, ownerPassword: string) {
    super('Private server', name, ownerName, ownerPassword);
  }

  /**
   * Private server method to subscribe users to new messages. Guests are not allowed
   *
   * @param {INetworkAPI} api Abonent networ API
   * @param {ICredentials} credentials Required parameter {userName: 'nameStr', password: 'passStr'}
   * @returns {IAdditionalAPI} Empty object or object with Admin or Owner API
   */
  subscribe(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI {
    if (!credentials) throw new Error('Вы не указали имя пользователя и пароль');
    if (this.blockedIPs.includes(api.getAddress())) throw new Error('Вы заблокированы и не можете подключиться');

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
   * Method for blocking users by IP address
   *
   * @param {string} IP User IP address
   */
  blockUserByIP(IP: string): void {
    const userAPI = [...this.connectedUsers.keys()].find((el) => el.getAddress() === IP);
    this.blockedIPs.push(IP);
    this.notify(`Пользователь ${this.connectedUsers.get(userAPI!)!.userName} был заблокирован`);
    this.disconnectUser(userAPI!);
  }

  /**
   * Overriding a parent abstract class method
   *
   * @returns {IAdditionalAPI} Methods makeUserAdmin, removeUserFromAdmin and new method blockUserByIP
   */
  getAdminAPI(): IAdditionalAPI {
    const api = super.getAdminAPI();

    return { ...api, blockUserByIP: this.blockUserByIP.bind(this) };
  }
}
