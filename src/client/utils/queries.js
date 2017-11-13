
const queries = function (queries) {
  const queryString = (typeof queries === 'string') ? queries : null
  const queryObject = (typeof queries === 'object') ? queries : null

  if (!queryString && !queryObject) {
    throw new Error(`Unsupported queries format: ${typeof queries} for ${queries}`)
  }

  return {
    toString: () => {
      if (queryString) {
        return queryString
      }

      return Object.entries(queryObject)
        .map(([q, v]) => `${q}=${v}`)
        .join('&')
    },
    toObject: () => {
      if (queryObject) {
        return queryObject
      }

      return queryString.split('&')
        .reduce((acc, s) => {
          const [q, v] = s.split('=')
          acc[q || ''] = v || ''
          return acc
        }, {})
    }
  }
}

export default queries
