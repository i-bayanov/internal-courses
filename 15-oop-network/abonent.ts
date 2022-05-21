/* eslint no-console: 0 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["update"] }] */

import {
  IConsumerAPI, ICredentials, INetworkAPI, IAbonentAPI,
} from './interfacesAndTypes';

export default class Abonent {
  private name: string;

  private node?: IConsumerAPI;

  private credentials?: { [prop: string]: ICredentials };

  /**
   * Creates a network abonent
   *
   * @param {string} name Name of the new abonent
   */
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  connect(node: IConsumerAPI) {
    this.node = node;
  }

  disconnect() {
    delete this.node;
  }

  update(from: INetworkAPI, message: string) {
    console.log(from.getName(), '\n', message);
  }

  addCredentials(serverName: string, userName: string, password: string) {
    if (!this.credentials) {
      this.credentials = {};
    }

    this.credentials[serverName] = { userName, password };
  }

  getCredentials(serverName: string): ICredentials {
    return this.credentials?.[serverName] as ICredentials;
  }

  /**
   * API for connecting and interacting with the network
   *
   * @returns {IAbonentAPI} Methods getName, connect, disconnect, update, addCredentials, getCredentials
   */
  getAPI(): IAbonentAPI {
    return {
      getName: this.getName.bind(this),
      connect: this.connect.bind(this),
      disconnect: this.disconnect.bind(this),
      update: this.update.bind(this),
      addCredentials: this.addCredentials.bind(this),
      getCredentials: this.getCredentials.bind(this),
      public: {
        getName: this.getName.bind(this),
        update: this.update.bind(this),
      },
    };
  }
}
