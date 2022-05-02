/* eslint-disable */

Array.prototype.mapPolyfill = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.mapPolyfill called on null or undefined');
  }

  var length = Number(this.length);

  if (length <= 0 || isNaN(length)) {
    return [];
  }

  if (!isFinite(length)) {
    throw new RangeError('Invalid array length');
  }

  var newArray = [];

  for (var i = 0; i < length; i++) {
    if (!this.hasOwnProperty(i)) {
      newArray[i] = null;
      delete newArray[i];
      continue;
    }

    newArray[i] = callback.call(thisArg, this[i], i, this);
  }

  return newArray;
};
