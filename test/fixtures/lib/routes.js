'use strict';

var _WebIndexRoute = require('./WebIndexRoute');

var _WebIndexRoute2 = _interopRequireDefault(_WebIndexRoute);

var _WebContainer = require('./WebContainer');

var _WebContainer2 = _interopRequireDefault(_WebContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/web',
  indexRoute: { component: _WebIndexRoute2.default },
  component: _WebContainer2.default,
  getChildRoutes: function getChildRoutes(location, callback) {
    callback(null, require('./peanut.routes'));
  }
}, {
  path: '/m',
  component: _WebContainer2.default,
  indexRoute: { component: _WebIndexRoute2.default },
  getChildRoutes: function getChildRoutes(location, callback) {
    callback(null, require('./peanut.routes'));
  }
}, {
  path: '/hare',
  component: _WebContainer2.default,
  indexRoute: { component: _WebIndexRoute2.default },
  getChildRoutes: function getChildRoutes(location, callback) {
    callback(null, require('./peanut.routes'));
  }
}];

routes.getChunkNames = function (location) {
  var hash = require('./hash');
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
  if (location.pathname.indexOf('/peanut') !== -1) {
    chunkNames.push('peanut');
  }
  return chunkNames;
};

module.exports = routes;