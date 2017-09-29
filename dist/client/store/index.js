'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _utils = require('../utils');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const composer = _utils.isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

exports.default = initialState => (0, _redux.createStore)(_reducer2.default, initialState, composer((0, _redux.applyMiddleware)(_reduxThunk2.default)));