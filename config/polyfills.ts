import * as MD5 from 'md5-file'

const polyfills = [
  {
    name: 'echarts',
    path: './src/polyfill/echarts.min.js',
    hash: MD5.sync('./src/polyfill/echarts.min.js'),
    ext: 'min.js'
  }
]

export default polyfills
