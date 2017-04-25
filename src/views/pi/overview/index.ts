import * as echarts from 'echarts'
import { Message } from 'base/message'
import { data2echartsOption } from './data2echartsOption'

const message = new Message()
function init() {
  const chart = echarts.init(document.getElementById('main') as HTMLDivElement)
  setTimeout(() => {
    chart.resize()
  }, 100)
  chart.showLoading()

  message.subscribe((data) => {
    chart.hideLoading()
    if (!Array.isArray(data)) {
      data = []
    }
    const option = data2echartsOption(data)
    chart.setOption(option, true)
  })

  // message.mock([
  //   {
  //     'name': '开机率',
  //     'value': 80,
  //     'unit': '%',
  //     'timestamp': '2017-04-9 00:00:00'
  //   },
  //   {
  //     'name': '开机率',
  //     'value': -1,
  //     'unit': '%',
  //     'timestamp': '2017-04-10 00:00:00'
  //   },
  //   {
  //     'name': '开机率',
  //     'value': 30,
  //     'unit': '%',
  //     'timestamp': '2017-04-11 00:00:00'
  //   },
  //   {
  //     'name': '开机率',
  //     'value': 30,
  //     'unit': '%',
  //     'timestamp': '2017-04-12 00:00:00'
  //   }
  // ])

  console.log('webview init')
}

window.addEventListener('DOMContentLoaded', init)
