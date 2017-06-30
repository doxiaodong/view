const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const BabiliPlugin = require("babili-webpack-plugin")

const commonConfig = require('./common')
const conf = require('./conf')

const ENV = process.env.ENV = process.env.NODE_ENV = 'production'

module.exports = webpackMerge(commonConfig({ env: ENV }), {
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
