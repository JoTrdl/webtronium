
import HomeComponent from '../../client/containers/Home'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.container.component = HomeComponent
  ctx.state.layout.alternate = true
}

export default { index }
