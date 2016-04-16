import httpHash from 'http-hash';

const hash = httpHash();

const web = (initialState) => {
  require.ensure([], () => require('./web')(initialState), 'web');
};
hash.set('/web/*', web);
hash.set('/web.html', web);

const m = (initialState) => {
  require.ensure([], () => {
    require('basscss/css/basscss.css');
    require('./m')(initialState);
  }, 'm');
};
hash.set('/m/*', m);
hash.set('/m.html', m);

const hare = (initialState) => {
  require.ensure([], () => require('./hare')(initialState), 'hare');
};
hash.set('/hare/*', hare);
hash.set('/hare.html', hare);

export default hash;
