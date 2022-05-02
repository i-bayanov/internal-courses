export default function debounce(f, ms) {
  let timerID = null;

  return function (...args) {
    clearTimeout(timerID);

    timerID = setTimeout(f, ms, ...args);
  };
}
