/* eslint no-console: 0 */
/* eslint max-classes-per-file: ["error", { max: 4 }] */

class ElectronicDevice {
  constructor(type, power) {
    this.type = type;
    this.power = power;
    this.isTurnedOn = false;
  }

  turnOnOff() {
    if (this.isTurnedOn) {
      console.log(`The ${this.type} is turned off now.`);
      this.isTurnedOn = false;
    } else {
      console.log(`The ${this.type} is turned on now.`);
      this.isTurnedOn = true;
    }
  }

  showInfo() {
    if (this.isTurnedOn) {
      console.log(`The power of ${this.type} is ${this.power}.`);
    } else {
      console.log(`The ${this.type} is turned off. To view the info turn on the device.`);
    }
  }
}

class VacuumCleaner extends ElectronicDevice {
  constructor(power) {
    super('VacuumCleaner', power);
    this._cleaningMode = 'dry cleaning';
  }

  switchCleaningMode() {
    if (this.isTurnedOn) {
      switch (this._cleaningMode) {
        case 'dry cleaning':
          this._cleaningMode = 'wet cleaning';
          break;
        case 'wet cleaning':
          this._cleaningMode = 'dry cleaning';
          break;
        // no default
      }
      console.log(`The ${this.type} is now switched to ${this._cleaningMode}.`);
    } else {
      console.log(`The ${this.type} is turned off. To switch cleaning mode turn on the device.`);
    }
  }

  showInfo() {
    super.showInfo();
    if (this.isTurnedOn) {
      console.log(`Cleaning mode ${this._cleaningMode}.`);
    }
  }
}

class RobotCleaner extends VacuumCleaner {
  constructor(power) {
    super(power);
    this.type = 'RobotCleaner';
    this._locationMap = null;
  }

  showInfo() {
    super.showInfo();
    if (this.isTurnedOn) {
      if (this._locationMap) {
        console.log(`Location map was installed on ${this._locationMap}.`);
      } else {
        console.log('Location map is not installed, start scanning.');
      }
    }
  }
}

const robotMixIn = {
  scanLocation() {
    if (this.isTurnedOn) {
      console.log('Start scanning location. It will take some time...');
      setTimeout(() => {
        this._locationMap = new Date();
        console.log(`Location was successfully scanned on ${this._locationMap}.`);
      }, 1000);
    } else {
      console.log(`The ${this.type} is turned off. To start scanning turn on the device.`);
    }
  },
};

Object.assign(RobotCleaner.prototype, robotMixIn);

class RobotSoldier extends ElectronicDevice {
  constructor(power) {
    super('RobotSoldier', power);
    this._locationMap = null;
    this.isShooting = false;
  }

  turnOnOff() {
    super.turnOnOff();
    this.isShooting = false;
  }

  showInfo() {
    super.showInfo();

    if (this.isTurnedOn) {
      if (this._locationMap) {
        console.log(`Location map was installed on ${this._locationMap}.`);
      } else {
        console.log('Location map is not installed, start scanning.');
      }

      if (this.isShooting) {
        console.log('Shooting in progress.');
      } else {
        console.log('No shooting.');
      }
    }
  }

  startStopShooting() {
    if (this.isTurnedOn) {
      if (this.isShooting) {
        this.isShooting = false;
        console.log(`The ${this.type} stopped shooting`);
      } else {
        this.isShooting = true;
        console.log(`The ${this.type} started shooting`);
      }
    } else {
      console.log(`The ${this.type} is turned off. To start shooting turn on the device.`);
    }
  }

  showShootingStatus() {
    if (this.isTurnedOn) {
      if (this.isShooting) {
        console.log('Shooting in progress.');
      } else {
        console.log('No shooting.');
      }
    } else {
      console.log(`The ${this.type} is turned off and does not shoot.`);
    }
  }
}

Object.assign(RobotSoldier.prototype, robotMixIn);

export { VacuumCleaner, RobotCleaner, RobotSoldier };
