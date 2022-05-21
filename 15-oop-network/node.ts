import PublicServer from './publicServer';
import PrivateServer from './privateServer';
import {
  IPArray, INetworkInstance, IAbonentAPI, IConsumerAPI,
  INetworkAPI, INodeInstance, IServerAPI, ICredentials, IAdditionalAPI,
} from './interfacesAndTypes';

export default class Node implements INodeInstance {
  private address: IPArray;

  // @ts-ignore: Unused variable
  private token: string;

  private network: INetworkInstance;

  private consumer: IAbonentAPI | IServerAPI | null;

  /**
   * Instantiates a node to provide methods for interacting with the network.
   *
   * @param {IPArray} address Array of four numbers in range [0, 255]
   * @param {string} token A secret token to identify the node
   * @param {INetworkInstance} network Link to connected network
   * @param {IAbonentAPI | IServerAPI} consumer Link to the Abonent or Server API
   */
  constructor(
    address: IPArray,
    token: string,
    network: INetworkInstance,
    consumer: IAbonentAPI | IServerAPI,
  ) {
    this.address = address;
    this.token = token;
    this.network = network;
    this.consumer = consumer;
  }

  connectedNodes: Array<INetworkAPI> = [];

  /**
   * Disconnects from network
   */
  disconnect(): void {
    this.network.disconnect(this.getNetworkAPI());
    this.consumer!.disconnect();
    this.consumer = null;
  }

  /**
   * Reconnects to network
   */
  reconnect(): void {
    this.network.connect(this.consumer! as IAbonentAPI, this.address);
  }

  /**
   * @returns {string} An IP-address string
   */
  getAddress(): string {
    return this.address.join('.');
  }

  /**
   * All nodes connected to
   *
   * @returns {Array<INetworkAPI>}
   */
  getConnections(): Array<INetworkAPI> {
    return this.connectedNodes;
  }

  /**
   * All active network nodes
   *
   * @returns {string[]}
   */
  getNodeList(): string[] {
    return this.network.getConnectedNodes(this);
  }

  /**
   * Connects the abonent node to the server node
   *
   * @param {string} addressOrName Server address or name
   * @param {ICredentials} credentials Optional {userName: 'nameStr', password: 'passStr'}
   */
  connectTo(addressOrName: string, credentials?: ICredentials): void {
    let temp;

    if (credentials) {
      const { userName, password } = credentials;
      (this.consumer as IAbonentAPI).addCredentials(addressOrName, userName, password);
      temp = credentials;
    } else {
      temp = (this.consumer as IAbonentAPI).getCredentials(addressOrName);
    }

    this.connectedNodes.push(this.network.connectNodeTo(this, addressOrName, temp));
  }

  /**
   * Sends a message to the server
   *
   * @param {INetworkAPI} connectedNode API of connected server
   * @param {string} message Message
   */
  sendMessageTo(connectedNode: INetworkAPI, message: string): void {
    if (!this.connectedNodes.includes(connectedNode)) throw new Error('Вы не подключены к такому узлу');
    connectedNode.update(this.getNetworkAPI(), message);
  }

  /**
   * Reconnects to the server with credentials. Updates Connected Node API with optional Additional API
   *
   * @param {number} connectedNodeIndex Index of the server in the ConnectedNodes Array
   * @param {ICredentials} credentials {userName: 'nameStr', password: 'passStr'}
   */
  reconnectTo(connectedNodeIndex: number, credentials: ICredentials): void {
    const connectedNode = this.connectedNodes[connectedNodeIndex];
    if (!connectedNode.resubscribe) throw new Error('Узел не поддерживает переподключение');
    const additionalAPI = connectedNode.resubscribe(this.getNetworkAPI(), credentials);
    Object.defineProperties(connectedNode, Object.getOwnPropertyDescriptors(additionalAPI));
  }

  /**
   * Updates the API of the connected server
   *
   * @param {INetworkAPI} connectedNode API to be updated
   */
  updateConnectedNodeAPI(connectedNode: INetworkAPI): void {
    const i = this.connectedNodes.findIndex((node) => node.getName() === connectedNode.getName());
    if (i === -1) throw new Error('Вы не подключены к такому узлу');
    this.connectedNodes[i] = connectedNode;
  }

