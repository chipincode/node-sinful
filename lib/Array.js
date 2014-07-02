void function () {
  'use strict';

  var sinfulArray = (function () {
    var liberate = require('./liberate'),
        slice    = liberate(Array.prototype.slice);

    var funcs = {
      greedyZip: function () {
        var args    = slice(arguments),
            longest = Array.prototype.longest.apply(null, args);

        return longest.reduce(function (prev, cur, i) {
            prev.push(args.map(function (array) {
                return array[i];
              }));

            return prev;
          }, []);
      },

      greedyZipWith: function () {
        var zipper  = arguments[0],
            args    = slice(arguments, 1),
            longest = Array.prototype.longest.apply(null, args);

       return longest.reduce(function (prev, cur, i) {
            prev.push(zipper.apply(null, args.map(function (array) {
                return array[i];
            })));

            return prev;
          }, []);
      },

      last: function () {
        return this[ this.length - 1 ];
      },

      longest: function () {
        return slice(arguments).reduce(function (p, c) {
            return (p.length > c.length) ? p : c;
          });
      },

      partition: function (length) {
        var result, each;

        if (typeof length === 'undefined' || length <= 0) {
          return [];
        }

        result = [];
        each   = [];

        this.forEach(function (value) {
          each.push(value);

          if (each.length === length) {
            result.push(each);
            each = [];
          }
        });

        return result.concat(each.length > 0 ? [ each ] : []);
      },

      shortest: function () {
        return slice(arguments).reduce(function (p, c) {
            return (p.length < c.length) ? p : c;
          });
      },

      unique: function (search) {
        search = search || this.indexOf;

        return this.reduce(function (result, each) {
            if (search.call(result, each) === -1) {
              result.push(each);
            }
            return result;
          }, []);
      },

      zip: function () {
        var args     = slice(arguments),
            shortest = Array.prototype.shortest.apply(null, args);

        return shortest.reduce(
          function (prev, cur, i) {
            prev.push(args.map(function (array) { return array[i]; }));

            return prev;
          }, []);
      },

      zipWith: function () {
        var zipper   = arguments[0],
            args     = slice(arguments, 1),
            shortest = Array.prototype.shortest.apply(null, args);

        return shortest.reduce(function (prev, cur, i) {
            prev.push(zipper.apply(null, args.map(function (array) {
                return array[i];
            })));

            return prev;
          }, []);
      }
    };

    var extender = require('./extender')(Array.prototype, funcs);

    return {
      greedyZip: funcs.greedyZip,
      greedyZipWith: funcs.greedyZipWith,
      last: funcs.last,
      longest: funcs.longest,
      partition: funcs.partition,
      shortest: funcs.shortest,
      unique: funcs.unique,
      zip: funcs.zip,
      zipWith: funcs.zipWith,
      extend: extender.extend,
      flush: extender.flush
    };
  })();

  module.exports = sinfulArray;

}();