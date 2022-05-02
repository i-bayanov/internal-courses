const mock = {
  name: 'Ilia',
  surname: 'Bayanov',
  address: {
    city: 'Ryazan',
    street: 'Nizne-Trubezhnaya',
  },
  fullNameMessage(message) {
    if (this.fullNameMessage.isOffline) {
      return `${this.name} ${this.surname} is offline`;
    }
    return `${this.name} ${this.surname}: ${message || 'said nothing'}`;
  },
};

mock.fullNameMessage.isOffline = false;
