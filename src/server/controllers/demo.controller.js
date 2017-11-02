
import DemoComponent from '../../client/views/Demo'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.view.component = DemoComponent
}

function counter (ctx) {
  ctx.cache.control = 'public'
  ctx.state.view.component = DemoComponent
  ctx.state.view.props = {
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
