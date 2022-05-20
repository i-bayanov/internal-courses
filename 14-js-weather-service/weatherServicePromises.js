/* eslint no-console: 0 */
/* eslint max-classes-per-file: ["error", { max: 2 }] */

const DEFAULT_CITY_LIST = {
  'Кампала, Уганда': 0,
  'Пхукет, Тайланд': 8,
  'Санто-Доминго, Доминикана': 18,
  'Дубай, Арабские Эмираты': 25,
  'Шанхай, Китай': 31,
  'Лос-Анжелес, США': 34,
  'Мадрид, Испания': 40,
  'Париж, Франция': 49,
  'Лондон, Великобритания': 52,
  'Москва, Россия': 56,
  'Осло, Норвегия': 60,
  'Мурманск, Россия': 69,
};

const makeRandomLatency = (pass, func, ...args) => new Promise((res, rej) => {
  const latency = Math.round(Math.random() * 1500) + 500;
  setTimeout(() => (pass ? res(func(...args)) : rej(func(...args))), latency);
});

class WeatherServer {
  constructor(cityList = DEFAULT_CITY_LIST) {
    this._cityList = cityList;
  }

  getCityList() {
    return makeRandomLatency(true, () => Object.keys(this._cityList));
  }

  getAverageTemperature(city, day) {
    if (!(city in this._cityList)) {
      return makeRandomLatency(false, () => new Error('В списке нет такого города'));
    }

    if (!(day >= 1 && day <= 365 && Number.isInteger(day))) {
      return makeRandomLatency(false, () => new Error('Неверный формат дня. Дожно быть целое число от 1 до 365'));
    }

    const t = 30 + this._cityList[city] * (Math.abs(182 - Math.abs(202 - day)) / 210 - 1);

    return makeRandomLatency(true, () => Math.round(t * 10) / 10);
  }
}

class ClientApp {
  constructor(weatherServer) {
    this._server = weatherServer;
  }

  _getAverageTemperature(city, day) {
    return Promise.race([
      this._server.getAverageTemperature(city, day),
      this.constructor.setMaxResponseTime(1500),
    ]);
  }

  showCityList() {
    Promise.race([
      this._server.getCityList(),
      this.constructor.setMaxResponseTime(1500),
    ])
      .then((res) => res.forEach((el) => console.log(el)))
      .catch((e) => console.log(e.message));
  }

  showAverageTemperature(city, day) {
    const date = this.constructor.getDateFromDayNumber(day);
    this._getAverageTemperature(city, day)
      .then((t) => console.log(`Город ${city} ${date}, средняя температура: ${t}°C`))
      .catch((e) => console.log(e.message));
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

export { WeatherServer, ClientApp };
