
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import uncss from 'uncss'
import Semaphore from 'semaphore-async-await'

import config from '../../../../config'

const criticalEnabled = config.get('server.criticalCSSEnabled')
const bundlesDir = config.get('server.bundles.directory')
const assets = JSON.parse(config.get('server.bundles.assets'))

let cssRaw
if (criticalEnabled && assets.app.css) {
  const cssPath = path.resolve(bundlesDir, assets.app.css)
  cssRaw = fs.readFileSync(cssPath, 'utf8')
}

// A cache map of previously extrated css
const cache = {}

// A map of semaphore locks
// (only 1 per page key can generate
// the css)
const locks = {}

const uncssAsync = promisify(uncss)

async function extractCSS (key, content) {
  if (!criticalEnabled || !key) {
    return null
  }

  if (cache[key]) {
    // Previously tried to extract a critical CSS
    // and got an error. Don't try again.
    // Else returns the result
    return cache[key] === 'errored' ? null : cache[key]
  }

  // Set a semaphore lock for this key
  if (!locks[key]) {
    locks[key] = new Semaphore(1)
  }

  await locks[key].acquire()

  if (cache[key]) {
    // If another request was blocked because a
    // previous one was used to generate the
    // critical CSS
    locks[key].release()
    return cache[key] === 'errored' ? null : cache[key]
  }

  // Extract the critical css
  try {
    cache[key] = await uncssAsync(`<html><body>${content}</body></html>`, { raw: cssRaw })
  } catch (e) {
    cache[key] = 'errored'
  }

  // Release the lock
  locks[key].release()

  return cache[key]
}

export default extractCSS
