import * as path from 'path'
import conf from './conf'

const route: { [key: string]: string } = require(path.resolve(conf.paths.src, 'route.json'))

const apps = Object.keys(route)
const entries = route
apps.forEach((app) => {
  entries[app] = './src/views' + entries[app]
  // entries[app] = './tsc/src/views' + entries[app]
})

export {
  apps,
  entries
}
