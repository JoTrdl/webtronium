import { combineReducers } from 'redux'

import * as packages from './modules/*.js'

const reducers = {}

Object.entries(packages).forEach(([name, reducer]) => {
  const entry = name.split('$')[0]
  reducers[entry] = reducer
})

export default combineReducers(reducers)
