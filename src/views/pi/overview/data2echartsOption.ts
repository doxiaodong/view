import * as moment from 'moment'

interface IIndicator {
  timestamp: string
  value: number
  unit: string
  name: string
}

export function data2echartsOption(data: IIndicator[]): ECharts.EChartOption {
  if (!Array.isArray(data)) {
    throw new Error('The Indictor data is must be array')
  }
  const { unit, name } = data[0] || { unit: '', name: '' }

  let option: ECharts.EChartOption = {
    title: {
      text: name,
      textStyle: {
        fontSize: 14
      },
      left: 'center'
    },
    grid: {
      top: 40,
      bottom: 20,
      left: 50
    },
    legend: {
      show: false
    },
    xAxis: {
      boundaryGap: false,
      data: data.map((v) => {
        return moment(v.timestamp).format('MM-DD')
      })
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: `{value}${unit}`
      },
      min: -3
    },
    series: [{
      type: 'line',
      lineStyle: {
        normal: {
          color: '#337ab7'
        }
      },
      data: data.map((v) => {
        return v.value
      }),
      label: {
        normal: {
          textStyle: {
            color: 'gray'
          },
          show: true,
          position: 'top',
          formatter: (param) => {
            const v = param.value
            if (v === -1) {
              return '数据未采集'
            }
            return `${v}${unit}`
          }
        }
      }
    }]
  }
  if (data.length === 0) {
    option = {
      // ...option,
      graphic: {
        type: 'text',
        top: 'middle',
        left: 'center',
        style: {
          text: '暂无图表数据',
          font: '16px "STHeiti", sans-serif'
        }
      }
    } as any
  }

  return option
}
