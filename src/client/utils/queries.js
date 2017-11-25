
const queries = function (queries) {
  const queryString = (typeof queries === 'string') ? queries : null
  const queryObject = (typeof queries === 'object') ? queries : null

  if (!queryString && !queryObject) {
    throw new Error(`Unsupported queries format: ${typeof queries} for ${queries}`)
  }

  return {
    /**
     * Format the queries to string
     */
    toString: () => {
      if (queryString) {
        return queryString
      }

      return Object.entries(queryObject)
        .filter(([q, v]) => q && v)
        .map(([q, v]) => `${q}=${v}`)
        .join('&')
    },
    /**
     * Format the queries to an object
     */
    toObject: () => {
      if (queryObject) {
        return queryObject
      }

      return queryString.split('&')
        .reduce((acc, s) => {
          const [q, v] = s.split('=')
          if (q) {
            acc[q] = v || ''
          }
          return acc
        }, {})
    }
  }
}

export default queries
