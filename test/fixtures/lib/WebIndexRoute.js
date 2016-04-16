'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getName = function getName(pathname) {
  // /web
  var name = pathname.split('/')[1];
  // /web.html
  name = name.split('.')[0];
  return name;
};

var WebIndexRoute = function WebIndexRoute(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/wenbing/webpack-bbq' },
        'webpack-bbq'
      )
    ),
    _react2.default.createElement(
      'pre',
      null,
      'props.location: ',
      JSON.stringify(props.location, function (key, value) {
        if (key === 'key') return undefined;
        return value;
      }, 4)
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        _Link2.default,
        { to: '/' + getName(props.location.pathname) + '/peanut' },
        'PeaNut'
      )
    ),
    props.children
  );
};

exports.default = WebIndexRoute;
module.exports = exports['default'];