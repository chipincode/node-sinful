void function () {
  'use strict';

  var sinfulFunction = (function () {

    var liberate = require('./liberate'),
        enslave  = require('./enslave'),
        slice    = liberate(Array.prototype.slice);

    var funcs = {
      bundle: function () {
        var funcs = slice(arguments);

        return function () {
          var args = arguments;

          return funcs.map(function (func) {
              return func.apply(this, args)
            }.bind(this));
          };
      },

      compose: function (other) {
        var chain = [ this ].concat(slice(arguments));

        return function () {
          return chain.reduceRight(function (prev, curr) {
              return [ curr.apply(null, prev) ];
            }, slice(arguments)).pop();
          };
      },

      curry: function (depth) {
        var curry;

        if (arguments.length > 1) {
           throw new Error('One parameter expected, ' + arguments.length + ' received.');
        }

        if (typeof depth !== 'undefined' && depth < 1) {
           throw new Error('Invalid depth received (' + depth + ').');
        }

        curry = function (arity) {
          var that = this,
              args = slice(arguments, 1);

          return function () {
              var allArgs = args.concat(slice(arguments));

              return allArgs.length >= arity ?
                that.apply(this, allArgs) :
                curry.apply(that, [arity].concat(allArgs));
            };
        };

        return curry.call(this, depth || this.length);
      },

      enslave: enslave,

      iterate: function (last) {
        var that = this;

        return function () { return last = that(last); };
      },

      liberate: liberate,

      memoize: function (func, keyGen) {
        var cache = {};

        keyGen = keyGen || function (args) {
            return JSON.stringify(args);
        };

        return function () {
            var args = slice(arguments),
                key  = keyGen(args);

            return (typeof cache[key] === 'undefined') ?
              cache[key] = func.apply(null, args) :
              cache[key];
          };
      },

      reducerify: function (initialValue) {
        var fn = this;

        return arguments.length ?
            function () { return slice(arguments).reduce(fn, initialValue); } :
            function () { return slice(arguments).reduce(fn); };
      },

      then: function(func) {
        var that = this;

        return function() { return func(that.apply(null, arguments)); };
      }
    };

    var extender = require('./extender')(Function.prototype, funcs);

    return {
      bundle: funcs.bundle,
      compose: funcs.compose,
      curry: funcs.curry,
      enslave: enslave,
      iterate: funcs.iterate,
      liberate: liberate,
      memoize: funcs.memoize,
      reducerify: funcs.reducerify,
      then: funcs.then,
      extend: extender.extend,
      flush: extender.flush
    };
  })();

  module.exports = sinfulFunction;

}();