'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Demo;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('../router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Counter extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({ value: this.state.value + 1 });
  }

  render() {
    return _react2.default.createElement(
      'button',
      {
        className: 'button button-large full-width',
        onClick: this.increment },
      'Click me: ',
      this.state.value
    );
  }
}

function Demo(props) {
  return _react2.default.createElement(
    'section',
    { className: 'container mg-top-1 mg-bottom-2' },
    _react2.default.createElement(
      'h1',
      null,
      'Demos'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Check the ',
      _react2.default.createElement(
        'a',
        { href: '/annotated/src/server/controllers/demo.controller.js.html' },
        'server controller'
      ),
      '\xA0and the corresponding ',
      _react2.default.createElement(
        'a',
        { href: '/annotated/src/client/views/Docs.jsx.html' },
        'JSX view'
      ),
      '.'
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column column-25' },
        _react2.default.createElement(
          'h3',
          null,
          'Counter'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement(
          'p',
          null,
          'Basic counter demo',
          _react2.default.createElement('br', null),
          'You can specify a value in the query params: ',
          _react2.default.createElement(
            'a',
            { href: '/demos/counter?value=1234' },
            '/demos/counter?value=1234'
          ),
          _react2.default.createElement('br', null),
          'The controller will send back via the view props the value and the component will initialy render it.'
        ),
        _react2.default.createElement(Counter, { value: props.counter })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement('hr', null)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column column-25' },
        _react2.default.createElement(
          'h3',
          null,
          'Redirect'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement(
          'p',
          null,
          'Showcase a redirection.',
          _react2.default.createElement('br', null),
          'Open your network tab and look at the requests: the final url will be up to date in the browser address bar.'
        ),
        _react2.default.createElement(
          _router.Link,
          { to: '/demos/redirect', exact: true },
          'Redirect'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement('hr', null)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column column-25' },
        _react2.default.createElement(
          'h3',
          null,
          'Not found'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement(
          'p',
          null,
          'Showcase the not found page:'
        ),
        _react2.default.createElement(
          _router.Link,
          { to: '/demos/notfound', exact: true },
          'Not found'
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement('hr', null)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'column column-25' },
        _react2.default.createElement(
          'h3',
          null,
          'Server error'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'column' },
        _react2.default.createElement(
          'p',
          null,
          'Showcase the server error page:'
        ),
        _react2.default.createElement(
          _router.Link,
          { to: '/demos/error', exact: true },
          'Server error'
        )
      )
    )
  );
}