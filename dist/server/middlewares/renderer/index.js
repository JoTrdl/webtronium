'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderer = require('./renderer.init');

var _renderer2 = _interopRequireDefault(_renderer);

var _renderer3 = require('./renderer.wait');

var _renderer4 = _interopRequireDefault(_renderer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { init: _renderer2.default, wait: _renderer4.default };