'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app(initialState) {
  return require('./foo/baz')(initialState);
};

exports.default = app;
module.exports = exports['default'];