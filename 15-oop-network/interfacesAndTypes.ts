export interface IAbonentAPI {
  getName(): string;
  connect(node: IConsumerAPI): void;
  disconnect(): void;
  update(from: INetworkAPI, message: string): void;
  addCredentials(serverName: string, userName: string, password: string): void;
  getCredentials(serverName: string): ICredentials;
  public: {
    getName(): string;
    update(from: INetworkAPI, message: string): void;
  };
}

export interface IServerAPI {
  getName(): string;
  connect(node: IConsumerAPI): void;
  disconnect(): void;
  subscribe(api: INetworkAPI, credentials?: ICredentials): IAdditionalAPI;
  unsubscribe(userAPI: INetworkAPI): void;
  update(from: INetworkAPI, message: string): void;
  resubscribe?(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI;
  public: {
    getName(): string;
    update(from: INetworkAPI, message: string): void;
    subscribe(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI;
    unsubscribe(userAPI: INetworkAPI): void;
    resubscribe?(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI;
  };
}

export interface ICredentials {
  userName: string;
  password: string;
}

export interface IUser {
  userName: string;
  password: string;
  isOwner: boolean;
  isAdmin: boolean;
  timer?: TimerType;
}

export interface IConsumerAPI {
  disconnect(): void;
  reconnect(): void;
  getAddress(): string;
  getNodeList(): string[];
  getConnections(): Array<object>;
  connectTo(addressOrName: string, credentials?: ICredentials): void;
  sendMessageTo(connectedNode: INetworkAPI, message: string): void;
  reconnectTo(connectedNodeIndex: number, credentials: ICredentials): void;
  sendNewApiToConnectedNode(additionalAPI: IAdditionalAPI, connectedNode: INetworkAPI): void;
  disconnectFrom(connectedNode: INetworkAPI): void;
  unsubscribeNodeFromServer(connectedNode: INetworkAPI): void;
  createPublicServer(name: string, ownerName: string, ownerPassword: string): void;
  createPrivateServer(name: string, ownerName: string, ownerPassword: string): void;
}

export interface INetworkAPI {
  getName(): string;
  update(from: INetworkAPI, message: string): void;
  getAddress(): string;
  updateConnectedNodeAPI(connectedNode: INetworkAPI): void;
  disconnectFrom(connectedNode: INetworkAPI): void;
  subscribe?(api: INetworkAPI, credentials?: ICredentials): IAdditionalAPI;
  unsubscribe?(userAPI: INetworkAPI): void;
  resubscribe?(api: INetworkAPI, credentials: ICredentials): IAdditionalAPI;
  makeUserAdmin?(adminAPI: INetworkAPI, user: IUser): void;
  removeUserFromAdmin?(adminAPI: INetworkAPI, user: IUser): void;
  blockUserByIP?(IP: string): void;
  disableServer?(ownerAPI: INetworkAPI): void;
}

export type IPArray = [number, number, number, number];

export type NetworkAddr = [number, number, number];

export interface INetworkInstance {
  connect(api: IAbonentAPI | IServerAPI, IP?: IPArray): void;
  disconnect(nodeToDisable: INetworkAPI): void;
  getConnectedNodes(requestingNode: INodeInstance): string[];
  connectNodeTo(
    connectingNode: INodeInstance,
    addressOrName: string,
    credentials?: ICredentials,
  ): INetworkAPI;
}

export interface INodeInstance {
  connectedNodes: Array<INetworkAPI>;
  disconnect(): void;
  reconnect(): void;
  getAddress(): string;
  getConnections(): Array<INetworkAPI>;
  getNodeList(): string[];
  connectTo(addressOrName: string, credentials?: ICredentials): void;
  sendMessageTo(connectedNode: INetworkAPI, message: string): void;
  reconnectTo(connectedNodeIndex: number, credentials: ICredentials): void;
  updateConnectedNodeAPI(connectedNode: INetworkAPI): void;
  sendNewApiToConnectedNode(additionalAPI: IAdditionalAPI, connectedNode: INetworkAPI): void;
  disconnectFrom(connectedNode: INetworkAPI): void;
  unsubscribeNodeFromServer(connectedNode: INetworkAPI): void;
  createPublicServer(name: string, ownerName: string, ownerPassword: string): void;
  createPrivateServer(name: string, ownerName: string, ownerPassword: string): void;
  getConsumerAPI(): IConsumerAPI;
  getNetworkAPI(): INetworkAPI;
}

export interface IAdditionalAPI {
  makeUserAdmin?(adminAPI: INetworkAPI, user: IUser): void;
  removeUserFromAdmin?(adminAPI: INetworkAPI, user: IUser): void;
  blockUserByIP?(IP: string): void;
  disableServer?(ownerAPI: INetworkAPI): void;
}

export type TimerType = ReturnType<typeof setTimeout>;

export interface IStoredInfoAboutConnectedNode {
  name: string;
  node: INodeInstance;
  timer: TimerType | null;
}
