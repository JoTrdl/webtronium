'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App(props) {
  return [_react2.default.createElement(_Header2.default, { key: 'header', alt: props.viewprops.alt }), _react2.default.createElement(
    'main',
    { key: 'main' },
    props.children && props.children
  ), _react2.default.createElement(_Footer2.default, { key: 'footer', alt: props.viewprops.alt })];
}