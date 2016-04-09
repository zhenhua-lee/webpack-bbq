'use strict';

var _WebIndexRoute = require('./WebIndexRoute');

var _WebIndexRoute2 = _interopRequireDefault(_WebIndexRoute);

var _WebContainer = require('./WebContainer');

var _WebContainer2 = _interopRequireDefault(_WebContainer);

var _PeaNut = require('./PeaNut');

var _PeaNut2 = _interopRequireDefault(_PeaNut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  path: '/web',
  indexRoute: _WebIndexRoute2.default,
  component: _WebContainer2.default,
  childRoutes: [{
    path: 'peanut',
    component: _PeaNut2.default
  }]
};