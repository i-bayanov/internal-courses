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

export default class WeatherServer {
  constructor(cityList = DEFAULT_CITY_LIST) {
    this._cityList = cityList;
  }

  async getCityList() {
    const list = await makeRandomLatency(true, () => Object.keys(this._cityList));

    return list;
  }

  async getAverageTemperature(city, day) {
    let response = null;

    if (!(city in this._cityList)) {
      response = await makeRandomLatency(false, () => new Error('В списке нет такого города'));

      return response;
    }

    if (!(day >= 1 && day <= 365 && Number.isInteger(day))) {
      response = await makeRandomLatency(false, () => new Error('Неверный формат дня. Дожно быть целое число от 1 до 365'));

      return response;
    }

    const t = 30 + this._cityList[city] * (Math.abs(182 - Math.abs(202 - day)) / 210 - 1);
    response = await makeRandomLatency(true, () => Math.round(t * 10) / 10);

    return response;
  }
}
