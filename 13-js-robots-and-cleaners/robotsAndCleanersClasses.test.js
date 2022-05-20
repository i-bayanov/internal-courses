import { VacuumCleaner, RobotCleaner, RobotSoldier } from './robotsAndCleanersClasses';

const vacuumCleaner = new VacuumCleaner(1500);
const robotCleaner = new RobotCleaner(500);
const robotSoldier = new RobotSoldier(300);

describe('Vacuum cleaner', () => {
  beforeEach(() => {
    vacuumCleaner.isTurnedOn = false;
    vacuumCleaner._cleaningMode = 'dry cleaning';
    jest.resetAllMocks();
  });

  test('should have all necessary properties and methods', () => {
    expect(vacuumCleaner.power).toBeDefined();
    expect(vacuumCleaner.isTurnedOn).toBeDefined();
    expect(vacuumCleaner._cleaningMode).toBeDefined();
    expect(vacuumCleaner.turnOnOff).toBeDefined();
    expect(vacuumCleaner.switchCleaningMode).toBeDefined();
    expect(vacuumCleaner.showInfo).toBeDefined();
  });

  test('should not do anything while it is turned off', () => {
    const spy = jest.spyOn(console, 'log');
    vacuumCleaner.switchCleaningMode();
    vacuumCleaner.showInfo();
    expect(vacuumCleaner._cleaningMode).toBe('dry cleaning');
    expect(spy).toHaveBeenNthCalledWith(1, 'The VacuumCleaner is turned off. To switch cleaning mode turn on the device.');
    expect(spy).toHaveBeenNthCalledWith(2, 'The VacuumCleaner is turned off. To view the info turn on the device.');
  });

  test('should turn on and off', () => {
    const spy = jest.spyOn(console, 'log');
    vacuumCleaner.turnOnOff();
    vacuumCleaner.turnOnOff();
    expect(spy).toHaveBeenNthCalledWith(1, 'The VacuumCleaner is turned on now.');
    expect(spy).toHaveBeenNthCalledWith(2, 'The VacuumCleaner is turned off now.');
  });

  test('should change cleaning mode if turned on', () => {
    const spy = jest.spyOn(console, 'log');
    vacuumCleaner.turnOnOff();
    vacuumCleaner.switchCleaningMode();
    expect(vacuumCleaner._cleaningMode).toBe('wet cleaning');
    vacuumCleaner.switchCleaningMode();
    expect(vacuumCleaner._cleaningMode).toBe('dry cleaning');
    expect(spy).toHaveBeenNthCalledWith(2, 'The VacuumCleaner is now switched to wet cleaning.');
    expect(spy).toHaveBeenNthCalledWith(3, 'The VacuumCleaner is now switched to dry cleaning.');
  });

  test('should show device info if turned on', () => {
    const spy = jest.spyOn(console, 'log');
    vacuumCleaner.turnOnOff();
    vacuumCleaner.showInfo();
    expect(spy).toHaveBeenNthCalledWith(2, 'The power of VacuumCleaner is 1500.');
    expect(spy).toHaveBeenNthCalledWith(3, 'Cleaning mode dry cleaning.');
  });
});

describe('Robot cleaner', () => {
  beforeEach(() => {
    robotCleaner.isTurnedOn = false;
    robotCleaner._cleaningMode = 'dry cleaning';
    jest.resetAllMocks();
  });

  test('should have all necessary properties and methods', () => {
    expect(robotCleaner.power).toBeDefined();
    expect(robotCleaner.isTurnedOn).toBeDefined();
    expect(robotCleaner._cleaningMode).toBeDefined();
    expect(robotCleaner._locationMap).toBeDefined();
    expect(robotCleaner.turnOnOff).toBeDefined();
    expect(robotCleaner.switchCleaningMode).toBeDefined();
    expect(robotCleaner.showInfo).toBeDefined();
    expect(robotCleaner.scanLocation).toBeDefined();
  });

  test('should not do anything while it is turned off', () => {
    const spy = jest.spyOn(console, 'log');
    robotCleaner.switchCleaningMode();
    robotCleaner.showInfo();
    robotCleaner.scanLocation();
    expect(robotCleaner._cleaningMode).toBe('dry cleaning');
    expect(robotCleaner._locationMap).toBeNull();
    expect(spy).toHaveBeenNthCalledWith(1, 'The RobotCleaner is turned off. To switch cleaning mode turn on the device.');
    expect(spy).toHaveBeenNthCalledWith(2, 'The RobotCleaner is turned off. To view the info turn on the device.');
    expect(spy).toHaveBeenNthCalledWith(3, 'The RobotCleaner is turned off. To start scanning turn on the device.');
  });

  test('should turn on and off', () => {
    const spy = jest.spyOn(console, 'log');
    robotCleaner.turnOnOff();
    robotCleaner.turnOnOff();
    expect(spy).toHaveBeenNthCalledWith(1, 'The RobotCleaner is turned on now.');
    expect(spy).toHaveBeenNthCalledWith(2, 'The RobotCleaner is turned off now.');
  });

  test('should change cleaning mode if turned on', () => {
    const spy = jest.spyOn(console, 'log');
    robotCleaner.turnOnOff();
    robotCleaner.switchCleaningMode();
    expect(robotCleaner._cleaningMode).toBe('wet cleaning');
    robotCleaner.switchCleaningMode();
    expect(robotCleaner._cleaningMode).toBe('dry cleaning');
    expect(spy).toHaveBeenNthCalledWith(2, 'The RobotCleaner is now switched to wet cleaning.');
    expect(spy).toHaveBeenNthCalledWith(3, 'The RobotCleaner is now switched to dry cleaning.');
  });

  test('scan location and install map', () => {
    const spy = jest.spyOn(console, 'log');
    jest.useFakeTimers();
    robotCleaner.turnOnOff();
    robotCleaner.scanLocation();
    jest.runAllTimers();
    expect(robotCleaner._locationMap).not.toBeNull();
    expect(spy).toHaveBeenNthCalledWith(2, 'Start scanning location. It will take some time...');
    expect(spy).toHaveBeenNthCalledWith(3, `Location was successfully scanned on ${robotCleaner._locationMap}.`);
  });

  test('should show device info if turned on', () => {
    const spy = jest.spyOn(console, 'log');
    robotCleaner.turnOnOff();
    robotCleaner.showInfo();
    expect(spy).toHaveBeenNthCalledWith(2, 'The power of RobotCleaner is 500.');
    expect(spy).toHaveBeenNthCalledWith(3, 'Cleaning mode dry cleaning.');
    expect(spy).toHaveBeenNthCalledWith(4, `Location map was installed on ${robotCleaner._locationMap}.`);
  });
});

