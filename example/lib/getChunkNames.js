'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hash = require('./hash');

var getChunkNames = function getChunkNames(location) {
  var route = hash.get(location.pathname);
  var chunkNames = [];
  if (route.src === '/web/*') {
    chunkNames.push('web');
  }
  if (route.src === '/m/*') {
    chunkNames.push('m');
  }
  if (route.src === '/hare/*') {
    chunkNames.push('hare');
  }
  var peanut = location.pathname.split('/')[2];
  if (peanut === 'peanut' || peanut === 'peanut.html') {
    chunkNames.push('peanut');
  }
  return chunkNames;
};

exports.default = getChunkNames;
module.exports = exports['default'];