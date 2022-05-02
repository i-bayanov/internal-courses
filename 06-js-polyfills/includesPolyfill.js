/* eslint-disable */

Array.prototype.includesPolyfill = function (searchElement, fromIndex) {
  if (this == null) {
    throw new TypeError('Array.prototype.includesPolyfill called on null or undefined');
  }

  var length = Number(this.length);

  if (length <= 0 || isNaN(length)) {
    return false;
  }

  var firstIndex = fromIndex || 0;
  firstIndex = Math.max(firstIndex >= 0 ? firstIndex : length - firstIndex, 0);

  for (var i = firstIndex; i < length; i++) {
    if (this[i] === searchElement) {
      return true;
    }
  }

  return false;
};
