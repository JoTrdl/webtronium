import { createDuck } from 'redux-duck'

import { request } from '../../utils'

const context = createDuck('context')

// Initial state
const initialState = {}

// Types
const SET_STATE = context.defineType('SET_STATE')

/**
 * Function to fetch a route from the backend.
 *
 * Uses the X-Requested-With header to tell to the
 * backend that the route is loaded from an 'alive'
 * client.
 *
 * The backend will respond with an object (json)
 * representation.
 *
 * Returns the response data and the final url. The
 * fetch api follows the redirects, so we need to
 * update the url in the address bar if we got one.
 *
 * @param {string} path
 */
function fetchRoute (path) {
  return request.get(path, {
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'ClientFetchRequest'
    },
    resolveErrors: [404, 500]
  }).json
}

// Reducer
export default context.createReducer({
  [SET_STATE]: (state, action) => ({ ...state, ...action.payload })
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
  }
}
