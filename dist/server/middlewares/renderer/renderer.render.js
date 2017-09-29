'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.render = render;
exports.renderNotFound = renderNotFound;
exports.renderServerError = renderServerError;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _xxhashjs = require('xxhashjs');

var _xxhashjs2 = _interopRequireDefault(_xxhashjs);

var _lodash = require('lodash');

var _config = require('../../../../config');

var _config2 = _interopRequireDefault(_config);

var _HtmlDocument = require('../../templates/HtmlDocument');

var _HtmlDocument2 = _interopRequireDefault(_HtmlDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appId = _config2.default.get('appId');
const cacheConfig = _config2.default.get('server.cache');

/**
 * Render the state defined in ctx.
 * Take care of the request caching and render the
 * ctx based on the partial/SSR type.
 * 
 * @export
 * @param {any} ctx Koa context
 */
function render(ctx) {
  // Determine if it is a 'partial' request.
  // Meaning that a client requested data from
  // the loaded app
  const partial = ctx.headers['x-requested-with'] === 'ClientFetchRequest';

  // Handles the cache control if enabled and 
  // if differs from the default value.
  if (cacheConfig.enabled && ctx.cache.control !== 'no-cache') {
    // Get or compute the hash
    const hash = ctx.cache.hash || _xxhashjs2.default.h32(0xbabe).update(JSON.stringify(_extends({ partial }, ctx.state))).digest().toString(16);

    // Setup the 2 cache headers
    const maxAge = ctx.cache.maxAge || cacheConfig.maxAge;
    ctx.set('Cache-Control', `${ctx.cache.control}, max-age=${maxAge}`);
    ctx.set('ETag', `"${appId}/${hash}"`);
  }

  // If the request is fresh, just send back a 304
  // fresh => response[Etag] === request[If-None-Match]
  if (ctx.fresh) {
    ctx.status = 304; // not modified
    return;
  }

  // Format the state to render
  // 'view.component' becomes only the component name for
  // serialization.
  // Try first if Redux Connect component, else default to the name
  const state = (0, _lodash.cloneDeep)(ctx.state);
  if (state.view.component) {
    const { component } = state.view;
    state.view.component = component.WrappedComponent ? component.WrappedComponent.name : component.name;
  }

  // The 'Vary' header based on the content type
  // is extremely important: this tells to all cache layers
  // and the browser that for the current URL, its content
  // can change based on the Content-Type.
  // For a same URL (Uniform Resource Locator), we can
  // both render a JSON or a HTML content.
  ctx.set('Vary', 'Content-Type');

  // partial? just send the state as json
  // the Redux store expect to have a 'context'
  // entry.
  if (partial) {
    ctx.type = 'json';
    ctx.body = { context: state };
    return;
  }

  // Else it is a full SSR: render the dom to string.
  // Use the template and pass to it the component
  // to render
  const content = (0, _server.renderToString)(_react2.default.createElement(
    _HtmlDocument2.default,
    { state: state },
    ctx.state.view.component && _react2.default.createElement(ctx.state.view.component, ctx.state.view.props)
  ));

  ctx.type = 'html';
  ctx.body = `<!DOCTYPE html>\n${content}`;
}

/**
 * Render the not found page.
 * @export
 * @param {any} ctx
 */
function renderNotFound(ctx) {
  ctx.state.metadata.title = 'Not Found';
  ctx.state.metadata.metas.push({ name: 'description', content: 'Page not found' });
  ctx.state.view.component = require('../../../client/views/NotFound').default;

  render(ctx);
}

/**
 * Render the server error page.
 * @export
 * @param {any} ctx
 */
function renderServerError(ctx) {
  ctx.state.metadata.title = 'Server Error';
  ctx.state.metadata.metas.push({ name: 'description', content: 'Server Error' });

  ctx.state.view.component = require('../../../client/views/ServerError').default;
  ctx.state.view.props = {
    title: ctx.error.message,
    stack: ctx.error.stack
  };

  render(ctx);
}