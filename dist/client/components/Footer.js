'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer(props) {
  const alternate = props.alt && 'alt' || '';
  return _react2.default.createElement(
    'footer',
    { className: ['center', 'v-align', alternate].join(' ') },
    _react2.default.createElement(
      'p',
      { className: 'no-margin' },
      'MIT License. Copyright \xA9 ',
      new Date().getFullYear()
    )
  );
}