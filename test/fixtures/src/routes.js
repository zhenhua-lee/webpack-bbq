import WebIndexRoute from './WebIndexRoute';
import WebContainer from './WebContainer';
import PeaNut from './PeaNut';

module.exports = {
  path: '/web',
  indexRoute: WebIndexRoute,
  component: WebContainer,
  childRoutes: [{
    path: 'peanut',
    component: PeaNut,
  }],
};
