
import DemoComponent from '../../client/containers/Demo'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.container.component = DemoComponent
}

function counter (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.container.component = DemoComponent
  ctx.state.context.container.props = {
    counter: parseInt(ctx.query.value) || 0
  }
}

function redirect (ctx) {
  ctx.status = 301
  ctx.redirect('/demos?redirected')
}

function error (ctx) {
  throw new Error('Ooops! Something bad happened')
}

export default { index, counter, redirect, error }
