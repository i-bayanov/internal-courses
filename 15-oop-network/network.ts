import {
  IAbonentAPI, ICredentials, INetworkAPI, INetworkInstance, INodeInstance,
  IPArray, IServerAPI, IStoredInfoAboutConnectedNode, NetworkAddr,
} from './interfacesAndTypes';
import Node from './node';

export default class Network implements INetworkInstance {
  private networkAddress: NetworkAddr;

  private inactivityPeriod = 5 * 60 * 1000;

  private connectedNodes: Array<IStoredInfoAboutConnectedNode>;

  /**
   * Creates a new network
   *
   * @param {NetworkAddr} address Network address, an array of three numbers, each in the range [0, 255]
   */
  constructor(address: NetworkAddr) {
    if (address.some((group) => group < 0 || group > 255)) throw new Error('Некорректно задан адрес сети');
    this.networkAddress = address;
    const mockedNode = new Node(
      [...address, 0],
      (this.constructor as typeof Network).generateToken(),
      this,
      { public: { getName: () => 'Network' } } as IAbonentAPI,
    );
    this.connectedNodes = [{ name: 'reserved', node: mockedNode, timer: null }];
    setInterval(() => {
      this.connectedNodes.slice(1).forEach((el) => {
        if (el.timer) {
          return;
        }

        if (el.node.getConnections().length) {
          return;
        }

        this.disconnect(el.node.getNetworkAPI());
      });
    }, this.inactivityPeriod);
  }

  /**
   * Connect method is used by abonents and servers to connect to the network
   *
   * @param {IAbonentAPI} api Abonent or server API
   * @param {string} IP Saved IP address. If the address is correct and free, then the connection will be made with this address
   */
  connect(api: IAbonentAPI | IServerAPI, IP?: IPArray): void {
    const name = api.getName();
    if (this.connectedNodes.some((el) => el.name === name)) throw new Error(`Узел с именем ${name} уже подключён`);
    if (IP && (
      IP[3] < 0 || IP[3] > 255 || this.networkAddress.some((group, index) => group !== IP[index])
    )) throw new Error('Некорректный адрес для подключения');
    const shortIP = (!IP || this.connectedNodes[IP[3]]) ? this.getEmptyIP() : IP[3];
    const fullIP: IPArray = [...this.networkAddress, shortIP];
    const node = new Node(fullIP, (this.constructor as typeof Network).generateToken(), this, api);
    api.connect(node.getConsumerAPI());
    const timer = setTimeout(() => {
      this.disconnect(node.getNetworkAPI());
    }, this.inactivityPeriod);
    this.connectedNodes[shortIP] = { name, node, timer };
    api.update(this.connectedNodes[0].node.getNetworkAPI(), 'Подключение успешно установлено');
  }

  disconnect(nodeToDisable: INetworkAPI): void {
    const shortIP = Number(nodeToDisable.getAddress().split('.')[3]);
    clearTimeout(this.connectedNodes[shortIP].timer!);
    delete this.connectedNodes[shortIP];
    nodeToDisable.update(this.connectedNodes[0].node.getNetworkAPI(), 'Вы были отключены от сети');
  }

  private getEmptyIP(): number {
    for (let i = 0; i < this.connectedNodes.length; i++) {
      if (!this.connectedNodes[i]) {
        return i;
      }
    }

    return this.connectedNodes.length;
  }

  getConnectedNodes(requestingNode: INodeInstance): string[] {
    this.checkIfNodeIsEligible(requestingNode);

    return this.connectedNodes.slice(1).map((el) => `${el.node.getAddress()}: ${el.node.getNetworkAPI().getName()}`);
  }

  connectNodeTo(
    connectingNode: INodeInstance,
    addressOrName: string,
    credentials?: ICredentials,
  ): INetworkAPI {
    this.checkIfNodeIsEligible(connectingNode);

    interface T extends IStoredInfoAboutConnectedNode { }
    const compareName = (el: T) => el.name === addressOrName;
    const compareAddress = (el: T) => el.node.getAddress() === addressOrName;
    const compareNode = (el: T) => compareName(el) || compareAddress(el);

    const targetNodeIP = this.connectedNodes.findIndex(compareNode);
    if (targetNodeIP <= 0) throw new Error('Не удалось найти целевой узел');
    const targetNode = this.connectedNodes[targetNodeIP].node;
    const targetNodeAPI = targetNode.getNetworkAPI();
    if (!targetNodeAPI.subscribe) throw new Error('Узел не поддерживает входящие соединения');
    const additionalAPI = targetNodeAPI.subscribe(connectingNode.getNetworkAPI(), credentials);
    this.connectedNodes[targetNodeIP].node.connectedNodes.push(connectingNode.getNetworkAPI());
    this.markNodeActive(targetNode);
    this.markNodeActive(connectingNode);

    return { ...targetNode.getNetworkAPI(), ...additionalAPI };
  }

  private markNodeActive(activeNode: INodeInstance): void {
    const shortIP = Number(activeNode.getAddress().split('.')[3]);
    clearTimeout(this.connectedNodes[shortIP].timer!);
    this.connectedNodes[shortIP].timer = null;
  }

  private checkIfNodeIsEligible(testedNode: INodeInstance): void {
    const shortIP = Number(testedNode.getAddress().split('.')[3]);
    const connectedNode = this.connectedNodes[shortIP];
    const isEligible = Object.is(connectedNode.node, testedNode);

    if (!isEligible) throw new Error('Недостаточно прав для совершения операции');
  }

  static generateToken(): string {
    return Math.random().toString(36).toUpperCase().substring(2);
  }
}
