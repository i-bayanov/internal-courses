/* eslint-disable */

Array.prototype.everyPolyfill = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.everyPolyfill called on null or undefined');
  }

  var length = Number(this.length);

  if (length <= 0 || isNaN(length)) {
    return true;
  }

  for (var i = 0; i < length; i++) {
    if (!this.hasOwnProperty(i)) {
      continue;
    }

    if (!callback.call(thisArg, this[i], i, this)) {
      return false;
    }
  }

  return true;
};
