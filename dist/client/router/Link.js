'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Supports:
 *
 * <Link to="">
 * <Lint to="" active>
 * <Link to="" match>
 * <Link to="" exact>
 * <Link to="" exact withQueries>
 * <Link to="" exact withQueries=['sort']>
 * 
 * active: set the active classname
 * match: match the current location with the to
 * exact: strictly compares the location and the to
 * withQueries: compare all queries too
 * withQueries(array): compare only the specified queries
 */
class Link extends _react2.default.Component {

  componentWillMount() {
    this.unlisten = this.context.router.listen(() => this.forceUpdate());
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    const { router } = this.context;
    const { location } = router;
    const _props = this.props,
          {
      to, exact, match, withQueries,
      active, activeClassName, className,
      children, onClick } = _props,
          otherProps = _objectWithoutProperties(_props, ['to', 'exact', 'match', 'withQueries', 'active', 'activeClassName', 'className', 'children', 'onClick']);

    const route = to || '#';
    const [path, qs] = route.split('?', 2);
    let classNames = className || '';

    let routeMatch = exact ? location.path === path : match ? location.path.match(path) : active;

    // If 'withQueries' is passed, determine if it is
    // a route match based on thse queries.
    // Note: queries order is not important. 
    if (withQueries) {
      const queries = (qs || '').split('&').reduce((acc, s) => {
        const [q, v] = s.split('=');
        acc[q || ''] = v || '';
        return acc;
      }, {});

      const expectedQueries = Array.isArray(withQueries) ? withQueries : Object.keys(queries);

      routeMatch = expectedQueries.every(q => queries[q] === `${(location.query || {})[q]}`);
    }

    // If the route matches, add the 'activeClassName'.
    // Default to 'active' if nothing provided.
    if (routeMatch) {
      classNames += ` ${activeClassName || 'active'}`.trim();
    }

    // Override or set the onClick handler.
    // Will called the initial one if provided and then,
    // call push() on the router.
    otherProps.onClick = function navigate(e) {
      if (e.button !== 0 || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return;
      }

      e.preventDefault();
      typeof onClick === 'function' && onClick(e);

      router.push(route);
    };

    return _react2.default.createElement(
      'a',
      _extends({ href: route,
        className: classNames
      }, otherProps),
      children
    );
  }
}
exports.default = Link;
Link.contextTypes = {
  router: _propTypes2.default.object
};