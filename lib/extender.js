void function () {
  'use strict'
  
  module.exports = function (obj, funcs) {
    var defaultBless = require('./bless');

    return {
      extend: function (bless, method) {
        bless = bless || defaultBless;

        if (typeof method === 'undefined') {
          Object.keys(funcs).forEach(function (key) {
            return bless(obj, key, funcs[key]);
          });
        }
        else {
          bless(obj, method, funcs[method]);
        }
      },

      extendAll: function (bless) {
        bless = bless || defaultBless;

        ['Array', 'Function', 'Math', 'Number', 'Object', 'String'].forEach(
          function (lib) {
            require('./' + lib).extend(bless);
          }
        )
      },

      flush: function (method) {
        if (typeof method === 'undefined') {
          Object.keys(funcs).forEach(function (key) {
            if (obj[key] === funcs[key]) { 
              delete obj[key]; 
            }
          });
        }
        else if (obj[method] === funcs[method]) { 
          delete obj[method]; 
        }
      },

      flushAll: function () {
        ['Array', 'Function', 'Math', 'Number', 'Object', 'String'].forEach(
          function (lib) {
            require('./' + lib).flush();
          }
        )
      }
    };
  };
  
}();