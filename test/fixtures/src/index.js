require('bootstrap/dist/css/bootstrap.css');
require('./web.global.css');

const hash = require('./hash');

const node = hash.get(location.pathname);

export default (initialState) => {
  if (node.handler) {
    node.handler(window.initialState);
  }
};
