void function () {
  'use strict'

  module.exports = function (func) {  
    return function () {
      return func.bind(null, this).apply(null, arguments);
    };
  };
  
}();
