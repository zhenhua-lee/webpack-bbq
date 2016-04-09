import WebIndexRoute from './WebIndexRoute';
import WebContainer from './WebContainer';

module.exports = {
  path: '/web',
  indexRoute: WebIndexRoute,
  component: WebContainer,
  getChildRoutes: (location, callback) => require.ensure([], () => {
    const PeaNut = require('./PeaNut');
    callback(null, [{
      path: 'peanut',
      component: PeaNut,
    }]);
  }),
};
