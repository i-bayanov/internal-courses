/* eslint-disable */

Array.prototype.filterPolyfill = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.filterPolyfill called on null or undefined');
  }

  var length = Number(this.length);

  if (length <= 0 || isNaN(length)) {
    return [];
  }

  if (!isFinite(length)) {
    throw new RangeError('Invalid array length');
  }

  var newArray = [];
  var index = 0;

  for (var i = 0; i < length; i++) {
    if (!this.hasOwnProperty(i)) {
      continue;
    }

    if (callback.call(thisArg, this[i], i, this)) {
      newArray[index] = this[i];
      index++;
    }
  }

  return newArray;
};
