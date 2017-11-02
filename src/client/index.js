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
  const history = createBrowserHistory()
  const store = createStore(window.INITIAL_STATE || {})

  const root = hydrate(
    <AppMain history={history} store={store} initialView={initialView} />,
    document.getElementById('root')
  )

  if (module.hot) {
    // in dev mode, accept everything and
    // call the AppMain component to reload
    // the current view.
    module.hot.accept()
    module.hot.status((status) => {
      if (status === 'apply') {
        root.wrappedInstance.loadAsyncComponent()
      }
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
