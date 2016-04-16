import React from 'react';
import Link from 'react-router/lib/Link';

const WebIndexRoute = (props) => (
  <div>
    <p><a href={`https://github.com/wenbing/webpack-bbq`}>webpack-bbq</a></p>
    <pre>props.location: {JSON.stringify(props.location, (key, value) => {
      if (key === 'key') return undefined;
      return value;
    }, 4)}</pre>
    <p><Link to={`/${props.location.pathname.split('/')[1]}/peanut`}>PeaNut</Link></p>
    {props.children}
  </div>
);

export default WebIndexRoute;
