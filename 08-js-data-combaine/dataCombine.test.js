import dataCombine from './dataCombine';

const mock1 = [10, 'test', true, [20, 30], { a: 1, b: 2 }];
const mock2 = [10, '', true, [20, 30], { a: null, b: 2 }];
const mock3 = [10, '0', true, null, [20, 30], { a: 1, b: 2 }];
const mock4 = [10, '0', true, [undefined, 30], { a: null, b: 2 }];

const resultArray1 = [10, 'test', true, 20, 30, 1, 2];
const resultArray2 = [10, '', true, 20, 30, null, 2];
const resultArray3 = [10, '0', true, null, 20, 30, 1, 2];
const resultArray4 = [10, '0', true, undefined, 30, null, 2];

const resultObject1 = { key1: 10, key2: 'test', key3: true, 0: 20, 1: 30, a: 1, b: 2 };
const resultObject2 = { key1: 10, key2: '', key3: true, 0: 20, 1: 30, a: null, b: 2 };
const resultObject3 = { key1: 10, key2: '0', key3: true, key4: null, 0: 20, 1: 30, a: 1, b: 2 };
const resultObject4 = { key1: 10, key2: '0', key3: true, 0: undefined, 1: 30, a: null, b: 2 };

describe('Combine into a number', () => {
  test('should return value of type Number', () => {
    expect(typeof dataCombine('number', ...mock1)).toBe('number');
    expect(typeof dataCombine('number', ...mock2)).toBe('number');
    expect(typeof dataCombine('number', ...mock3)).toBe('number');
    expect(typeof dataCombine('number', ...mock4)).toBe('number');
  });

  test('should return correct value', () => {
    expect(dataCombine('number', ...mock1)).toBeNaN();
    expect(dataCombine('number', ...mock2)).toBe(63);
    expect(dataCombine('number', ...mock3)).toBe(64);
    expect(dataCombine('number', ...mock4)).toBeNaN();
  });
});

describe('Combine into a string', () => {
  test('should return value of type String', () => {
    expect(typeof dataCombine('string', ...mock1)).toBe('string');
    expect(typeof dataCombine('string', ...mock2)).toBe('string');
    expect(typeof dataCombine('string', ...mock3)).toBe('string');
    expect(typeof dataCombine('string', ...mock4)).toBe('string');
  });

  test('should return correct value', () => {
    expect(dataCombine('string', ...mock1)).toBe('10testtrue203012');
    expect(dataCombine('string', ...mock2)).toBe('10true2030null2');
    expect(dataCombine('string', ...mock3)).toBe('100truenull203012');
    expect(dataCombine('string', ...mock4)).toBe('100trueundefined30null2');
  });
});

describe('Combine into a boolean', () => {
  test('should return first "falsy" or last value', () => {
    expect(dataCombine('boolean', ...mock1)).toBe(2);
    expect(dataCombine('boolean', ...mock2)).toBe('');
    expect(dataCombine('boolean', ...mock3)).toBeNull();
    expect(dataCombine('boolean', ...mock4)).toBeUndefined();
  });
});

describe('Combine into an array', () => {
  test('should return flat array of parameters', () => {
    expect(dataCombine('array', ...mock1)).toEqual(resultArray1);
    expect(dataCombine('array', ...mock2)).toEqual(resultArray2);
    expect(dataCombine('array', ...mock3)).toEqual(resultArray3);
    expect(dataCombine('array', ...mock4)).toEqual(resultArray4);
  });
});

describe('Combine into an object', () => {
  test('should return object of parameters as values of keys', () => {
    expect(dataCombine('object', ...mock1)).toEqual(resultObject1);
    expect(dataCombine('object', ...mock2)).toEqual(resultObject2);
    expect(dataCombine('object', ...mock3)).toEqual(resultObject3);
    expect(dataCombine('object', ...mock4)).toEqual(resultObject4);
  });
});
