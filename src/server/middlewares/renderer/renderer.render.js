import React from 'react'
import { renderToStaticMarkup, renderToNodeStream } from 'react-dom/server'
import xxhash from 'xxhashjs'
import { cloneDeep } from 'lodash'

import extractCriticalCSS from './renderer.critical-css'
import config from '../../../../config'
import App from '../../../client/App'
import createStore from '../../../client/store'
import HtmlDocument from '../../templates/HtmlDocument'
import ErrorContainer from '../../../client/components/ErrorContainer'

const appId = config.get('appId')
const cacheConfig = config.get('server.cache')

/**
 * Render the state defined in ctx.
 * Take care of the request caching and render the
 * ctx based on the partial/SSR type.
 *
 * @export
 * @param {any} ctx Koa context
 */
export async function render (ctx) {
  // Determine if it is a 'partial' request.
  // Meaning that a client requested data from
  // the loaded app
  const partial = ctx.headers['x-requested-with'] === 'ClientFetchRequest'

  // Handles the cache control if enabled and
  // if differs from the default value.
  if (cacheConfig.enabled &&
      ctx.cache.control !== 'no-cache') {
    // Get or compute the hash
    const hash =
      ctx.cache.hash ||
      xxhash
        .h32(0xbabe)
        .update(JSON.stringify({ partial, ...ctx.state }))
        .digest()
        .toString(16)

    // Setup the 2 cache headers
    const maxAge = ctx.cache.maxAge || cacheConfig.maxAge
    ctx.set('Cache-Control', `${ctx.cache.control}, max-age=${maxAge}`)
    ctx.set('ETag', `"${appId}/${hash}"`)
  }

  // If the request is fresh, just send back a 304
  // fresh => response[Etag] === request[If-None-Match]
  if (ctx.fresh) {
    ctx.status = 304 // not modified
    return
  }

  // Format the state to render
  // 'container.component' becomes only the component name for
  // serialization.
  // Try first if Redux Connect component, else default to the name
  const state = cloneDeep(ctx.state)
  if (state.context.container.component) {
    const { component } = state.context.container
    state.context.container.component = component.WrappedComponent
      ? component.WrappedComponent.name
      : component.name
  }

  // The 'Vary' header based on the content type
  // is extremely important: this tells to all cache layers
  // and the browser that for the current URL, its content
  // can change based on the Content-Type.
  // For a same URL (Uniform Resource Locator), we can
  // both render a JSON or a HTML content.
  ctx.set('Vary', 'Content-Type')

  // partial? just send the state as json
  // the Redux store expect to have a 'context'
  // entry.
  if (partial) {
    ctx.type = 'json'
    ctx.body = state
    return
  }

  // Else it is a full SSR: render the dom to string.
  // 1 - Render the content
  // 2 - Extract the critical CSS
  // 3 - Render the HTML page

  // render the App content via Stream
  // to give more 'air' for the server
  const renderContent = () => {
    return new Promise((resolve, reject) => {
      const { container } = ctx.state.context
      const stream = renderToNodeStream(
        <div id="root">
          <App store={createStore(state)}>
            {container.component &&
              <container.component {...container.props} />}
          </App>
        </div>
      )

      const chunks = []
      stream.on('data', chunk => chunks.push(chunk))
      stream.on('end', () => resolve(Buffer.concat(chunks).toString()))
      stream.on('error', e => reject(e))
    })
  }

  const content = await renderContent()

  // Once rendered, extract the critical css
  const criticalCSS = await extractCriticalCSS(ctx.extractCssKey || ctx._matchedRoute, content)

  const document = renderToStaticMarkup(
    <HtmlDocument state={state} content={content} criticalCSS={criticalCSS} />
  )

  ctx.type = 'html'
  ctx.body = `<!DOCTYPE html>\n${document}`
}

/**
 * Render the not found page.
 * @export
 * @param {any} ctx
 */
export async function renderNotFound (ctx) {
  ctx.extractCssKey = 'not_found'
  ctx.status = 404 // force a 404 status
  ctx.state.context.metadata.title = 'Not Found'
  ctx.state.context.metadata.metas.push({ name: 'description', content: 'Page not found' })
  ctx.state.context.container.component = ErrorContainer
  ctx.state.context.container.props = {
    status: 404
  }

  return render(ctx)
}

/**
 * Render the server error page.
 * @export
 * @param {any} ctx
 */
export async function renderServerError (ctx) {
  ctx.extractCssKey = 'server_error'
  ctx.state.context.metadata.title = 'Server Error'
  ctx.state.context.metadata.metas.push({ name: 'description', content: 'Server Error' })

  ctx.state.context.container.component = ErrorContainer
  ctx.state.context.container.props = {
    status: 500,
    title: ctx.error.message,
    stack: ctx.error.stack
  }

  return render(ctx)
}
