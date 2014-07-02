void function () {
  'use strict';

  var sinfulObject = (function () {

    var liberate = require('./liberate'),
        own      = Object.getOwnPropertyNames,
        reduce   = liberate(Array.prototype.reduce);

    // deepCopy helpers

    function clonePrimitive(primitive) {
      return primitive;
    }

    function cloneRegExp(regexp) {
      return RegExp(regexp);
    }

    function cloneDate(date) {
      return new Date(date.getTime());
    }

    function cloneFunction(fn) {
      var copy = Function('return ' + fn.toString() + ';')();

      copy.prototype = Object.getPrototypeOf(fn);

      return copy;
    }

    // This will not properly clone `constructed` objects
    // because it is impossible to know with what arguments the constructor
    // was originally invoked.
    function cloneObject(object) {
      return Object.create(Object.getPrototypeOf(object));
    }

    function cloneArray(array) {
      return [];
    }

    function makeCloner(cloneThing) {
      return function (thing, thingStack, copyStack) {
        var copy = cloneThing(thing);

        thingStack.push(thing);
        copyStack.push(copy);

        return copy;
      };
    }

    function makeRecCloner(cloneThing, blacklist) {
      return function (thing, thingStack, copyStack) {
        var clone = this;

        return own(thing).
          filter(function (prop) {
              return !blacklist || blacklist.indexOf(prop) === -1;
          }).
          reduce(function (copy, prop) {
            var thingOffset = thingStack.indexOf(thing[prop]);

            copy[prop] = (thingOffset === -1) ?
                            clone(thing[prop]) :
                            copyStack[thingOffset];

            return copy;
          }, cloneThing(thing, thingStack, copyStack));
      };
    }

    var funcs = {
      deepCopy: (function () {
        var funcBlacklist   = ['caller', 'arguments', 'prototype' ],
            primitiveCloner = makeCloner(clonePrimitive),
            cloneFunctions  = {
              '[object Null]':      primitiveCloner,
              '[object Undefined]': primitiveCloner,
              '[object Number]':    primitiveCloner,
              '[object String]':    primitiveCloner,
              '[object Boolean]':   primitiveCloner,
              '[object RegExp]':    makeCloner(cloneRegExp),
              '[object Date]':      makeCloner(cloneDate),
              '[object Function]':  makeRecCloner(makeCloner(cloneFunction), funcBlacklist),
              '[object Object]':    makeRecCloner(makeCloner(cloneObject)),
              '[object Array]':     makeRecCloner(makeCloner(cloneArray))
            };

        return function () {
          var thingStack = [],
              copyStack  = [];

          function clone(thing){
            var type = Object.prototype.toString.call(thing);

            return cloneFunctions[type].call(clone, thing, thingStack, copyStack);
          }

          return clone(this);
        };
      })(),

      forEachOwn: function (func, thisArg) {
        return own(this).forEach(func, thisArg);
      },

      mapOwn: function (func, thisArg) {
        return own(this).map(func, thisArg);
      },

      intercept: function (func) {
        func(this);
        return this;
      },

      maybe: function (propertyPath, otherwise) {
        return (Array.isArray(propertyPath) ?
                    propertyPath :
                    propertyPath.split(/\./)).reduce(function (current, next) {

            return typeof current[next] === 'undefined' ?
                            otherwise :
                            current[next];
        }, this);
      }
    };

    var extender = require('./extender')(Object.prototype, funcs);

    return {
      deepCopy: funcs.deepCopy,
      forEachOwn: funcs.forEachOwn,
      mapOwn: funcs.mapOwn,
      intercept: funcs.intercept,
      maybe: funcs.maybe,
      extend: extender.extend,
      flush: extender.flush
    };
  })();

  module.exports = sinfulObject;

}();