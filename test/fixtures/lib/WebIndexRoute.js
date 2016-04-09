'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebIndexRoute = function WebIndexRoute(props) {
  return _react2.default.createElement(
    'div',
    null,
    'Web Index',
    props.children
  );
};

exports.default = WebIndexRoute;
module.exports = exports['default'];