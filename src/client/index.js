import React from 'react'
import { hydrate } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './App'
import createStore from './store'

import 'milligram'
import 'animate.css'
import 'highlight.js/styles/github.css'
import './style/index.scss'

/**
 * Bootstrap the React app.
 *
 * @param {} initialModule
 */
const bootstrap = (container) => {
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
        const UpdatedApp = require('./App').default
        const { component: container } = store.getState().context.container
        const updatedContainer = require(`./containers/${container}`).default

        unmountComponentAtNode(root)
        render(UpdatedApp, updatedContainer)
      })
  }
}

/*
 * Client entry
 */
document.addEventListener('DOMContentLoaded', () => {
  // Call webpack import to get the first container.
  // (avoid an unnecessary flash)
  import(`./containers/${window.INITIAL_STATE.context.container.component}`)
    .then(container => bootstrap(container.default))
    .catch(bootstrap)
})
