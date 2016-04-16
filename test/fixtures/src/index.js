import httpHash from 'http-hash';

require('bootstrap/dist/css/bootstrap.css');
require('./web.global.css');

const hash = httpHash();
hash.set('/web/*', (initialState) => {
  require.ensure([], () => require('./web')(initialState), 'web');
});
hash.set('/m/*', (initialState) => {
  require.ensure([], () => require('./m')(initialState), 'm');
});

export default (initialState) => {
  const node = hash.get(location.pathname);
  if (node.handler) {
    node.handler(initialState);
  }
};
