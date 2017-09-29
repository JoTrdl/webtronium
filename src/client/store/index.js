import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { isBrowser } from '../utils'
import reducer from './reducer'

let middlewares = [thunk]
let composer = compose

if (process.env.NODE_ENV === 'development') {
  // if dev, add the logger and redux devtools
  const logger = require('redux-logger').createLogger({ collapsed: true })
  middlewares = [...middlewares, logger]
  composer = (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
}

export default (initialState) => (
  createStore(
    reducer,
    initialState,
    composer(applyMiddleware(...middlewares))
  )
)
