const fs = require('fs')
const path = require('path')
const incstr = require('incstr')

const MAP_NAMES = path.resolve(__dirname, '../dist/cssmodules.json')
const MAP_EXISTS = fs.existsSync(MAP_NAMES)

const idGenerator = () => {
  const index = MAP_EXISTS
    ? JSON.parse(fs.readFileSync(MAP_NAMES))
    : {}

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789'
  })

  process.on('exit', () => {
    fs.writeFileSync(MAP_NAMES, JSON.stringify(index, null, 2))
  })

  return (name) => {
    if (index[name]) {
      return index[name]
    }

    do {
      // Class name cannot start with a number.
      index[name] = generateNextId()
    } while (/^[0-9]/.test(index[name]))

    return index[name]
  }
}

const generator = idGenerator()

module.exports = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1)

  return process.env.NODE_ENV === 'production'
    ? generator(componentName) + '_' + generator(localName)
    : `${componentName}_${localName}`
}
