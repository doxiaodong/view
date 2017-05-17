const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const chalk = require('chalk')

const { apps, entries } = require('./apps')

module.exports = (option) => {
  const env = option.env
  const isProd = env === 'production'
  console.log('The current env: ', chalk.blue(env))
  return {
    entry: entries,
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        './src',
        'node_modules'
      ]
    },
    externals: {
      echarts: 'echarts',
      moment: 'moment'
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: 'ts-loader'
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: isProd
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postCssPlugins
            }
          },
          'sass-loader'
        ],

        exclude: [/global\.scss$/]
      }]
    },
    plugins: apps.map((app) => {
      return new HtmlWebpackPlugin({
        template: `${entries[app]}/index.html`,
        // template: `${entries[app].replace('tsc/', '')}/index.html`,
        filename: `${app}/index.html`,
        chunks: ['base', app]
      })
    }).concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'base',
        minChunks: Infinity
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      })
    ]),

    node: {
      global: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
}


function postCssPlugins() {
  return [
    autoprefixer({
      browsers: ['last 2 version', '> 5%']
    })
  ]
}
