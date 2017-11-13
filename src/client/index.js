import React from 'react'
import { hydrate } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'
import createStore from './store'

import './style'
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!highlight.js/styles/github.css'

/**
 * Bootstrap the React app.
 *
 * @param {} container
 */
const bootstrap = container => {
  const root = document.getElementById('root')
  const history = createBrowserHistory()
  const store = createStore(window.INITIAL_STATE || {})

  const render = (AppComponent, container) => {
    hydrate(
      <AppComponent history={history} store={store} container={container} />,
      root
    )
  }

  render(App, container)

  if (module.hot) {
    // in dev mode, accept everything:
    // rerender the App component and reload
    // the current container.

    const { unmountComponentAtNode } = require('react-dom')

    module.hot.accept(
      Object.keys(__webpack_modules__), // eslint-disable-line no-undef
      () => {
        // re-require the style
        require('./style')
        require('./style/global')

        // re-require/render the app
        const UpdatedApp = require('./App')
        const { component } = store.getState().context.container
        const updatedContainer = require.resolveWeak(`./${process.env.CONTAINERS}/${component}`)

        unmountComponentAtNode(root)
        render(UpdatedApp.default, updatedContainer.default)
      })
  }
}

/*
 * Client entry
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Call webpack import to get the first container.
  // (avoid an unnecessary flash)
  try {
    const { component } = window.INITIAL_STATE.context.container
    const container = await import(`./${process.env.CONTAINERS}/${component}`)
    bootstrap(container.default)
  } catch (e) {
    bootstrap()
  }
})
