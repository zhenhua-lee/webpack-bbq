if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const onStats = (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(stats.toString({
    colors: { level: 1, hasBasic: true, has256: false, has16m: false },
    cached: false,
    cachedAssets: false,
    modules: false,
    chunks: false,
    reasons: false,
    errorDetails: false,
    chunkOrigins: false,
  }));
};

if (process.env.NODE_ENV === 'development') {
  const done = false;
  compiler.plugin('done', () => {
    if (done) {
      return;
    }
    require('./server/');
    done = true;
  });
  compiler.watch({}, onStats);
} else {
  require('./server/');
}
