
import HomeComponent from '../../client/components/HomeContainer'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.context.container.component = HomeComponent
  ctx.state.layout.alternate = true
}

export default { index }
