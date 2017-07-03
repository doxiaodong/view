import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'
import * as BabiliPlugin from 'babili-webpack-plugin'

import commonConfig from './common'
import conf from './conf'

const env = process.env.ENV = process.env.NODE_ENV = 'production'

export default webpackMerge(commonConfig({ env }), {
  devtool: 'source-map',
  output: {
    path: conf.paths.dist,
    filename: 'static/[name]/[chunkhash].js',
    sourceMapFilename: 'static/[name]/[chunkhash].map',
    publicPath: conf.publicPath
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new BabiliPlugin()
  ],
  node: false
})
