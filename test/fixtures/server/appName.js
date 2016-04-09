'use strict';
const path = require('path');

const config = require('../config');

const srcpath = require.resolve(`${config.basedir}/src/`);
let appName = path.relative(`${config.basedir}/src/`, srcpath);
appName = path.join(path.dirname(appName), path.basename(appName, path.extname(appName)));

module.exports = appName;
