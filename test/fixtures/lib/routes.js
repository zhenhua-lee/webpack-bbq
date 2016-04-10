'use strict';

var _WebIndexRoute = require('./WebIndexRoute');

var _WebIndexRoute2 = _interopRequireDefault(_WebIndexRoute);

var _WebContainer = require('./WebContainer');

var _WebContainer2 = _interopRequireDefault(_WebContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  path: '/web',
  indexRoute: { component: _WebIndexRoute2.default },
  component: _WebContainer2.default,
  getChildRoutes: function getChildRoutes(location, callback) {
    // TODO 需要一个约定？ 或者 bundle-loader 来解救？
    callback(null, require('./peanut.routes'));
  }
};