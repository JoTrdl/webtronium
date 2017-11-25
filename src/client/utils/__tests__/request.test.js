import Koa from 'koa'
import Router from 'koa-router'

import request from '../request'

describe('Request utils', () => {
  let testServer = null
  let TEST_SERVER_URL = ''

  beforeAll(() => {
    const testApp = new Koa()

    const router = Router()

    router.get('/get/:status?', ctx => {
      ctx.status = parseInt(ctx.params.status || 200)
      ctx.body = 'Response body'
    })

    router.get('/unimplemented', ctx => {
      ctx.status = 501
    })

    router.get('/timeout', ctx => {
      ctx.status = 200
      setTimeout(() => {
        ctx.body = ''
      }, 500)
    })

    router.post('/post', ctx => {
      ctx.status = 200
    })

    router.put('/put', ctx => {
      ctx.status = 200
    })

    router.delete('/delete', ctx => {
      ctx.status = 200
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

  it('should execute a request and get the response', async () => {
    const response = await request.get(`${TEST_SERVER_URL}/get`)
    expect(response.status).toBe(200)

    const body = await response.text()
    expect(body).toBe('Response body')
  })

  it('should execute a request and get the directly the body', async () => {
    const body = await request.get(`${TEST_SERVER_URL}/get`).text()
    expect(body).toBe('Response body')
  })

  it('should reject if an error is returned', async () => {
    try {
      await request.get(`${TEST_SERVER_URL}/unimplemented`)
    } catch (e) {
      expect(e).toBeDefined()
      expect(e.message).toBe('Received an error status: 501.')
    }
  })

  it('should resolve if the returned error is marked for', async () => {
    try {
      const r = await request.get(`${TEST_SERVER_URL}/unimplemented`, { resolveErrors: [501] })
      expect(r).toBeDefined()
      expect(r.status).toBe(501)
    } catch (e) {
      expect(e).toBeUndefined()
    }
  })

  it('should reject if timeout is reached', async () => {
    try {
      await request.get(`${TEST_SERVER_URL}/get`, { timeout: 1 })
    } catch (e) {
      expect(e).toBeDefined()
      expect(e.message).toBe('Request timeout')
    }
  })
})
