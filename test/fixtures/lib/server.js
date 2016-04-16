'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _match = require('react-router/lib/match');

var _match2 = _interopRequireDefault(_match);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _getChunkNames = require('./getChunkNames');

var _getChunkNames2 = _interopRequireDefault(_getChunkNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)(_reducers2.default);
var storeEnhancer = (0, _redux.applyMiddleware)(_reduxThunk2.default);

exports.default = function (location, cb) {
  var revisions = require('../app-revisions.json');
  var appName = expose(require.resolve('../src/'), _config2.default.basedir + '/src/');
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
      var rerr = new Error('match({ location: ' + location + ' }): renderProps is missing');
      rerr.statusCode = 404;
      return cb(rerr);
    }

    var el = (0, _react.createElement)(_App2.default, { store: store, router: renderProps });
    var appHtml = _server2.default.renderToString(el);

    var chunkNames = (0, _getChunkNames2.default)(renderProps.location);
    var stylesheets = ['<link href="' + _config2.default.rootdir + revisions[appName + '.css'] + '" rel="stylesheet" />'];
    var javascripts = ['<script src="' + _config2.default.rootdir + revisions[appName + '.js'] + '"></script>'].concat(chunkNames.map(function (chunkName) {
      return '<script src="' + _config2.default.rootdir + revisions[chunkName + '.js'] + '"></script>';
    })).concat(['<script>window[' + JSON.stringify(appName) + '](' + JSON.stringify(store.getState()) + ');</script>']);

    var html = '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>webpack-bbq</title>\n    ' + stylesheets.join('\n    ') + '\n  </head>\n  <body>\n    <div id="' + appName + '">' + appHtml + '</div>\n    ' + javascripts.join('\n    ') + '\n  </body>\n</html>\n    ';
    cb(null, html);
  });
};

function expose(filename, basedir) {
  var extname = _path2.default.extname(filename);
  var relname = _path2.default.relative(basedir, filename);
  return _path2.default.join(_path2.default.dirname(relname), _path2.default.basename(relname, extname));
}
module.exports = exports['default'];