const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const commonConfig = require('./common')
const conf = require('./conf')

const ENV = process.env.ENV = process.env.NODE_ENV = 'production'

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'source-map',
  output: {
    path: conf.paths.dist,
    filename: 'static/[name]/[chunkhash].js',
    sourceMapFilename: 'static/[name]/[chunkhash].map',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      }
    })
  ]
})
