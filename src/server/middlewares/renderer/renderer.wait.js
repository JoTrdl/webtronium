
import {
  render,
  renderNotFound,
  renderServerError
} from './renderer.render'

export default function () {
  // This middleware must be the last one,
  // just before the controllers.
  // It will wait for their responses then
  // render the state.
  // Depenfing on the request, it will send
  // back a JSON or a HTML response.
  return async function wait (ctx, next) {
    // Await the controller to respond
    // catch error to set the 500 status
    try {
      await next()
    } catch (e) {
      ctx.status = 500
      ctx.error = e
    }

    // If the controller set to not handle
    // the request (and got no error)
    if (!ctx.error && ctx.noRender) {
      return
    }

    try {
      // Time to render.
      // Depending on the status, decide which
      // rendering function to call. 
      switch (ctx.status) {
        case 200:
          await render(ctx)
          break
        case 404:
        default:
          await renderNotFound(ctx)
          break
        case 500:
          await renderServerError(ctx)
          break
      }

    // Catch any rendering error.
    // It is better to not use renderServerError()
    // and avoid a potentialy infinite loop.
    // In this case just send a static 500 page
    } catch (e) {
      ctx.status = 500
      ctx.body = e.stack
    }
  }
}
