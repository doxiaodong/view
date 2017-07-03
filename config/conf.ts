import * as path from 'path'

const rootDir = path.resolve(__dirname, '../..')
const abs = (p: string) => path.resolve(rootDir, p)

export default {
  paths: {
    root: rootDir,
    src: abs('src'),
    dist: abs('dist')
  },
  publicPath: '/'
}
