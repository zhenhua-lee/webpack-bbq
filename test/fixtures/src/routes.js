import WebIndexRoute from './WebIndexRoute';
import WebContainer from './WebContainer';

const routes = [{
  path: '/web',
  indexRoute: { component: WebIndexRoute },
  component: WebContainer,
  getChildRoutes: (location, callback) => {
    require.ensure([], () => callback(null, require('./peanut.routes')), 'peanut');
  },
}, {
  path: '/m',
  component: WebContainer,
  indexRoute: { component: WebIndexRoute },
  getChildRoutes: (location, callback) => {
    require.ensure([], () => callback(null, require('./peanut.routes')), 'peanut');
  },
}, {
  path: '/hare',
  component: WebContainer,
  indexRoute: { component: WebIndexRoute },
  getChildRoutes: (location, callback) => {
    require.ensure([], () => callback(null, require('./peanut.routes')), 'peanut');
  },
}];

routes.getChunkNames = (location) => {
  const hash = require('./hash');
  const route = hash.get(location.pathname);
  const chunkNames = [];
  if (route.src === '/web/*') {
    chunkNames.push('web');
  }
  if (route.src === '/m/*') {
    chunkNames.push('m');
  }
  if (route.src === '/hare/*') {
    chunkNames.push('hare');
  }
  if (location.pathname.indexOf('/peanut') !== -1) {
    chunkNames.push('peanut');
  }
  return chunkNames;
}

module.exports = routes;
