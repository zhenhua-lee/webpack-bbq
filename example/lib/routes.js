'use strict';

var _WebIndexRoute = require('./WebIndexRoute');

var _WebIndexRoute2 = _interopRequireDefault(_WebIndexRoute);

var _WebContainer = require('./WebContainer');

var _WebContainer2 = _interopRequireDefault(_WebContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/web.html',
  indexRoute: { component: _WebIndexRoute2.default },
  component: _WebContainer2.default
}, {
  path: '/web',
  indexRoute: { component: _WebIndexRoute2.default },
  component: _WebContainer2.default,
  getChildRoutes: function getChildRoutes(location, callback) {
    callback(null, require('./peanut.routes'));
  }
}, {
  path: '/m.html',
  component: _WebContainer2.default,
  indexRoute: { component: _WebIndexRoute2.default }
}, {
  path: '/m',
  component: _WebContainer2.default,
  indexRoute: { component: _WebIndexRoute2.default },
  getChildRoutes: function getChildRoutes(location, callback) {
    callback(null, require('./peanut.routes'));
  }
}, {
  path: '/hare.html',
  component: _WebContainer2.default,
  indexRoute: { component: _WebIndexRoute2.default }
}, {
  path: '/hare',
  component: _WebContainer2.default,
  indexRoute: { component: _WebIndexRoute2.default },
  getChildRoutes: function getChildRoutes(location, callback) {
    callback(null, require('./peanut.routes'));
  }
}];

module.exports = routes;