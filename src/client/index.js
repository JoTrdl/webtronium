import React from 'react'
import { hydrate } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import AppMain from './AppMain'
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
const bootstrap = (initialView) => {
  const root = document.getElementById('root')
  const history = createBrowserHistory()
  const store = createStore(window.INITIAL_STATE || {})

  const render = (RootComponent, view) => {
    hydrate(
      <RootComponent history={history} store={store} initialView={view} />,
      root
    )
  }

  render(AppMain, initialView)

  if (module.hot) {
    // in dev mode, accept everything:
    // rerender the AppMain component and reload
    // the current view.

    const { unmountComponentAtNode } = require('react-dom')

    module.hot.accept(
      Object.keys(__webpack_modules__), // eslint-disable-line no-undef
      () => {
        const UpdatedApp = require('./AppMain').default
        const { component: container } = store.getState().context.view
        const updatedView = require(`./views/${container}`).default

        unmountComponentAtNode(root)
        render(UpdatedApp, updatedView)
      })
  }
}

/*
 * Client entry
 */
document.addEventListener('DOMContentLoaded', () => {
  // Call webpack import to get the first view.
  // (avoid an unnecessary flash)
  import(`./views/${window.INITIAL_STATE.context.view.component}`)
    .then(view => bootstrap(view.default))
    .catch(bootstrap)
})
