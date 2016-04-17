import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import RouterContext from 'react-router/lib/RouterContext';

const isServer = typeof window === 'undefined';
const RouterContainer = isServer ? RouterContext : Router;

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <RouterContainer { ...this.props.router} />
      </Provider>
    );
  }
}

App.propTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default App;
