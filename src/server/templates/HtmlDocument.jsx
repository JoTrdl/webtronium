import React from 'react'
import { Provider } from 'react-redux'

import { Router } from '../../client/router'
import App from '../../client/App'
import createStore from '../../client/store'

import config from '../../../config'

const bundlesPrefix = config.get('server.bundles.prefix')
const assets = JSON.parse(config.get('server.bundles.assets'))
const chunks = JSON.parse(config.get('server.bundles.chunks'))
const analyticsId = config.get('analytics')

// List of features to polyfill via polyfill.io
const polyfillFeatures = [
  'Array.from',
  'Array.prototype.includes',
  'Array.prototype.find',
  'fetch',
  'Object.assign',
  'Object.entries'
]

/**
 * HtmlDocument component
 *
 * @export
 * @param {any} { state, children }
 * @returns
 */
export default function HtmlDocument ({ state, children }) {
  // the store uses a 'context' module
  // so put the state in it
  const store = createStore(state)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="language" content="en" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="author" content="Johann Troendle" />
        <meta name="keywords" content="node, react, redux, router, isomorphic, universal, server-first" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{state.context.metadata.title || 'Pure Server Router'}</title>

        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/img/favicons/favicon-96x96.png" />

        {state.context.metadata.metas.map((meta, i) => <meta key={i} {...meta} />)}
        {state.context.metadata.links.map((link, i) => <link key={i} {...link} />)}

        { assets.app.css && <link href={`${bundlesPrefix}/${assets.app.css}`} rel="stylesheet" /> }
        <script defer src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfillFeatures.join()}`} />
        <script defer src={`${bundlesPrefix}/${assets.vendor.js}`} />
        <script defer src={`${bundlesPrefix}/${assets.app.js}`} />
        { chunks[state.context.view.component] && <script defer src={`${bundlesPrefix}/${chunks[state.context.view.component]}`} /> }
        <script async src='https://www.google-analytics.com/analytics.js'></script>
      </head>
      <body>
        <div id="root">
          <Provider store={store}>
            <Router location={state.context.location}>
              <App layout={state.layout}>
                {children && children}
              </App>
            </Router>
          </Provider>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE=${JSON.stringify(state)};`
          }}
        />
        { analyticsId &&
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                ga('create', '${analyticsId}', 'auto');
                ga('send', 'pageview');
              `
            }}
          />
        }
      </body>
    </html>
  )
}
