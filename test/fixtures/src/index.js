import xtend from 'xtend';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import App from './App';
import routes from './routes';
import reducers from './reducers';
import askForReduxDevTools from './askForReduxDevTools';

const rootReducer = combineReducers(xtend(reducers, {
  routing: routerReducer,
}));
const store = createStore(
  rootReducer,
  // 这里是一个约定
  window.initialState,
  compose(
    applyMiddleware(thunkMiddleware, routerMiddleware(history)),
    // https://github.com/zalmoxisus/redux-devtools-extension
    // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    window.devToolsExtension ? window.devToolsExtension() : askForReduxDevTools
  )
);
const history = syncHistoryWithStore(browserHistory, store);
const router = { history, routes };

ReactDOM.render(createElement(App, { store, router }), document.getElementById(store.getState().appName));
