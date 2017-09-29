'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _home = require('../controllers/home.controller');

var _home2 = _interopRequireDefault(_home);

var _docs = require('../controllers/docs.controller');

var _docs2 = _interopRequireDefault(_docs);

var _demo = require('../controllers/demo.controller');

var _demo2 = _interopRequireDefault(_demo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _koaRouter2.default)();

// Home page
router.get('/', _home2.default.index);

// Docs
router.get('/docs/:section?', _docs2.default.index);

// Demo routes
router.get('/demos', _demo2.default.index);
router.get('/demos/counter', _demo2.default.counter);
router.get('/demos/error', _demo2.default.error);
router.get('/demos/redirect', _demo2.default.redirect);

exports.default = router;