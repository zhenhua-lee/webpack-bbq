'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpHash = require('http-hash');

var _httpHash2 = _interopRequireDefault(_httpHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('bootstrap/dist/css/bootstrap.css');
require('./web.global.css');

var hash = (0, _httpHash2.default)();
hash.set('/web/*', function (initialState) {
  require('./web')(initialState);
});
hash.set('/m/*', function (initialState) {
  require('./m')(initialState);
});

exports.default = function (initialState) {
  var node = hash.get(location.pathname);
  if (node.handler) {
    node.handler(initialState);
  }
};

module.exports = exports['default'];