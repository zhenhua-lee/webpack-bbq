'use strict';

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _browserHistory = require('react-router/lib/browserHistory');

var _browserHistory2 = _interopRequireDefault(_browserHistory);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterRedux = require('react-router-redux');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _askForReduxDevTools = require('./askForReduxDevTools');

var _askForReduxDevTools2 = _interopRequireDefault(_askForReduxDevTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)((0, _xtend2.default)(_reducers2.default, {
  routing: _reactRouterRedux.routerReducer
}));
console.info(window.initialState);
var store = (0, _redux.createStore)(rootReducer,
// 这里是一个约定
window.initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(history)),
// https://github.com/zalmoxisus/redux-devtools-extension
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
window.devToolsExtension ? window.devToolsExtension() : _askForReduxDevTools2.default));
var history = (0, _reactRouterRedux.syncHistoryWithStore)(_browserHistory2.default, store);
var router = { history: history, routes: _routes2.default };

_reactDom2.default.render((0, _react.createElement)(_App2.default, { store: store, router: router }), document.getElementById(store.getState().appName));