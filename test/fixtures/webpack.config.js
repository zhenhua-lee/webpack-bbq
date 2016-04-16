const path = require('path');

const config = require('./config');

module.exports = require('../../')({
  basedir: config.basedir,
  outputdir: config.outputdir,
  publicPath: config.rootdir,
})({
  // entry: './src/',
  // entry: { index: './src/', ['foo/bar']: './src/foo/bar' },
  entry: { index: './src/', ['foo/bar']: './src/foo/bar' },
  postcss: () => [require('postcss-nesting')],
}, {
  entry: './src/server',
});
