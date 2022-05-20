/* eslint no-console: 0 */

function ElectronicDevice(type, power) {
  this.type = type;
  this.power = power;
  this.isTurnedOn = false;
}

ElectronicDevice.prototype.turnOnOff = function turnOnOff() {
  if (this.isTurnedOn) {
    console.log(`The ${this.type} is turned off now.`);
    this.isTurnedOn = false;
  } else {
    console.log(`The ${this.type} is turned on now.`);
    this.isTurnedOn = true;
  }
};
ElectronicDevice.prototype.showInfo = function showInfo() {
  if (this.isTurnedOn) {
    console.log(`The power of ${this.type} is ${this.power}.`);
  } else {
    console.log(`The ${this.type} is turned off. To view the info turn on the device.`);
  }
};

function VacuumCleaner(power) {
  ElectronicDevice.call(this, 'VacuumCleaner', power);
  this._cleaningMode = 'dry cleaning';
}

Object.setPrototypeOf(VacuumCleaner.prototype, ElectronicDevice.prototype);
VacuumCleaner.prototype.switchCleaningMode = function switchCleaningMode() {
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
};
VacuumCleaner.prototype.showInfo = function showInfo() {
  ElectronicDevice.prototype.showInfo.call(this);
  if (this.isTurnedOn) {
    console.log(`Cleaning mode ${this._cleaningMode}.`);
  }
};

function RobotCleaner(power) {
  VacuumCleaner.call(this, power);
  this.type = 'RobotCleaner';
  this._locationMap = null;
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

Object.setPrototypeOf(RobotCleaner.prototype, VacuumCleaner.prototype);
Object.assign(RobotCleaner.prototype, robotMixIn);
RobotCleaner.prototype.showInfo = function showInfo() {
  VacuumCleaner.prototype.showInfo.call(this);
  if (this.isTurnedOn) {
    if (this._locationMap) {
      console.log(`Location map was installed on ${this._locationMap}.`);
    } else {
      console.log('Location map is not installed, start scanning.');
    }
  }
};

function RobotSoldier(power) {
  ElectronicDevice.call(this, 'RobotSoldier', power);
  this._locationMap = null;
  this.isShooting = false;
}

Object.setPrototypeOf(RobotSoldier.prototype, ElectronicDevice.prototype);
Object.assign(RobotSoldier.prototype, robotMixIn);
RobotSoldier.prototype.turnOnOff = function turnOnOff() {
  ElectronicDevice.prototype.turnOnOff.call(this);
  this.isShooting = false;
};
RobotSoldier.prototype.showInfo = function showInfo() {
  ElectronicDevice.prototype.showInfo.call(this);
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
};
RobotSoldier.prototype.startStopShooting = function startStopShooting() {
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
};
RobotSoldier.prototype.showShootingStatus = function showShootingStatus() {
  if (this.isTurnedOn) {
    if (this.isShooting) {
      console.log('Shooting in progress.');
    } else {
      console.log('No shooting.');
    }
  } else {
    console.log(`The ${this.type} is turned off and does not shoot.`);
  }
};

export { VacuumCleaner, RobotCleaner, RobotSoldier };
