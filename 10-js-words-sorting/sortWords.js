export default function sortWords(sentence) {
  const sentenceArray = sentence.split(' ').map((word) => word.toLowerCase().replace(/[^A-Za-zА-ЯЁа-яё]/g, ''));
  const sortedByLength = [];
  let sorted = [];

  sentenceArray.forEach((word) => {
    if (!Object.prototype.hasOwnProperty.call(sortedByLength, word.length)) {
      sortedByLength[word.length] = [];
    }
    sortedByLength[word.length].push(word);
  });
  delete sortedByLength[0];
  sortedByLength.forEach((arr) => { sorted = [...sorted, ...sortAlphabetically(arr)]; });

  return sorted;
}

function sortAlphabetically(wordsArray) {
  if (wordsArray.length === 0) { return []; }

  const smaller = [];
  const bigger = [];

  wordsArray.slice(1).forEach((word) => {
    if (word.localeCompare(wordsArray[0], 'ru-RU') < 0) {
      smaller.push(word);
    } else {
      bigger.push(word);
    }
  });

  return [...sortAlphabetically(smaller), wordsArray[0], ...sortAlphabetically(bigger)];
}
