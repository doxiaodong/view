const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const commonConfig = require('./common')
const conf = require('./conf')

const ENV = process.env.ENV = process.env.NODE_ENV = 'development'

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'eval',
  output: {
    path: conf.paths.dist,
    filename: '[name]/bundle.js',
    sourceMapFilename: '[name]/map',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    hot: true,
    port: 54321,
    host: '0.0.0.0',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: conf.paths.src
  }
})
