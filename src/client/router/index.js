import Router from './Router'
import Link from './Link'

/**
 * Function to fetch a route from the backend.
 * 
 * Uses the X-Requested-With header to tell to the 
 * backend that the route is loaded from an 'alive'
 * client.
 * 
 * The backend will respond with an object (json)
 * representation.
 * 
 * Returns the response data and the final url. The
 * fetch api follows the redirects, so we need to
 * update the url in the address bar if we got one.
 * 
 * @param {string} path
 */
async function fetchRoute (path) {
  const response = await fetch(path, {
    credentials: 'include', // for any cookies
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'ClientFetchRequest'
    }
  })

  return response.json()
}

export { Router, Link, fetchRoute }
