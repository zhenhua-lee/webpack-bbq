import WebIndexRoute from './WebIndexRoute';
import WebContainer from './WebContainer';

const routes = [{
  path: '/web',
  indexRoute: { component: WebIndexRoute },
  component: WebContainer,
  getChildRoutes: (location, callback) => {
    // TODO 需要一个约定？ 或者 bundle-loader 来解救？
    require.ensure([], () => callback(null, require('./peanut.routes')), 'web/peanut');
  },
}, {
  path: '/m',
  component: WebContainer,
  indexRoute: { component: WebIndexRoute },
}];

routes.getChunkNames = (location) => {
  if (location.pathname.indexOf('/web/') === 0) {
    return ['web/peanut'];
  }
  return [];
}

module.exports = routes;
