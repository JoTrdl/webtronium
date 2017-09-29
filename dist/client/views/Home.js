"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Home extends _react2.default.Component {
  render() {
    return _react2.default.createElement(
      "section",
      { className: "home" },
      _react2.default.createElement(
        "div",
        { className: "hero" },
        _react2.default.createElement(
          "div",
          { className: "content v-align" },
          _react2.default.createElement(
            "div",
            { className: "wrapper" },
            _react2.default.createElement(
              "h1",
              { className: "animated fadeIn" },
              _react2.default.createElement(
                "strong",
                null,
                "P"
              ),
              "ure",
              _react2.default.createElement(
                "strong",
                null,
                " S"
              ),
              "erver",
              _react2.default.createElement(
                "strong",
                null,
                "\xA0R"
              ),
              "outer"
            ),
            _react2.default.createElement(
              "p",
              { className: "animated fadeInUp" },
              "A pure, simple and efficient pattern to build JavaScript isomorphic websites."
            ),
            _react2.default.createElement(
              "a",
              { href: "https://github.com/JoTrdl/pure-server-router",
                className: "button button-large button-outline button-effect animated fadeInUp" },
              _react2.default.createElement(
                "span",
                null,
                "See on Github"
              )
            )
          )
        )
      )
    );
  }
}
exports.default = Home;