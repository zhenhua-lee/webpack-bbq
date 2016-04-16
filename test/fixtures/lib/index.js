'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('bootstrap/dist/css/bootstrap.css');
require('./web.global.css');

var hash = require('./hash');

var node = hash.get(location.pathname);

exports.default = function (initialState) {
  if (node.handler) {
    node.handler(window.initialState);
  }
};

module.exports = exports['default'];