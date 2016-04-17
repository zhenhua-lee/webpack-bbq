import React, { Component, PropTypes } from 'react';
import xhrRequest from 'xhr-request';
import { connect } from 'react-redux';

const fetchPeanutFoo = ({ request, dispatch, headers }, cb = null) => {
  request('/api/peanut/-/foo', { json: true, headers }, (err, payload) => {
    const action = {};
    if (err) {
      action.type = 'FETCH_PEANUT_FOO_FAIL';
      action.error = true;
      action.payload = err;
    } else {
      action.type = 'FETCH_PEANUT_FOO_SUCCESS';
      action.payload = payload.foo;
    }
    dispatch(action);
    if (cb) cb();
  });
};

class PeaNut extends Component {
  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.foo) {
      this.fetchPeanutFoo();
    }
  }

  fetchPeanutFoo() {
    fetchPeanutFoo({
      request: xhrRequest,
      dispatch: this.props.dispatch,
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
    });
  }

  handleClick() {
    this.fetchPeanutFoo();
  }

  render() {
    const { foo } = this.props;
    return (
      <div onClick={this.handleClick}>
        I am a PeaNut<br/>Click Me!
        <p>foo: {foo}</p>
      </div>
    );
  }
}

PeaNut.getInitialData = fetchPeanutFoo;

export default connect((state) => ({
  foo: state.peanut.foo,
}))(PeaNut);
