'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _match = require('react-router/lib/match');

var _match2 = _interopRequireDefault(_match);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _expose = require('@mtfe/expose');

var _expose2 = _interopRequireDefault(_expose);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _appRevisions = require('../app-revisions.json');

var _appRevisions2 = _interopRequireDefault(_appRevisions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)(_reducers2.default);
var storeEnhancer = (0, _redux.applyMiddleware)(_reduxThunk2.default);

exports.default = function (location, cb) {
  var appName = (0, _expose2.default)(require.resolve('../src/'), _config2.default.basedir + '/src/');
  var initialState = {};
  var store = (0, _redux.createStore)(rootReducer, initialState, storeEnhancer);

  (0, _match2.default)({ location: location, routes: _routes2.default }, function (err, redirectLocation, renderProps) {
    if (err) {
      return cb(err);
    }
    if (redirectLocation) {
      return cb(new Error('redirectLocation: ' + redirectLocation));
    }
    if (!renderProps) {
      return cb(new Error('renderProps is missing'));
    }

    var el = (0, _react.createElement)(_App2.default, { store: store, router: renderProps });
    var appHtml = _server2.default.renderToString(el);

    var chunkNames = _routes2.default.getChunkNames(renderProps.location);
    var stylesheets = ['<link href="' + _config2.default.rootdir + _appRevisions2.default[appName + '.css'] + '" rel="stylesheet" />'];
    var javascripts = ['<script src="' + _config2.default.rootdir + _appRevisions2.default[appName + '.js'] + '"></script>'].concat(chunkNames.map(function (chunkName) {
      return '<script src="' + _config2.default.rootdir + _appRevisions2.default[chunkName + '.js'] + '"></script>';
    })).concat(['<script>window[' + JSON.stringify(appName) + '](' + JSON.stringify(store.getState()) + ');</script>']);

    var html = '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>webpack-bbq</title>\n    ' + stylesheets.join('\n    ') + '\n  </head>\n  <body>\n    <div id="' + appName + '">' + appHtml + '</div>\n    ' + javascripts.join('\n    ') + '\n  </body>\n</html>\n    ';
    cb(null, html);
  });
};

module.exports = exports['default'];