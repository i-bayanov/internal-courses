export default function throttle(f, ms) {
  let isDelayed = false;

  return function (...args) {
    if (isDelayed) {
      return;
    }

    isDelayed = true;
    setTimeout(() => { isDelayed = false; }, ms);
    f(...args);
  };
}
