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
  if (location.pathname.split('/')[2] === 'peanut') {
    chunkNames.push('peanut');
  }
  return chunkNames;
};

exports.default = getChunkNames;
module.exports = exports['default'];