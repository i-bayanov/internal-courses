import { Calculator } from '../index.js';

const calcFloor = new Calculator(true);
const calcCeil = new Calculator(false);

describe('Class instances', () => {
  test('should have one boolean property', () => {
    expect(calcFloor).toEqual({ shouldRoundFloor: true });
    expect(calcCeil).toEqual({ shouldRoundFloor: false });
  });
});

describe('Sum method', () => {
  test('should return an integer rounded down', () => {
    expect(calcFloor.sum(2.3, 1.1)).toBe(3);
  });

  test('should return an integer rounded up', () => {
    expect(calcCeil.sum(2.3, 1.1)).toBe(4);
  });
});

describe('Show result method', () => {
  test('should output its argument to the console', () => {
    const spy = jest.spyOn(console, 'log');
    calcFloor.showResult(10);
    expect(spy).toHaveBeenCalledWith(10);
  });
});

describe('Sum and show result method', () => {
  describe('should call "Sum method" and then output its result to the console', () => {
    const spySumMethod = jest.spyOn(Calculator.prototype, 'sum');
    const spyConsole = jest.spyOn(console, 'log');

    test('with round down', () => {
      calcFloor.sumAndShowResult(2.3, 1.1);
      expect(spySumMethod).toHaveBeenCalledWith(2.3, 1.1);
      expect(spyConsole).toHaveBeenCalledWith(3);
    });

    test('with round up', () => {
      calcCeil.sumAndShowResult(2.3, 1.1);
      expect(spySumMethod).toHaveBeenCalledWith(2.3, 1.1);
      expect(spyConsole).toHaveBeenCalledWith(4);
    });
  });
});
