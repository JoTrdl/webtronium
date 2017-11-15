import React from 'react'

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

// Some sugar JSX
const Div = ({ tag, id, content }) => (
  React.createElement(tag || 'div', {
    id,
    dangerouslySetInnerHTML: {
      __html: content
    }
  })
)
const Script = ({ content }) => Div({ tag: 'script', content })
const Style = ({ content }) => Div({ tag: 'style', content })
const Body = ({ content }) => Div({ tag: 'body', content })

/**
 * HtmlDocument component
 *
 * @export
 * @param {any} { state, children }
 * @returns
 */
export default function HtmlDocument ({ state, content, criticalCSS }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="language" content="en" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="author" content="Johann Troendle" />
        <meta name="keywords" content="node, react, redux, router, isomorphic, universal, server-first" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{state.context.metadata.title || 'Webtronium'}</title>

        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/img/favicons/favicon-96x96.png" />

        {state.context.metadata.metas.map((meta, i) => <meta key={i} {...meta} />)}
        {state.context.metadata.links.map((link, i) => <link key={i} {...link} />)}

        { /* CSS section:
          If critical css specified, sent it and postload the bundle */ }
        { criticalCSS && <Style content={criticalCSS} />}
        { criticalCSS &&
          <link data-href={`${bundlesPrefix}/${assets.app.css}`} rel="stylesheet" />
        }
        { !criticalCSS && assets.app.css &&
          <link href={`${bundlesPrefix}/${assets.app.css}`} rel="stylesheet" /> }

        { /* Scripts section */ }
        <script defer src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfillFeatures.join()}`} />
        <script defer src={`${bundlesPrefix}/${assets.vendor.js}`} />
        <script defer src={`${bundlesPrefix}/${assets.app.js}`} />
        { chunks[state.context.container.component] &&
          <script defer src={`${bundlesPrefix}/${chunks[state.context.container.component]}`} /> }
        <script async src='https://www.google-analytics.com/analytics.js'></script>

        <Script content={`window.INITIAL_STATE=${JSON.stringify(state)};`} />
        { analyticsId &&
          <Script content={`
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', '${analyticsId}', 'auto');
            ga('send', 'pageview');`}
          />
        }
      </head>
      <Body content={content} />
    </html>
  )
}