describe('Robot soldier', () => {
  beforeEach(() => {
    robotSoldier.isTurnedOn = false;
    jest.resetAllMocks();
  });

  test('should have all necessary properties and methods', () => {
    expect(robotSoldier.power).toBeDefined();
    expect(robotSoldier.isTurnedOn).toBeDefined();
    expect(robotSoldier.isShooting).toBeDefined();
    expect(robotSoldier._locationMap).toBeDefined();
    expect(robotSoldier.turnOnOff).toBeDefined();
    expect(robotSoldier.startStopShooting).toBeDefined();
    expect(robotSoldier.showInfo).toBeDefined();
    expect(robotSoldier.scanLocation).toBeDefined();
    expect(robotSoldier.showShootingStatus).toBeDefined();
  });

  test('should not do anything while it is turned off', () => {
    const spy = jest.spyOn(console, 'log');
    robotSoldier.startStopShooting();
    robotSoldier.showInfo();
    robotSoldier.scanLocation();
    robotSoldier.showShootingStatus();
    expect(robotSoldier.isShooting).toBeFalsy();
    expect(robotSoldier._locationMap).toBeNull();
    expect(spy).toHaveBeenNthCalledWith(1, 'The RobotSoldier is turned off. To start shooting turn on the device.');
    expect(spy).toHaveBeenNthCalledWith(2, 'The RobotSoldier is turned off. To view the info turn on the device.');
    expect(spy).toHaveBeenNthCalledWith(3, 'The RobotSoldier is turned off. To start scanning turn on the device.');
    expect(spy).toHaveBeenNthCalledWith(4, 'The RobotSoldier is turned off and does not shoot.');
  });

  test('should turn on and off', () => {
    const spy = jest.spyOn(console, 'log');
    robotSoldier.turnOnOff();
    robotSoldier.turnOnOff();
    expect(spy).toHaveBeenNthCalledWith(1, 'The RobotSoldier is turned on now.');
    expect(spy).toHaveBeenNthCalledWith(2, 'The RobotSoldier is turned off now.');
  });

  test('should start and stop shooting if turned on', () => {
    const spy = jest.spyOn(console, 'log');
    robotSoldier.turnOnOff();
    robotSoldier.startStopShooting();
    expect(robotSoldier.isShooting).toBeTruthy();
    robotSoldier.startStopShooting();
    expect(robotSoldier.isShooting).toBeFalsy();
    expect(spy).toHaveBeenNthCalledWith(2, 'The RobotSoldier started shooting');
    expect(spy).toHaveBeenNthCalledWith(3, 'The RobotSoldier stopped shooting');
  });

  test('should not start shooting immediately after turning on', () => {
    robotSoldier.turnOnOff();
    robotSoldier.startStopShooting();
    robotSoldier.turnOnOff();
    robotSoldier.turnOnOff();
    expect(robotSoldier.isShooting).toBeFalsy();
  });

  test('scan location and install map', () => {
    const spy = jest.spyOn(console, 'log');
    jest.useFakeTimers();
    robotSoldier.turnOnOff();
    robotSoldier.scanLocation();
    jest.runAllTimers();
    expect(robotSoldier._locationMap).not.toBeNull();
    expect(spy).toHaveBeenNthCalledWith(2, 'Start scanning location. It will take some time...');
    expect(spy).toHaveBeenNthCalledWith(3, `Location was successfully scanned on ${robotSoldier._locationMap}.`);
  });

  test('should show device info if turned on', () => {
    robotSoldier.turnOnOff();
    const spy = jest.spyOn(console, 'log');
    robotSoldier.showInfo();
    expect(spy).toHaveBeenNthCalledWith(2, 'The power of RobotSoldier is 300.');
    expect(spy).toHaveBeenNthCalledWith(3, `Location map was installed on ${robotSoldier._locationMap}.`);
    expect(spy).toHaveBeenNthCalledWith(4, 'No shooting.');
  });

  test('should show shooting status if turned on', () => {
    const spy = jest.spyOn(console, 'log');
    robotSoldier.turnOnOff();
    robotSoldier.startStopShooting();
    robotSoldier.showShootingStatus();
    robotSoldier.startStopShooting();
    robotSoldier.showShootingStatus();
    expect(spy).toHaveBeenNthCalledWith(3, 'Shooting in progress.');
    expect(spy).toHaveBeenNthCalledWith(5, 'No shooting.');
  });
});
