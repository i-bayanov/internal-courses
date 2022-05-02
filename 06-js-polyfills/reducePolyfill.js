/* eslint-disable */

Array.prototype.reducePolyfill = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.reducePolyfill called on null or undefined');
  }

  var length = Number(this.length);

  var isInitialValueProvided = arguments.length >= 2;

  if ((length <= 0 || isNaN(length)) && !isInitialValueProvided) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  if (!isFinite(length)) {
    throw new RangeError('Invalid array length');
  }

  var accumulator = isInitialValueProvided ? initialValue : this[0];
  var firstIndex = isInitialValueProvided ? 0 : 1;

  for (var i = firstIndex; i < length; i++) {
    if (!this.hasOwnProperty(i)) {
      continue;
    }

    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};
