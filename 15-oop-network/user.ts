import { IUser } from './interfacesAndTypes';

export default class User implements IUser {
  userName: string;

  password: string;

  isOwner: boolean;

  isAdmin: boolean;

  /**
   * Creates a server user
   *
   * @param {string} userName Any non-empty string
   * @param {string} password Any non-empty string
   * @param {boolean} isOwner An optional parameter that determines whether the user is the owner of the server
   */
  constructor(userName: string, password: string, isOwner?: boolean) {
    if (userName === '') throw new Error('Имя пользователя слишком короткое');
    if (password === '') throw new Error('Пароль слишком короткий');
    this.userName = userName;
    this.password = password;
    this.isOwner = isOwner || false;
    this.isAdmin = isOwner || false;
  }
}
