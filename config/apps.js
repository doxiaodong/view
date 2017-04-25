const path = require('path')
const conf = require('./conf')

const route = require(path.resolve(conf.paths.src, 'route.json'))

const apps = Object.keys(route)
const entries = route
apps.forEach((app) => {
  entries[app] = './src/views' + entries[app]
})

exports.apps = apps
exports.entries = entries
