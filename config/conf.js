const path = require('path')
const rootDir = path.resolve(__dirname, '..')
const abs = p => path.resolve(rootDir, p)

module.exports = {
  paths: {
    root: rootDir,
    src: abs('src'),
    dist: abs('dist')
  }
}
