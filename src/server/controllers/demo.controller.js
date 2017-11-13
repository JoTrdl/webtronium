
import DemoContainer from '../../client/components/DemoContainer'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.container.component = DemoContainer
}

function counter (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.container.component = DemoContainer
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
