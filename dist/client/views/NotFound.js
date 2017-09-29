"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotFound;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NotFound(props) {
  return _react2.default.createElement(
    "section",
    { className: "container mg-top-2 center" },
    _react2.default.createElement(
      "h1",
      { className: "mg-top-2" },
      "This page is not found!"
    )
  );
}