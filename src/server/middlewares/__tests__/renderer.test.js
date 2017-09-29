import { promisify } from 'util'
import Koa from 'koa'
import Router from 'koa-router'

import renderer from '../renderer'

const request = promisify(require('request'))

describe('Renderer', () => {
  let testServer = null
  let TEST_SERVER_URL = ''

  beforeAll(() => {
    const testApp = new Koa()

    testApp.use(renderer.init())
    testApp.use(renderer.wait())

    const router = Router()

    router.get('/ok', ctx => {
      ctx.body = 'response_body_ok'
      ctx.status = 200
    })

    router.get('/notfound', ctx => {
      ctx.status = 404
    })

    router.get('/skip', ctx => {
      ctx.noRender = true
      ctx.status = 200
      ctx.body = 'Renderer skipped'
    })

    router.get('/cache', ctx => {
      ctx.status = 200
      ctx.body = 'response_body_ok'
      ctx.cache.control = 'public'
      ctx.cache.maxAge = '1234'

      if (ctx.query.without_hash !== 'true') {
        ctx.cache.hash = 'etag_hash'
      }
    })

    router.get('/exception', () => {
      throw new Error('something bad happened')
    })

    testApp.use(router.routes())

    return new Promise((resolve, reject) => {
      testServer = testApp.listen(0, 'localhost', err => {
        if (err) {
          return reject(err)
        }
        const address = testServer.address()
        TEST_SERVER_URL = `http://${address.address}:${address.port}`
        return resolve()
      })
    })
  })

  afterAll(() => testServer.close())

  it('should default status to 404', () =>
    request({
      url: `${TEST_SERVER_URL}/notImplemented`,
      json: true
    }).then(response => {
      expect(response.statusCode).toBe(404)
    }))

  it('should render a base state - SSR', () =>
    request({
      url: `${TEST_SERVER_URL}/ok`
    }).then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toMatch('text/html')
      expect(response.headers.vary).toBe('Content-Type')
    }))

  it('should render a base state - partial', () =>
    request({
      url: `${TEST_SERVER_URL}/ok`,
      headers: {
        'X-Requested-With': 'ClientFetchRequest'
      }
    }).then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toMatch('application/json')
      expect(response.headers.vary).toBe('Content-Type')
    }))

  it('should skip the rendering if asked', () =>
    request({
      url: `${TEST_SERVER_URL}/skip`
    }).then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('Renderer skipped')
    }))

  it('should perform request cache', () =>
    request({
      url: `${TEST_SERVER_URL}/cache`,
      headers: {
        'if-none-match': '"test/etag_hash"'
      },
      json: true
    }).then(response => {
      expect(response.statusCode).toBe(304)
      expect(response.headers['cache-control']).toBe('public, max-age=1234')
    }))

  it('should compute a default hash if no provided', () =>
    request({
      url: `${TEST_SERVER_URL}/cache?without_hash=true`,
      json: true
    }).then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.headers.etag).toBeDefined()
    }))

  it('should catch and render exception', () =>
    request({
      url: `${TEST_SERVER_URL}/exception`,
      json: true
    }).then(response => {
      expect(response.statusCode).toBe(500)
    }))
})
