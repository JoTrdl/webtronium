'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaHelmet = require('koa-helmet');

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _koaResponseTime = require('koa-response-time');

var _koaResponseTime2 = _interopRequireDefault(_koaResponseTime);

var _koaStaticCache = require('koa-static-cache');

var _koaStaticCache2 = _interopRequireDefault(_koaStaticCache);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _renderer = require('./middlewares/renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_config2.default.toString());

const app = new _koa2.default();

app.use((0, _koaHelmet2.default)());
app.use((0, _koaResponseTime2.default)());

// static & bundles serving
app.use((0, _koaStaticCache2.default)(_config2.default.get('server.static.directory'), _config2.default.get('server.static')));
app.use((0, _koaStaticCache2.default)(_config2.default.get('server.bundles.directory'), _config2.default.get('server.bundles')));

// First one: the init() renderer.
// This will setup a base state
// that middlewares and controllers
// will use
app.use(_renderer2.default.init());

// Others middlewares that need access
// to the state after
/* app.use(myMiddleware()) */

// Lastly, just before the controllers,
// the wait() renderer. It will wait for
// controller output then render the state.
// This can be a JSON or HTML depending on
// the request (partial or SSR)
app.use(_renderer2.default.wait());

// Then setup routers and controllers
app.use(_routes2.default.routes(), _routes2.default.allowedMethods());

// Finally start the server
const server = app.listen(_config2.default.get('server.port'), _config2.default.get('server.host'), () => {
  const { address, port } = server.address();
  console.log(`App running at http://${address}:${port}`);
});