'use strict';

var identityReducer = function identityReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'index' : arguments[0];
  return state;
};

module.exports = {
  appName: identityReducer
};