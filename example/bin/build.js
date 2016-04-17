if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}
const rimraf = require('rimraf');

const config = require('../config');
rimraf.sync(`${config.outputdir}/*.*`);
rimraf.sync(`${config.basedir}/lib/`);

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const onStats = (err, stats) => {
  if (err) {
    throw err;
  }
  console.info(stats.toString({
    colors: { level: 1, hasBasic: true, has256: false, has16m: false },
    cached: false,
    cachedAssets: false,
    modules: false,
    chunks: false,
    reasons: false,
    errorDetails: true,
    chunkOrigins: false,
    publicPath: true,
  }));
  if (stats.hasErrors()) {
    throw new Error('stats.hasErrors');
  }
};

webpack(webpackConfig[0]).run((err, stats) => {
  onStats(err, stats);
  webpack(webpackConfig[1]).run(onStats);
});
