import React from 'react'
import { renderToString } from 'react-dom/server'
import xxhash from 'xxhashjs'
import { cloneDeep } from 'lodash'

import config from '../../../../config'
import HtmlDocument from '../../templates/HtmlDocument'

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
export function render (ctx) {
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
  // 'view.component' becomes only the component name for
  // serialization.
  // Try first if Redux Connect component, else default to the name
  const state = cloneDeep(ctx.state)
  if (state.view.component) {
    const { component } = state.view
    state.view.component = component.WrappedComponent
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
    ctx.body = { context: state }
    return
  }

  // Else it is a full SSR: render the dom to string.
  // Use the template and pass to it the component
  // to render
  const content = renderToString(
    <HtmlDocument state={state}>
      {ctx.state.view.component &&
        <ctx.state.view.component {...ctx.state.view.props} />}
    </HtmlDocument>
  )

  ctx.type = 'html'
  ctx.body = `<!DOCTYPE html>\n${content}`
}

/**
 * Render the not found page.
 * @export
 * @param {any} ctx
 */
export function renderNotFound (ctx) {
  ctx.state.metadata.title = 'Not Found'
  ctx.state.metadata.metas.push({ name: 'description', content: 'Page not found' })
  ctx.state.view.component = require('../../../client/views/NotFound').default

  render(ctx)
}

/**
 * Render the server error page.
 * @export
 * @param {any} ctx
 */
export function renderServerError (ctx) {
  ctx.state.metadata.title = 'Server Error'
  ctx.state.metadata.metas.push({ name: 'description', content: 'Server Error' })

  ctx.state.view.component = require('../../../client/views/ServerError').default
  ctx.state.view.props = {
    title: ctx.error.message,
    stack: ctx.error.stack
  }

  render(ctx)
}
