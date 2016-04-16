'use strict';
const http = require('http');
const sendHtml = require('send-data/html');

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
      console.error(err.stack || err.toString());
      if (res.finished) {
        return;
      }
      res.statusCode = err.statusCode || 500;
      if (process.env.NODE_ENV === 'development') {
        sendHtml(req, res, `<pre>${err.stack}</pre>`);
      } else {
        sendHtml(req, res, err.toString());
      }
    }
  });
});

module.exports = server;
