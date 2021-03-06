import path from 'path';
import React from 'react';
import Link from 'react-router/lib/Link';

const getHref = (pathname) => {
  // /web
  let name = pathname.split('/')[1];
  // /web.html
  name = name.split('.')[0];
  const ext = path.extname(pathname);
  return `${name}/peanut${ext}`;
};

const WebIndexRoute = (props) => (
  <div>
    <p><a href={`https://github.com/wenbing/webpack-bbq`}>webpack-bbq</a></p>
    <pre>props.location: {JSON.stringify(props.location, (key, value) => {
      if (key === 'key') return undefined;
      return value;
    }, 4)}</pre>
    <p><Link to={`/${getHref(props.location.pathname)}`}>PeaNut</Link></p>
    {props.children}
  </div>
);

export default WebIndexRoute;
