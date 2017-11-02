import { createDuck } from 'redux-duck'

import { fetchRoute } from '../../router'

const context = createDuck('context')

// Initial state
const initialState = {}

// Types
const SET_STATE = context.defineType('SET_STATE')
const FETCH_CONTEXT_ERROR = context.defineType('FETCH_CONTEXT_ERROR')

// Actions
const fetchContextError = context.createAction(FETCH_CONTEXT_ERROR)

// Reducer
export default context.createReducer({
  [SET_STATE]: (state, action) => ({ ...state, ...action.payload }),
  [FETCH_CONTEXT_ERROR]: (state, action) => ({ ...state, ...action.payload })
}, initialState)

export function fetchContext (path) {
  return (dispatch, getState) => {
    return fetchRoute(path)
      .then(state => {
        Object.entries(state).forEach(([key, payload]) => {
          dispatch({ type: `${key}/SET_STATE`, payload })
        })
        return getState().context
      })
      .catch(e => dispatch(fetchContextError({ e })))
  }
}
