/* eslint-disable */

Function.prototype.bindPolyfill = function (boundThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bindPolyfill - what is trying to be bound is not callable');
  }

  var target = this;
  var boundArgs = Array.prototype.slice.call(arguments, 1);

  return function () {
    return target.apply(boundThis, boundArgs.concat(Array.prototype.slice.call(arguments)));
  };
};
