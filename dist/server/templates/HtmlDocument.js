'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HtmlDocument;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _router = require('../../client/router');

var _App = require('../../client/App');

var _App2 = _interopRequireDefault(_App);

var _store = require('../../client/store');

var _store2 = _interopRequireDefault(_store);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bundlesPrefix = _config2.default.get('server.bundles.prefix');
const assets = JSON.parse(_config2.default.get('server.bundles.assets'));
const chunks = JSON.parse(_config2.default.get('server.bundles.chunks'));
const analyticsId = _config2.default.get('analytics');

// List of features to polyfill via polyfill.io
const polyfillFeatures = ['Array.from', 'Array.prototype.includes', 'Array.prototype.find', 'fetch', 'Object.assign', 'Object.entries'];

/**
 * HtmlDocument component
 *
 * @export
 * @param {any} { state, children }
 * @returns
 */
function HtmlDocument({ state, children }) {
  // the store uses a 'context' module
  // so put the state in it
  const store = (0, _store2.default)({ context: state });

  return _react2.default.createElement(
    'html',
    { lang: 'en' },
    _react2.default.createElement(
      'head',
      null,
      _react2.default.createElement('meta', { charSet: 'utf-8' }),
      _react2.default.createElement('meta', { name: 'language', content: 'en' }),
      _react2.default.createElement('meta', { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' }),
      _react2.default.createElement('meta', { name: 'author', content: 'Johann Troendle' }),
      _react2.default.createElement('meta', { name: 'keywords', content: 'node, react, redux, router, isomorphic, universal, server-first' }),
      _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }),
      _react2.default.createElement(
        'title',
        null,
        state.metadata.title || 'Pure Server Router'
      ),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicons/favicon-16x16.png' }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicons/favicon-32x32.png' }),
      _react2.default.createElement('link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/img/favicons/favicon-96x96.png' }),
      state.metadata.metas.map((meta, i) => _react2.default.createElement('meta', _extends({ key: i }, meta))),
      state.metadata.links.map((link, i) => _react2.default.createElement('link', _extends({ key: i }, link))),
      assets.app.css && _react2.default.createElement('link', { href: `${bundlesPrefix}/${assets.app.css}`, rel: 'stylesheet' }),
      _react2.default.createElement('script', { defer: true, src: `https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfillFeatures.join()}` }),
      _react2.default.createElement('script', { defer: true, src: `${bundlesPrefix}/${assets.vendor.js}` }),
      _react2.default.createElement('script', { defer: true, src: `${bundlesPrefix}/${assets.app.js}` }),
      chunks[state.view.component] && _react2.default.createElement('script', { defer: true, src: `${bundlesPrefix}/${chunks[state.view.component]}` }),
      _react2.default.createElement('script', { async: true, src: 'https://www.google-analytics.com/analytics.js' })
    ),
    _react2.default.createElement(
      'body',
      null,
      _react2.default.createElement(
        'div',
        { id: 'root' },
        _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(
            _router.Router,
            { location: state.location },
            _react2.default.createElement(
              _App2.default,
              { viewprops: state.view.props },
              children && children
            )
          )
        )
      ),
      _react2.default.createElement('script', {
        dangerouslySetInnerHTML: {
          __html: `window.INITIAL_STATE=${JSON.stringify({ context: state })};`
        }
      }),
      analyticsId && _react2.default.createElement('script', {
        dangerouslySetInnerHTML: {
          __html: `
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                ga('create', '${analyticsId}', 'auto');
                ga('send', 'pageview');
              `
        }
      })
    )
  );
}