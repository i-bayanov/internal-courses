import sortWords from '../10-js-words-sorting/sortWords';

const englishText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean eros dui, egestas vel pretium eu, interdum efficitur ipsum.
  In auctor mauris quis nisi dignissim, sed hendrerit lectus placerat.`;
const sortedEnglish = ['eu', 'in', 'dui', 'sed', 'sit', 'vel', 'amet', 'elit', 'eros', 'nisi', 'quis',
  'dolor', 'ipsum', 'ipsum', 'lorem', 'aenean', 'auctor', 'lectus', 'mauris', 'egestas', 'pretium',
  'interdum', 'placerat', 'dignissim', 'efficitur', 'hendrerit', 'adipiscing', 'consectetur'];
const russianText = `Написать функцию для разбиения предложений на слова
  (массив строк) и для их сортировки сначала по длине слов, затем по
  алфавиту (для слов с одинаковой длиной) в порядке возрастания.`;
const sortedRussian = ['в', 'и', 'с', 'их', 'на', 'по', 'по', 'для', 'для', 'для', 'слов', 'слов',
  'длине', 'затем', 'слова', 'строк', 'длиной', 'массив', 'порядке', 'сначала', 'функцию',
  'алфавиту', 'написать', 'разбиения', 'одинаковой', 'сортировки', 'возрастания', 'предложений'];

describe('Sort function', () => {
  test('should sort english text', () => {
    expect(sortWords(englishText)).toEqual(sortedEnglish);
  });

  test('should sort russian text', () => {
    expect(sortWords(russianText)).toEqual(sortedRussian);
  })
});
