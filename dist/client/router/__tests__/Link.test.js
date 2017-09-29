'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Link', () => {
  const getStubbedLink = (path, query = {}) => {
    class Wrapper extends _react2.default.Component {

      getChildContext() {
        return {
          router: {
            location: { path, query },
            listen: () => {}
          }
        };
      }

      render() {
        return _react2.default.createElement(_Link2.default, this.props);
      }
    }

    Wrapper.childContextTypes = {
      router: _propTypes2.default.object
    };
    return Wrapper;
  };

  it('renders a link without active class', () => {
    const Link = getStubbedLink('/');
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test' },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link without active class even if route match', () => {
    const Link = getStubbedLink('/test');
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test' },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link with active class if route exact', () => {
    const Link = getStubbedLink('/test');
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test', exact: true },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link with active class if route match', () => {
    const Link = getStubbedLink('/test/sub');
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test', match: true },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link without active class if route match', () => {
    const Link = getStubbedLink('/test/sub');
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test/other', match: true },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link with active class if queries match', () => {
    const Link = getStubbedLink('/test', { a: 1, b: 2 });
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test?a=1&b=2', exact: true, withQueries: true },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link with active class if queries match', () => {
    const Link = getStubbedLink('/test', { a: 1, b: 2 });
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test?a=1&b=3', exact: true, withQueries: ['a'] },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a link without active class if queries not match', () => {
    const Link = getStubbedLink('/test', { a: 4, b: 3 });
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      Link,
      { to: '/test?a=1&b=3', exact: true, withQueries: ['a'] },
      'Test'
    )).toJSON();

    expect(tree).toMatchSnapshot();
  });
});