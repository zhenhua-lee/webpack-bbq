'use strict';
const sendJson = require('send-data/json');

module.exports = (req, res, opts, cb) => {
  let foo = 'bar';
  if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    foo = 'BAR';
  }
  sendJson(req, res, {
    statusCode: 200,
    body: {
      foo,
    },
  }, cb);
};
