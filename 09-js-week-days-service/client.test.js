import client from './client.mjs';

describe('Client function', () => {
  test('should throw an error if parameters is invalid', async () => {
    return expect(client('2021s', '12', '23', 'false')).rejects.toThrow();
  });

  test('should output its result to the console', async () => {
    const spy = jest.spyOn(console, 'log');
    await client('2021', '12', '23', 'false');
    expect(spy).toHaveBeenCalledWith('четверг');
  })
});
