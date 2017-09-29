'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.fetchContext = fetchContext;

var _utils = require('../utils');

var _router = require('../../router');

// Action Constants
const FETCH_CONTEXT_ERROR = 'context/FETCH_CONTEXT_ERROR';
const SET_CONTEXT = 'context/SET_CONTEXT';

// Action Creators
const fetchContextError = (0, _utils.createAction)(FETCH_CONTEXT_ERROR);
const setContext = (0, _utils.createAction)(SET_CONTEXT);

// Reducer
function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CONTEXT:
      return action.payload.context;

    case FETCH_CONTEXT_ERROR:
      return action.payload.context;

    default:
      return state;
  }
}

function fetchContext(path) {
  return dispatch => (0, _router.fetchRoute)(path).then(context => dispatch(setContext(context))).catch(e => dispatch(fetchContextError({ context: e })));
}