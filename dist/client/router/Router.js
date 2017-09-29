'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRouter({ history, location }, callback) {
  if (!history) {
    throw new Error('Error: "Router" component requires a history prop passed');
  }

  if ('scrollRestoration' in window.history) {
    // disable auto scroll restoration on chrome
    window.history.scrollRestoration = 'manual';
  }

  // Minimal history implementation.
  // replace/go/goBack/goForward are not implemented.
  return {
    // The current navigation key used for
    // scroll restoration
    navKey: _utils.Time.now().toFixed(3),

    // the listen() history function is accessible
    listen: history.listen,

    // Push a new route
    push: async (to, state = {}) => {
      const { location } = history;
      if (location.pathname + location.search === to) {
        // the route is currently active, return
        return;
      }

      callback(to, state, 'PUSH');
    },

    // Return the current location. Same format
    // like the backend.
    get location() {
      const { location } = history;

      return {
        path: location.pathname,
        search: location.search,
        url: location.pathname + location.search,
        get query() {
          if (location.search.startsWith('?') === false) {
            return {};
          }

          return location.search.slice(1).split('&').reduce((acc, value) => {
            const [q, v] = value.split('=');
            if (q && v) {
              acc[q] = v;
            }
            return acc;
          }, {});
        }
      };
    }
  };
}

class Router extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.onRouteChange = this.onRouteChange.bind(this);

    const { location } = this.props;

    this.router = _utils.isBrowser
    // If we are running on the browser, 
    // create the router instance that will
    // manages all navigations.
    ? createRouter(props, this.onRouteChange)
    // Else, setup a basic mock for SSR using
    // the props location.
    : {
      location,
      listen: () => {}
    };
  }

  componentWillMount() {
    // When mounting, setup the listener to be
    // noticed when the user clicks the back button
    // and call the onRouteChange handler.
    this.unlisten = this.router.listen((location, action) => {
      if (action === 'POP') {
        this.onRouteChange(this.router.location.url, location.state, 'POP');
      }
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  async onRouteChange(to, state, action) {
    const { history, onChange } = this.props;

    if (action === 'PUSH') {
      // If it is a navigation click ('PUSH'),
      // setup a new navigation key so the AppMain
      // will get a unique key for this specific
      // navigation (to handle the scroll position
      // restoration)
      const location = history.location;
      location.state = location.state || {};
      location.state.navKey = state.navKey = this.router.navKey;
      history.replace(location);
    }

    // Call the onChange callback
    const result = await onChange({ to, state, action });

    if (action === 'PUSH') {
      // Actually update the address bar and
      // generate a new navigation key
      history.push(result || to, state);
      this.router.navKey = _utils.Time.now().toFixed(3);
    }
  }

  getChildContext() {
    // every children have access
    // to the router via their context
    return { router: this.router };
  }

  render() {
    return this.props.children;
  }
}
exports.default = Router;
Router.childContextTypes = {
  router: _propTypes2.default.object
};