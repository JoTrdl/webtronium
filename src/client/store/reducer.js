import { combineReducers } from 'redux'

// import modules and combine them here
import context from './modules/context'
import layout from './modules/layout'

export default combineReducers({
  context,
  layout
})
