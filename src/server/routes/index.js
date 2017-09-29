import Router from 'koa-router'

import homeController from '../controllers/home.controller'
import docsController from '../controllers/docs.controller'
import demoController from '../controllers/demo.controller'

const router = Router()

// Home page
router.get('/', homeController.index)

// Docs
router.get('/docs/:section?', docsController.index)

// Demo routes
router.get('/demos', demoController.index)
router.get('/demos/counter', demoController.counter)
router.get('/demos/error', demoController.error)
router.get('/demos/redirect', demoController.redirect)

export default router
