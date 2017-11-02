import { createDuck } from 'redux-duck'

const layout = createDuck('layout')

// Initial state
const initialState = {
  alternate: false
}

// Types
const SET_STATE = layout.defineType('SET_STATE')

// Actions

// Reducer
export default layout.createReducer({
  [SET_STATE]: (state, action) => ({ ...state, ...action.payload })
}, initialState)
