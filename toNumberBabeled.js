'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function toNumber(x) {
  var customs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (customs !== Object(customs)) // customs must be an object
    throw 'bad parameter.';

  var defaults = {
    onFail: function onFail(x) {
      return null;
    },

    onSuccess: function onSuccess(x) {
      return x;
    },

    stringToNumber: function stringToNumber(x) {
      var stripped = x.replace(/[$%, ]/g, '');
      return stripped === '' ? null : Number(stripped);
    },

    isNumber: function isNumber(x) {
      return typeof x === 'number' && !Number.isNaN(x) && Number.isFinite(x);
    },

    numberConstraint: function numberConstraint(x) {
      return x;
    }
  };

  var _ = _extends({}, defaults, customs);

  if (Object.keys(_).length !== Object.keys(defaults).length) // catches typos
    throw 'bad parameter.';

  switch (typeof x === 'undefined' ? 'undefined' : _typeof(x)) {
    case 'string':
      x = _.stringToNumber(x);
    case 'number':
      if (_.isNumber(x) && _.numberConstraint(x)) break;
    default:
      return _.onFail(x);
  }

  return _.onSuccess(x);
};

module.exports = { toNumber: toNumber };
