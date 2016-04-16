const httpHashRouter = require('http-hash-router');
const st = require('st')

const config = require('../config');
const web = require('./web');

const router = httpHashRouter();
router.set('/web', web);
router.set('/web/*', web);
router.set('/m', web);
router.set('/m/*', web);
router.set(`${config.rootdir}*`, st({
  path: config.outputdir,
  url: config.rootdir,
  cache: false,
}));

module.exports = router;
