import Koa from 'koa'
import helmet from 'koa-helmet'
import responseTime from 'koa-response-time'
import staticCache from 'koa-static-cache'

import config from '../../config'
import routes from './routes'
import renderer from './middlewares/renderer'

console.log(config.toString())

const app = new Koa()

app.use(helmet())
app.use(responseTime())

// static & bundles serving
app.use(staticCache(config.get('server.static.directory'), config.get('server.static')))
app.use(staticCache(config.get('server.bundles.directory'), config.get('server.bundles')))

// First one: the init() renderer.
// This will setup a base state
// that middlewares and controllers
// will use
app.use(renderer.init())

// Others middlewares that need access
// to the state after
/* app.use(myMiddleware()) */

// Lastly, just before the controllers,
// the wait() renderer. It will wait for
// controller output then render the state.
// This can be a JSON or HTML depending on
// the request (partial or SSR)
app.use(renderer.wait())

// Then setup routers and controllers
app.use(routes.routes(), routes.allowedMethods())

// Finally start the server
const server = app.listen(
  config.get('server.port'),
  config.get('server.host'), () => {
    const { address, port } = server.address()
    console.log(`App running at http://${address}:${port}`)
  })

// Hot reload support:
// just stop the current server
if (module.hot) {
  module.hot.accept()

  module.hot.store(() => {
    server.close()
  })
}
