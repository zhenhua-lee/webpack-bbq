'use strict';
const http = require('http');

const port = require('./port');
const config = require('../config');
const routerpath = require.resolve('./router');
let router = require(routerpath);

const server = http.createServer((req, res) => {
  if (process.env.NODE_ENV === 'development') {
    const clearRequireCache = require('clear-require-cache');
    if (req.url.indexOf(config.rootdir) !== -1) {
      clearRequireCache(routerpath);
      router = require(routerpath);
    }
  }

  router(req, res, {}, (err) => {
    if (err) {
      console.error(err.stack || err.message);
      // use your own custom error serialization.
      if (!res.finished) {
        res.statusCode = err.statusCode || 500;
        res.end(err.message);
      }
    }
  });
});

module.exports = server;