  /**
   * Server method to update the API used by the user
   *
   * @param {IAdditionalAPI} additionalAPI Admin or owner API
   * @param {INetworkAPI} connectedNode API of the connected user
   */
  sendNewApiToConnectedNode(additionalAPI: IAdditionalAPI, connectedNode: INetworkAPI): void {
    if (!this.connectedNodes.includes(connectedNode)) throw new Error('Вы не подключены к такому узлу');
    connectedNode.updateConnectedNodeAPI({ ...this.getNetworkAPI(), ...additionalAPI });
  }

  /**
   * User method for disconnecting from the server
   *
   * @param {INetworkAPI} connectedNode API of the connected user
   */
  disconnectFrom(connectedNode: INetworkAPI): void {
    const index = this.connectedNodes.indexOf(connectedNode);
    if (index === -1) throw new Error('Вы не подключены к такому узлу');
    connectedNode.unsubscribe!(this.getNetworkAPI());
    this.connectedNodes.splice(index, 1);
  }

  /**
   * Server method for disconnecting a user from itself
   *
   * @param {INetworkAPI} connectedNode Connected user API
   */
  unsubscribeNodeFromServer(connectedNode: INetworkAPI): void {
    connectedNode.disconnectFrom(this.getNetworkAPI());
  }

  /**
   * Creates Public Server
   *
   * @param {string} name Server name
   * @param {string} ownerName Owner login
   * @param {string} ownerPassword Owner password
   */
  createPublicServer(name: string, ownerName: string, ownerPassword: string): void {
    const server = new PublicServer(name, ownerName, ownerPassword);
    this.network.connect(server.getAPI());
    this.connectTo(name, { userName: ownerName, password: ownerPassword });
  }

  /**
   * Creates Private Server
   *
   * @param {string} name Server name
   * @param {string} ownerName Owner login
   * @param {string} ownerPassword Owner password
   */
  createPrivateServer(name: string, ownerName: string, ownerPassword: string): void {
    const server = new PrivateServer(name, ownerName, ownerPassword);
    this.network.connect(server.getAPI());
    this.connectTo(name, { userName: ownerName, password: ownerPassword });
  }

  /**
   * API for consumer interaction with the network
   *
   * @returns {IConsumerAPI} Methods disconnect, reconnect, getAddress, getNodeList, getConnections, connectTo, sendMessageTo, reconnectTo, sendNewApiToConnectedNode, disconnectFrom, unsubscribeNodeFromServer, createPublicServer, createPrivateServer
   */
  getConsumerAPI(): IConsumerAPI {
    return {
      disconnect: this.disconnect.bind(this),
      reconnect: this.reconnect.bind(this),
      getAddress: this.getAddress.bind(this),
      getNodeList: this.getNodeList.bind(this),
      getConnections: this.getConnections.bind(this),
      connectTo: this.connectTo.bind(this),
      sendMessageTo: this.sendMessageTo.bind(this),
      reconnectTo: this.reconnectTo.bind(this),
      sendNewApiToConnectedNode: this.sendNewApiToConnectedNode.bind(this),
      disconnectFrom: this.disconnectFrom.bind(this),
      unsubscribeNodeFromServer: this.unsubscribeNodeFromServer.bind(this),
      createPublicServer: this.createPublicServer.bind(this),
      createPrivateServer: this.createPrivateServer.bind(this),
    };
  }

  /**
   * API for interaction of other network nodes with our
   *
   * @returns {INetworkAPI} Methods getAddress, disconnectFrom, updateConnectedNodeAPI and public consumer's API
   */
  getNetworkAPI(): INetworkAPI {
    return {
      ...this.consumer!.public,
      getAddress: this.getAddress.bind(this),
      disconnectFrom: this.disconnectFrom.bind(this),
      updateConnectedNodeAPI: this.updateConnectedNodeAPI.bind(this),
    };
  }
}
