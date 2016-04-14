const path = require('path');

const config = require('./config');

module.exports = require('../../')(config)({
  name: 'client',
  entry: './src/',
}, {
  entry: './src/server',
});
