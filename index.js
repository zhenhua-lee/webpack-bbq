'use strict';
const qs = require('querystring');
const path = require('path');

const xtend = require('xtend');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestGeneratorPlugin = require('webpack-bbq-manifest-generator');
const libify = require.resolve('webpack-libify');

function bbq(config) {
  const srcpath = require.resolve(`${config.basedir}/src/`);
  let appName = path.relative(`${config.basedir}/src/`, srcpath);
  appName = path.join(path.dirname(appName), path.basename(appName, path.extname(appName)));
  const entry = { [appName]: srcpath };

  const debug = process.env.NODE_ENV === 'development';
  let filename;
  let cssfilename;
  let fileloadername;
  let devtool;
  if (debug) {
    filename = '[name].bundle.js';
    cssfilename = '[name].bundle.css';
    fileloadername = '[path][name].[ext]';
    devtool = 'inline-source-map';
  } else {
    filename = '[name]-[chunkhash].bundle.js';
    cssfilename = '[name]-[contenthash].bundle.css';
    fileloadername = '[path][name]-[hash].[ext]';
    devtool = 'source-map';
  }

  const plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin(cssfilename),
    new ManifestGeneratorPlugin(`${config.basedir}/app-revisions.json`),
  ];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  const exposeEntryLoader = {
    test: srcpath,
    loader: `expose-loader?${appName}`,
  };
  const urlLoader = {
    loader: 'url-loader',
    query: {
      name: fileloadername,
    },
  };
  const svgLoader = xtend(urlLoader, {
    test: /\.(svg)/,
    query: xtend(urlLoader.query, { limit: 10000, mimetype: 'image/svg+xml' }),
  });
  const fontLoader = xtend(urlLoader, {
    test: /\.(woff|ttf|woff2|eot)/,
  });
  const imagesLoader = xtend(urlLoader, {
    test: /\.(png|jpg)$/,
    query: xtend(urlLoader.query, { limit: 25000 }),
  });
  const loaders = (target) => {
    let babelquery = {
      'presets[]': ['react', 'es2015'],
      'plugins[]': ['transform-object-rest-spread', 'add-module-exports'],
    };
    if (target === 'node') {
      babelquery['plugins[]'].push('transform-ensure-ignore');
    }
    babelquery = qs.stringify(babelquery, null, null, {
      encodeURIComponent: (s) => (s)
    });
    const jsLoader = {
      test: /\.js$/,
      include: `${config.basedir}/src/`,
      loaders: [`babel-loader?${babelquery}`],
    };
    const cssloaderlocals =
      'css-loader/locals?modules&localIdentName=[name]__[local]___[hash:base64:5]';
    const externalCssLoader = {
      test: /\.css$/,
      include: `${config.basedir}/node_modules/`,
      loader: target === 'web' ?
        ExtractTextPlugin.extract('css-loader') : cssloaderlocals,
    };
    const globalCssLoader = {
      test: /\.global\.css$/,
      include: `${config.basedir}/src/`,
      loader: target === 'web' ?
        ExtractTextPlugin.extract(['css-loader']) : cssloaderlocals,
    };
    const styleLoader = {
      test: /\.css$/,
      include: `${config.basedir}/src/`,
      loaders: target === 'web' ? [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
      ] : [
        cssloaderlocals,
      ],
    };

    return [
      exposeEntryLoader,
      jsLoader,
      externalCssLoader,
      globalCssLoader,
      styleLoader,
      svgLoader,
      fontLoader,
      imagesLoader,
    ];
  };
  const output = {
    path: config.outputdir,
    filename,
    chunkFilename: filename,
    publicPath: config.rootdir,
  };
  const node = { __filename: true, __dirname: true };

  const client = {
    context: config.basedir,
    debug,
    node,
    devtool,
    entry,
    output,
    module: { loaders: loaders('web') },
    plugins,
  };

  function ShouldNotEmit() {}
  ShouldNotEmit.prototype.apply =
    (compiler) => compiler.plugin('should-emit', () => false);
  const postLoaders = [{ loader: libify }];

  const server = {
    context: config.basedir,
    debug,
    entry,
    target: 'node',
    output: xtend(output, {
      path: `${config.outputdir}/SHOULD_NOT_EXISTS_DIRECTORY`,
    }),
    module: { loaders: loaders('node'), postLoaders },
    plugins: [new ShouldNotEmit()],
  };

  return [
    client,
    server,
  ];
}

module.exports = bbq;
