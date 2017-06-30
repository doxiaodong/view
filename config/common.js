const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')
const chalk = require('chalk')

const conf = require('./conf')
const { apps, entries } = require('./apps')
const polyfills = require('./polyfills')

module.exports = (option) => {
  const env = option.env
  const isProd = env === 'production'
  console.log('The current env: ', chalk.blue(env))
  const polyfillFiles = {}
  polyfills.forEach(({ name, path, hash, ext }) => {
    polyfillFiles[name] = isProd ? `${conf.publicPath}static/polyfill/${name}/${hash}.${ext}` : path.replace('./src', '')
  })
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
          ]
        }),

        exclude: [/global\.scss$/]
      }, {
        test: /\.pug$/,
        use: 'pug-loader'
      }]
    },
    plugins: apps.map((app) => {
      return new HtmlWebpackPlugin({
        template: `${entries[app]}/index.pug`,
        // template: `${entries[app].replace('tsc/', '')}/index.pug`,
        filename: `${app}/index.html`,
        chunks: ['base', app],
        minify: {
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true,
          removeComments: true
        },
        polyfill: polyfillFiles
      })
    }).concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'base',
        minChunks: Infinity
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      new ExtractTextPlugin(`static/[name]/[contenthash].css`),
      new CopyWebpackPlugin(
        polyfills.map(({ name, path, hash, ext }) => ({
          from: path,
          to: `static/polyfill/${name}/${hash}.${ext}`
        })).concat([{ from: 'src/favicon.ico', to: 'favicon.ico' },])
      )
    ])
  }
}


function postCssPlugins() {
  return [
    autoprefixer({
      browsers: ['last 2 version', '> 5%']
    })
  ]
}
