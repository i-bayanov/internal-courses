/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
/* eslint no-console: 0 */

import WeatherServer from './server.js';

export default class ClientApp {
  constructor(weatherServer) {
    this._server = weatherServer;
  }

  async _getAverageTemperature(city, day) {
    const response = await Promise.race([
      this._server.getAverageTemperature(city, day),
      this.constructor.setMaxResponseTime(1500),
    ]);

    return response;
  }

  async showCityList() {
    try {
      const res = await Promise.race([
        this._server.getCityList(),
        this.constructor.setMaxResponseTime(1500),
      ]);
      res.forEach((el) => console.log(el));
    } catch (err) {
      console.log(err.message);
    }
  }

  async showAverageTemperature(city, day) {
    try {
      const date = this.constructor.getDateFromDayNumber(day);
      const t = await this._getAverageTemperature(city, day);
      console.log(`Город ${city} ${date}, средняя температура: ${t}°C`);
    } catch (err) {
      console.log(err.message);
    }
  }

  static months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  static setMaxResponseTime(ms) {
    return new Promise((_res, rej) => { setTimeout(() => rej(new Error('Истекло время ожидания ответа от сервера')), ms); });
  }

  static getDateFromDayNumber(day) {
    const JAN_1_2021 = new Date(2021, 0);
    const date = new Date(JAN_1_2021.setDate(day));

    return `${date.getDate()} ${this.months[date.getMonth()]}`;
  }
}

window.client = new ClientApp(new WeatherServer());
