const createElement = require('react').createElement;
const ReactDOMServer = require('react-dom/server');
const match = require('react-router/lib/match');
const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;
const applyMiddleware = require('redux').applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const sendHtml = require('send-data/html');

module.exports = (req, res, opts, cb) => {
  const config = require('../config');
  const App = require('../lib/App');
  const routes = require('../lib/routes');
  const reducers = require('../lib/reducers');
  const appName = require('./appName');
  const assets = require(`${config.basedir}/app-revisions.json`);

  const rootReducer = combineReducers(reducers);
  const initialState = { appName: opts.appName };
  const storeEnhancer = applyMiddleware(thunkMiddleware);
  const store = createStore(rootReducer, initialState, storeEnhancer);

  match({ location: req.url, routes }, (err, redirectLocation, renderProps) => {
    if (err) {
      return cb(err);
    }
    if (redirectLocation) {
      return cb(new Error(`redirectLocation: ${redirectLocation}`));
    }
    if (!renderProps) {
      return cb(new Error('renderProps is missing'));
    }
    const javascripts = `<script src="${config.rootdir}${assets[`${appName}.js`]}"></script>`;
    const el = createElement(App, { store, router: renderProps });
    const appHtml = ReactDOMServer.renderToString(el);
    const html = `<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <title>webpack-bbq</title>
  </head>
  <body>
    <div id="${appName}">${appHtml}</div>
    ${javascripts}
  </body>
</html>
    `;
    sendHtml(req, res, html, cb);
  });
};
