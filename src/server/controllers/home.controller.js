
import HomeComponent from '../../client/views/Home'

function index (ctx) {
  ctx.cache.control = 'public'
  ctx.state.view.component = HomeComponent
  ctx.state.view.props = {
    alt: true
  }
}

export default { index }
