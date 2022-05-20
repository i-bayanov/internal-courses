import { describe, expect, test, jest } from '@jest/globals';

import FastServer from './fastServer';

import {
  WeatherServer as WeatherServerPromises,
  ClientApp as ClientAppPromises
}
  from './weatherServicePromises';

import {
  WeatherServer as WeatherServerAsync,
  ClientApp as ClientAppAsync
}
  from './weatherServiceAsync';

import { default as WeatherServerModules } from './modules/server';
import { default as ClientAppModules } from './modules/client';

const fastServer = new FastServer();

const serverPromises = new WeatherServerPromises();
const clientPromises = new ClientAppPromises(fastServer);

const serverAsync = new WeatherServerAsync();
const clientAsync = new ClientAppAsync(fastServer);

const serverModules = new WeatherServerModules();
const clientModules = new ClientAppModules(fastServer);

const cityList = ['Кампала, Уганда', 'Пхукет, Тайланд', 'Санто-Доминго, Доминикана',
  'Дубай, Арабские Эмираты', 'Шанхай, Китай', 'Лос-Анжелес, США', 'Мадрид, Испания',
  'Париж, Франция', 'Лондон, Великобритания', 'Москва, Россия', 'Осло, Норвегия', 'Мурманск, Россия'];

describe.each([
  { server: serverPromises, client: clientPromises, name: 'Promises' },
  { server: serverAsync, client: clientAsync, name: 'Async/await' },
  { server: serverModules, client: clientModules, name: 'ES6 modules' },
])('\nTest case $name', ({ server, client, name }) => {
  describe('Server', () => {
    describe('should return', () => {
      test('correct city list', async () => {
        const list = await server.getCityList();
        expect(list).toEqual(cityList);
      });

      test('correct average temperature', async () => {
        const t = await server.getAverageTemperature('Москва, Россия', 202);
        expect(t).toBe(22.5);
      });
    });

    describe('should respond between 0.5 and 2 seconds', () => {
      jest.setTimeout(10000);
      for (let i = 0; i < 5; i++) {
        test(`${i + 1} attempt`, done => {
          function checkTime(ms) {
            expect(ms).toBeLessThanOrEqual(2000);
            expect(ms).toBeGreaterThanOrEqual(500);
            done();
          }

          const start = Date.now();
          server.getCityList().then(() => checkTime(Date.now() - start));
        });
      }
    });

    describe('should throw an Error if', () => {
      test('city was requested incorrectly', () => {
        return expect(server.getAverageTemperature('Моска, Россия', 202)).rejects.toThrow(new Error('В списке нет такого города'));
      });

      test('day was requested incorrectly', () => {
        return expect(server.getAverageTemperature('Москва, Россия', 2002)).rejects.toThrow(new Error('Неверный формат дня. Дожно быть целое число от 1 до 365'));
      });
    });
  });

  describe('Client App', () => {
    expect.extend({
      async toResolvesWithValueOrRejectsWithError(received, value, expectedError) {
        // Makes a request to the server and checks if the response is as expected.
        // If the request returns an error, checks if the error is correct.
        // Example: async () => {
        //            await expect(client._getAverageTemperature('Москва, Россия', 202)).toResolvesWithValueOrRejectsWithError(22.5, new Error('Истекло время ожидания ответа от сервера'));
        //          }
        try {
          const res = await received;

          if (res === value) {
            return {
              message: () => `Expected not: ${value}\nReceived: ${res}`,
              pass: true,
            };
          }

          return {
            message: () => `Expected: ${value}\nReceived: ${res}`,
            pass: false,
          };
        } catch (err) {
          if (Object.is(err, expectedError)) {
            return {
              message: () => `Expected not to throw an error: ${expectedError.message}\nReceived error: ${err.message}`,
              pass: true,
            };
          }

          return {
            message: () => `Expected error: ${expectedError.message}\nReceived error: ${err.message}`,
            pass: false,
          };
        }
      },

      async toEverResolvesWithValue([object, asyncMethod, ...args], value) {
        // Makes a request to the server and checks if the response is as expected.
        // If the request returns an error, makes a new request. Up to 10 times in a row.
        // Example: async () => {
        //            await expect([client, '_getAverageTemperature', 'Москва, Россия', 202]).toEverResolvesWithValue(22.5);
        //          }
        async function tryHarder(obj, asyncFunc, argsArray, attempt) {
          try {
            attempt++;
            const res = await obj[asyncFunc](...argsArray);

            if (res === value) {
              return {
                message: () => `Expected not: ${value}\nReceived: ${res}`,
                pass: true,
              };
            }

            return {
              message: () => `Expected: ${value}\nReceived: ${res}`,
              pass: false,
            };
          } catch (err) {
            if (attempt >= 10) {
              return {
                message: () => `Received errors ${attempt} times in a row`,
                pass: false,
              };
            }

            return await tryHarder(obj, asyncFunc, argsArray, attempt);
          }
        }

        return await tryHarder(object, asyncMethod, args, 0);
      },
    });

    test('should send a request to the server to get the average temperature of the selected city on the specified day of the year', async () => {
      await expect(client._getAverageTemperature('Москва, Россия', 202)).resolves.toBe(22.5);
    });

    test('should display a list of available cities in the console', done => {
      const spy = jest.spyOn(console, 'log');
      client.showCityList();
      setTimeout(() => {
        cityList.forEach((city, index) => {
          expect(spy).toHaveBeenNthCalledWith(index + 1, city);
        });
        done();
      }, 550);
    });

    test('should calculate the date corresponding to the number of the day in the year', () => {
      expect(client.constructor.getDateFromDayNumber(202)).toBe('21 июля');
    });

    test('should display a message to the console with the average temperature', done => {
      const spy = jest.spyOn(console, 'log');
      client.showAverageTemperature('Москва, Россия', 202)
      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith('Город Москва, Россия 21 июля, средняя температура: 22.5°C');
        done();
      }, 550);
    });

    describe('should handle errors when', () => {
      test('city was requested incorrectly', done => {
        const spy = jest.spyOn(console, 'log');
        client.showAverageTemperature('Моска, Россия', 202)
        setTimeout(() => {
          expect(spy).toHaveBeenCalledWith('В списке нет такого города');
          done();
        }, 550);
      });

      test('day was requested incorrectly', done => {
        const spy = jest.spyOn(console, 'log');
        client.showAverageTemperature('Москва, Россия', 2020)
        setTimeout(() => {
          expect(spy).toHaveBeenCalledWith('Неверный формат дня. Дожно быть целое число от 1 до 365');
          done();
        }, 550);
      });

      test('server response is longer than 1.5s', async () => {
        // This is not a handler, just a check that client can throw an error if response is longer than 1.5s
        await expect(Promise.race([
          fastServer.longRequest(2000),
          client.constructor.setMaxResponseTime(1500),
        ])).rejects.toThrow(new Error('Истекло время ожидания ответа от сервера'));
      });
    });
  });

  describe(`Test case ${name}`, () => {
    test('finished\n###########################################################', () => { });
  });
});
