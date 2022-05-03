import server from './server.mjs';

const mock1 = { method: 'POST', body: '{"year":2021,"month":12,"day":23,"flag":false}', };
const mock2 = { method: 'POST', body: '{"year":2021,"month":12,"day":21,"flag":true}', };

describe('Server function', () => {
  test('should return valid JSON', () => {
    expect(() => { JSON.parse(server(mock1)) }).not.toThrow();
  });

  test('should return correct value', () => {
    expect(server(mock1)).toBe('"четверг"');
    expect(server(mock2)).toBe('"вт"');
  });
});
