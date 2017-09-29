'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _App = require('./App.jsx');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _context = require('./store/modules/context');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppMain extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: props.initialView
    };

    if (!props.initialView) {
      // if no module at startup, lazy load the component.
      // For dev mostly, in prod mode this should never happen
      // (the component is already loaded at startup).
      this.loadAsyncComponent(props.context.view.component);
    }

    this.onRouteChange = this.onRouteChange.bind(this);
    this.scrollPositions = {};
  }

  // This component should be never auto updated by React.
  // Because it manages the lazy code spliting loading, it
  // will call forceUpdate() when the component is ready to render.
  shouldComponentUpdate() {
    return false;
  }

  // This function calls Webpack to lazy load
  // the component, wait till it is completed,
  // then call forceUpdate() to trigger a render.
  async loadAsyncComponent(component) {
    // default to the current component (for HMR in dev)
    const c = component || this.props.context.view.component;

    const module = await import(`./views/${c}`);
    this.setState({ component: module.default });
    this.forceUpdate();
  }

  async onRouteChange({ to, state, action }) {
    try {
      // Save the current scroll position only if it is
      // a push action (user clicked on a link to navigate
      // somewhere in the website)
      if (action === 'PUSH') {
        this.scrollPositions[state.navKey] = (0, _utils.scrollPosition)();
      }

      // Get the new context associated with the 'to' url via the store
      const { payload: { context } } = await this.props.fetchContext(to);

      // Update the browser title: 
      // the metadata contains metas/links too, up to you to
      // update them if needed
      document.title = context.metadata.title || 'Pure Server Router';

      // Lazy load the component to render
      await this.loadAsyncComponent(context.view.component);

      // Reset the saved scroll position if the user clicked on
      // the back button, else to go to the top.
      (0, _utils.scrollPosition)(action === 'POP' ? this.scrollPositions[state.navKey] : null);

      (0, _utils.sendPageviewEvent)(context.location.url);

      // Return the actual url received from
      // the backend: keep the adddress bar synced with
      // the server response (redirection...)
      return context.location.url;

      // If any error occurs during this context fetch,
      // force the browser to load the page entirely
    } catch (e) {
      window.location = to;
    }
  }

  render() {
    const { history, store, context } = this.props;

    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _router.Router,
        { history: history, onChange: this.onRouteChange },
        this.state.component && _react2.default.createElement(
          _App2.default,
          { viewprops: context.view.props },
          _react2.default.createElement(this.state.component, context.view.props)
        )
      )
    );
  }
}

// This component is connected to the store
exports.default = (0, _reactRedux.connect)(state => ({
  context: state.context
}), dispatch => ({
  fetchContext: path => dispatch((0, _context.fetchContext)(path))
}), null, { withRef: true // for HMR only
})(AppMain);

// this component cannot be reloaded
// if any changes occur.

if (module.hot) {
  module.hot.decline();
}