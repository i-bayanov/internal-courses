/* eslint-disable */

Array.prototype.findPolyfill = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.findPolyfill called on null or undefined');
  }

  var length = Number(this.length);

  if (length <= 0 || isNaN(length)) {
    return;
  }

  for (var i = 0; i < length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
};
