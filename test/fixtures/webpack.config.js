const path = require('path');

const config = require('./config');

module.exports = require('../../')(config)({
  entry: './src/',
}, {
  entry: './src/server',
});
