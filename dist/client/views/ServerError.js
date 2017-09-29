"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ServerError;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ServerError(props) {
  const { title, stack } = props;
  return _react2.default.createElement(
    "section",
    { className: "container mg-top-2" },
    _react2.default.createElement(
      "h1",
      null,
      "Server Error: ",
      title
    ),
    _react2.default.createElement(
      "pre",
      null,
      stack
    )
  );
}