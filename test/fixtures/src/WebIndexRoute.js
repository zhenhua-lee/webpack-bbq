import React from 'react';
import Link from 'react-router/lib/Link';

const WebIndexRoute = (props) => (
  <div>
    <a href={`https://github.com/wenbing/webpack-bbq`}>webpack-bbq</a>
    <br />
    Web Index
    <br />
    <Link to={`/web/peanut`}>PeaNut</Link>
    {props.children}
  </div>
);

export default WebIndexRoute;
