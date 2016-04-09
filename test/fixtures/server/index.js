const http = require('http');

const port = require('./port');
const router = require('./router');
const appName = require('./appName');

const server = http.createServer((req, res) => router(req, res, {
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
}));

module.exports = server;

if (require.main === module) {
  server.listen(port, function() {
    console.info(`server is listening at ${JSON.stringify(this.address())}`);
  });
}
