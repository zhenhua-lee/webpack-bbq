'use strict';

const server = require('./server');
const port = require('./port');

server.listen(port, function() {
  console.info(`server is listening at ${JSON.stringify(this.address())}`);
});
