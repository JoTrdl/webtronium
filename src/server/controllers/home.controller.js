
import HomeComponent from '../../client/views/Home'

function index (ctx) {
  ctx.status = 200
  ctx.cache.control = 'public'
  ctx.state.view.component = HomeComponent
  ctx.state.view.props = {
    alt: true
  }
}

export default { index }
