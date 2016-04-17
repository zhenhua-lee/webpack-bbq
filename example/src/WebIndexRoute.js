import React from 'react';
import Link from 'react-router/lib/Link';

const getName = (pathname) => {
  // /web
  let name = pathname.split('/')[1];
  // /web.html
  name = name.split('.')[0];
  return name;
};

const WebIndexRoute = (props) => (
  <div>
    <p><a href={`https://github.com/wenbing/webpack-bbq`}>webpack-bbq</a></p>
    <pre>props.location: {JSON.stringify(props.location, (key, value) => {
      if (key === 'key') return undefined;
      return value;
    }, 4)}</pre>
    <p><Link to={`/${getName(props.location.pathname)}/peanut.html`}>PeaNut</Link></p>
    {props.children}
  </div>
);

export default WebIndexRoute;
