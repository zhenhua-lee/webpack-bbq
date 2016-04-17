'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpHash = require('http-hash');

var _httpHash2 = _interopRequireDefault(_httpHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = (0, _httpHash2.default)();

var web = function web(initialState) {
  require('./web')(initialState);
};
hash.set('/web/*', web);
hash.set('/web.html', web);

var m = function m(initialState) {
  require('basscss/css/basscss.css'), require('./m')(initialState);
};
hash.set('/m/*', m);
hash.set('/m.html', m);

var hare = function hare(initialState) {
  require('./hare')(initialState);
};
hash.set('/hare/*', hare);
hash.set('/hare.html', hare);

exports.default = hash;
module.exports = exports['default'];