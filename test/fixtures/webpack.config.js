const path = require('path');

const config = require('./config');

module.exports = require('../../')(config)({
  entry: require.resolve('./src/'),
}, {
  entry: require.resolve('./src/server'),
});
