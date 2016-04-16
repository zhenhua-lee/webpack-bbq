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

module.exports = routes;
