'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Docs;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('../router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Docs(props) {
  return _react2.default.createElement(
    'section',
    { className: 'section-docs' },
    _react2.default.createElement(
      'nav',
      { className: 'menu' },
      _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _router.Link,
            { to: '/docs', exact: true },
            'Introduction'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _router.Link,
            { to: '/docs/the-gist', exact: true },
            'The Gist'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _router.Link,
            { to: '/docs/keys-points', exact: true },
            'Keys Points'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _router.Link,
            { to: '/docs/getting-started', exact: true },
            'Getting Started'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement('hr', null)
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'a',
            { href: '/annotated/index.html', target: '_blank', rel: 'noopener noreferrer' },
            'Annotated sources'
          )
        )
      )
    ),
    _react2.default.createElement(
      'section',
      { className: 'content' },
      props.content ? _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: props.content } }) : _react2.default.createElement(
        'p',
        null,
        'Documentation currently under development'
      )
    )
  );
}