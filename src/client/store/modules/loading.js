import { createDuck } from 'redux-duck'

const loading = createDuck('loading')

// Initial state
const initialState = {
  active: false
}

// Types
const SET_ACTIVE = loading.defineType('SET_ACTIVE')

// Actions
const setActive = loading.createAction(SET_ACTIVE)

// Reducer
export default loading.createReducer({
  [SET_ACTIVE]: (state, action) => (action.payload)
}, initialState)

export function setLoadingState (active) {
  return setActive({ active })
}
