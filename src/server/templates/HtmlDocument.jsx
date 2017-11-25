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

const Metatags = metas => (
  metas.map((meta, i) => <meta key={i} {...meta} />)
)

const Links = links => (
  links.map((link, i) => <link key={i} {...link} />)
)

const Scripts = scripts => (
  scripts.map((script, i) => {
    const { src, inner } = script
    if (!src && !inner) {
      return null
    }
    return inner
      ? <Script key={i} content={inner} />
      : <script key={i} {...script} />
  })
)

/**
 * HtmlDocument component
 *
 * @export Function
 * @param {{ state: Object, content: string, criticalCSS: string }} param - Document params
 * @returns {string} The document rendered
 */
export default function HtmlDocument ({ state, content, criticalCSS }) {
  // Add the main App css to the links if defined
  if (assets.app.css) {
    const cssLink = { rel: 'stylesheet' }

    // 'data-href' if critical css is here, else default 'href'
    cssLink[criticalCSS ? 'data-href' : 'href'] = `${bundlesPrefix}/${assets.app.css}`
    state.context.metadata.links.push(cssLink)
  }

  return (
    <html lang="en">
      <head>
        <title>{ state.context.metadata.title || 'Webtronium' }</title>

        { /* Metatags section */ }
        {Metatags([
          { charSet: 'utf-8' },
          { name: 'language', content: 'en' },
          { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' },
          { name: 'author', content: 'Johann Troendle' },
          { name: 'keywords', content: 'node, react, redux, router, isomorphic, universal, server-first' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
          ...state.context.metadata.metas
        ])}

        { /* If critical css specified, inline the style */ }
        { criticalCSS && <Style content={criticalCSS} /> }

        { /* Links section */ }
        {Links([
          { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicons/favicon-16x16.png' },
          { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicons/favicon-32x32.png' },
          { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/img/favicons/favicon-96x96.png' },
          ...state.context.metadata.links
        ])}

        { /* Scripts section */ }
        {Scripts([
          { defer: true, src: `https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfillFeatures.join()}` },
          { defer: true, src: `${bundlesPrefix}/${assets.vendor.js}` },
          { defer: true, src: `${bundlesPrefix}/${assets.app.js}` },
          { defer: true, src: chunks[state.context.container.component] && `${bundlesPrefix}/${chunks[state.context.container.component]}` },
          { async: true, src: 'https://www.google-analytics.com/analytics.js' },
          { inner: `window.INITIAL_STATE=${JSON.stringify(state)};` },
          { inner: `window.ANALYTICS_ID=${JSON.stringify(analyticsId)};` }
        ])}
      </head>
      <Body content={content} />
    </html>
  )
}
