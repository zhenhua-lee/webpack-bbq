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
    const chunkNames = routes.getChunkNames(renderProps.location);
    const stylesheets = [
      `<link href="${config.rootdir}${assets[`${appName}.css`]}" rel="stylesheet" />`,
    ];
    const javascripts = [
      `<script src="${config.rootdir}${assets[`${appName}.js`]}"></script>`,
    ]
    .concat(chunkNames.map((chunkName) => (
      `<script src="${config.rootdir}${assets[`${chunkName}.js`]}"></script>`
    )))
    .concat([
      `<script>window[${JSON.stringify(appName)}](${JSON.stringify(store.getState())});</script>`,
    ]);

    const el = createElement(App, { store, router: renderProps });
    const appHtml = ReactDOMServer.renderToString(el);
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>webpack-bbq</title>
    ${stylesheets.join('\n    ')}
  </head>
  <body>
    <div id="${appName}">${appHtml}</div>
    ${javascripts.join('\n    ')}
  </body>
</html>
    `;
    sendHtml(req, res, html, cb);
  });
};
