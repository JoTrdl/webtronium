import { createDuck } from 'redux-duck'

import { fetchRoute } from '../../router'

const context = createDuck('context')

// Initial state
const initialState = {
  context: {}
}

// Types
const SET_CONTEXT = context.defineType('SET_CONTEXT')
const FETCH_CONTEXT_ERROR = context.defineType('FETCH_CONTEXT_ERROR')

// Actions
const setContext = context.createAction(SET_CONTEXT)
const fetchContextError = context.createAction(FETCH_CONTEXT_ERROR)

// Reducer
export default context.createReducer({
  [SET_CONTEXT]: (state, action) => (action.payload.context),
  [FETCH_CONTEXT_ERROR]: (state, action) => (action.payload.context)
}, initialState)

export function fetchContext (path) {
  return dispatch => fetchRoute(path)
    .then(context => dispatch(setContext(context)))
    .catch(e => dispatch(fetchContextError({ context: e })))
}
