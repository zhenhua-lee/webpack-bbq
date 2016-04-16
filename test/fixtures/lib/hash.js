'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpHash = require('http-hash');

var _httpHash2 = _interopRequireDefault(_httpHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = (0, _httpHash2.default)();
hash.set('/web/*', function (initialState) {
  require('./web')(initialState);
});
hash.set('/m/*', function (initialState) {
  require('basscss/css/basscss.css'), require('./m')(initialState);
});
hash.set('/hare/*', function (initialState) {
  require('./hare')(initialState);
});

exports.default = hash;
module.exports = exports['default'];