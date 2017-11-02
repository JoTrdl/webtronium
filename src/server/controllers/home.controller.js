
import HomeComponent from '../../client/views/Home'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.view.component = HomeComponent
  ctx.state.layout.alternate = true
}

export default { index }
