'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _AppMain = require('./AppMain');

var _AppMain2 = _interopRequireDefault(_AppMain);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

require('milligram');

require('animate.css');

require('highlight.js/styles/github.css');

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap the React app.
 * 
 * @param {} initialModule 
 */
const bootstrap = initialView => {
  const history = (0, _createBrowserHistory2.default)();
  const store = (0, _store2.default)(window.INITIAL_STATE || {});

  const root = (0, _reactDom.hydrate)(_react2.default.createElement(_AppMain2.default, { history: history, store: store, initialView: initialView }), document.getElementById('root'));

  if (module.hot) {
    // in dev mode, accept everything and
    // call the AppMain component to reload
    // the current view.
    module.hot.accept();
    module.hot.status(status => {
      if (status === 'apply') {
        root.wrappedInstance.loadAsyncComponent();
      }
    });
  }
};

/*
 * Client entry
 */
document.addEventListener('DOMContentLoaded', () => {
  // Call webpack import to get the first view.
  // (avoid an unnecessary flash)
  import(`./views/${window.INITIAL_STATE.context.view.component}`).then(view => bootstrap(view.default)).catch(bootstrap);
});