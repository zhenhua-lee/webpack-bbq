const path = require('path');
const expose = require('@mtfe/expose');

const config = require('./config');
const srcpath = require.resolve('./src/');
const appName = expose(srcpath, path.resolve('./src/'));

module.exports = require('../../')(config)({
  entry: { [appName]: srcpath },
}, {
  entry: require.resolve('./src/server'),
});
