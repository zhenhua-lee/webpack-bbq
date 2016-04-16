import httpHash from 'http-hash';

const hash = httpHash();
hash.set('/web/*', (initialState) => {
  require.ensure([], () => require('./web')(initialState), 'web');
});
hash.set('/m/*', (initialState) => {
  require.ensure([], () => {
    require('basscss/css/basscss.css');
    require('./m')(initialState);
  }, 'm');
});
hash.set('/hare/*', (initialState) => {
  require.ensure([], () => require('./hare')(initialState), 'hare');
});

export default hash;
