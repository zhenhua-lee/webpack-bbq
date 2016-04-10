'use strict';
const http = require('http');

const clearRequireCache = require('clear-require-cache');

const port = require('./port');
const config = require('../config');
const routerpath = require.resolve('./router');
let router = require(routerpath);
const appName = require('./appName');

const server = http.createServer((req, res) => {
  if (req.url.indexOf(config.roodir) !== -1) {
    clearRequireCache(routerpath);
    router = require(routerpath);
  }

  router(req, res, {
    appName,
  }, (err) => {
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
