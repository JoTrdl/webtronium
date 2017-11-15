
const DEFAULT_TIMEOUT = 10 * 1000 // 10 secs

const resolvable = () => {
  let _resolve
  let _reject
  let p = new Promise((resolve, reject) => (
    [_resolve, _reject] = [resolve, reject])
  )
  p.resolve = _resolve
  p.reject = _reject
  return p
}

function _request (url, method, data = {}, options) {
  const headers = options.headers || {}
  if (data.json) {
    headers['Content-Type'] = 'application/json'
  }

  const response = resolvable()
  ;['json', 'text', 'blob'].forEach(way => {
    Object.defineProperty(response, way, {
      get: () => response.then((r) => r.clone()[way]()),
      set: () => {
        throw new Error('Cannot set read-only property.')
      }
    })
  })

  const params = {
    credentials: 'include',
    headers
  }

  if (data) {
    params.body = data.json
      ? JSON.stringify(data.json)
      : data.text || data.blob
  }

  setTimeout(() => {
    const timeout = setTimeout(() => {
      response.reject(new Error('Request timeout'))
    }, options.timeout || DEFAULT_TIMEOUT)

    fetch(url, params)
      .then(resp => {
        clearTimeout(timeout)

        if (resp.status > 399) {
          const resolveErrors = options.resolveErrors || []
          const shouldResolve = resolveErrors.includes(resp.status)
          if (!shouldResolve) {
            const r = new Error(`Received an error status: ${resp.status}.`)
            response.reject(r)
          }
        }

        response.resolve(resp)
      })
      .catch(err => {
        clearTimeout(timeout)
        response.reject(err)
      })
  }, 0)

  return response
}

const get = (url, options) => _request(url, 'GET', undefined, options)
const post = (url, data, options) => _request(url, 'POST', data, options)
const put = (url, data, options) => _request(url, 'PUT', data, options)
const del = (url, options) => _request(url, 'DELETE', undefined, options)

export default { get, post, put, del }
