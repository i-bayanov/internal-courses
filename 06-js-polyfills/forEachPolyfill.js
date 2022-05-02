/* eslint-disable */

Array.prototype.forEachPolyfill = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.forEachPolyfill called on null or undefined');
  }

  var length = Number(this.length);

  if (length <= 0 || isNaN(length)) {
    return;
  }

  if (!isFinite(length)) {
    throw new RangeError('Invalid array length');
  }

  for (var i = 0; i < length; i++) {
    if (!this.hasOwnProperty(i)) {
      continue;
    }

    callback.call(thisArg, this[i], i, this);
  }
};
