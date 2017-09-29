'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRoute = exports.Link = exports.Router = undefined;

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Function to fetch a route from the backend.
 * 
 * Uses the X-Requested-With header to tell to the 
 * backend that the route is loaded from an 'alive'
 * client.
 * 
 * The backend will respond with an object (json)
 * representation.
 * 
 * Returns the response data and the final url. The
 * fetch api follows the redirects, so we need to
 * update the url in the address bar if we got one.
 * 
 * @param {string} path
 */
async function fetchRoute(path) {
  const response = await fetch(path, {
    credentials: 'include', // for any cookies
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'ClientFetchRequest'
    }
  });

  return response.json();
}

exports.Router = _Router2.default;
exports.Link = _Link2.default;
exports.fetchRoute = fetchRoute;