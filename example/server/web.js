const sendHtml = require('send-data/html');

const app = require('../lib/server');

module.exports = (req, res, opts, cb) => {
  app(req.url, (err, html) => {
    if (err) {
      return cb(err);
    }
    sendHtml(req, res, html, cb);
  });
};
