import xtend from 'xtend';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const app = (initialState) =>
  require.ensure([], () => require('./foo/baz')(initialState), 'foo/baz');

export default app;
