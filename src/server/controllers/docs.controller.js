
import fs from 'fs'
import path from 'path'
import util from 'util'
import marked from 'marked'
import highlight from 'highlight.js'

import config from '../../../config'
import capitalize from '../helpers/capitalize'

import DocsComponent from '../../client/containers/Docs'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => highlight.highlightAuto(code).value,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

const markedSection = {} // markdowns cache
const stat = util.promisify(fs.stat)
const readFile = util.promisify(fs.readFile)

async function index (ctx, next) {
  const section = ctx.params.section || 'introduction'

  if (!config.get('docs.cache') || !markedSection[section]) {
    // read and compile the file if not cached
    // or cache is disabled (dev)
    const filepath = path.join(config.get('docs.path'), `${section}.md`)

    try {
      // check if file exist first
      await stat(filepath)
    } catch (e) {
      ctx.status = 404
      return next()
    }

    const content = await readFile(filepath, {encoding: 'utf8'})
    markedSection[section] = marked(content)
  }

  // request cache
  ctx.cache.control = 'public'

  // metadata title && component/props
  const sectionTitle = capitalize(section.replace(/-/g, ' '), true)
  ctx.state.context.metadata.title = `${sectionTitle} | Pure Server Router`

  ctx.state.context.container.component = DocsComponent
  ctx.state.context.container.props = {
    content: markedSection[section]
  }

  next()
}

export default { index }
