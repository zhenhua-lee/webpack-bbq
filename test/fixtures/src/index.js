require('bootstrap/dist/css/bootstrap.css');
require('./web.global.css');

const hash = require('./hash');

const main = (initialState) => {
  const node = hash.get(location.pathname);
  if (node.handler) {
    node.handler(initialState);
  }
};

export default main;
