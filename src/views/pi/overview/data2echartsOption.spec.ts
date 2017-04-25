import { data2echartsOption } from './data2echartsOption'

describe('data2echartsOption test', () => {
  test('param data should be array', () => {
    expect(() => {
      data2echartsOption({} as any)
    }).toThrowError('The Indictor data is must be array')
  })

  test('empty data should return `graphic` key', () => {
    expect(data2echartsOption([])['graphic']).toBeDefined()
  })

  test('empty data should not return `graphic` key', () => {
    expect(data2echartsOption([{
      timestamp: '2017-04-07',
      value: 20,
      unit: '%',
      name: '开机率'
    }])['graphic']).toBeUndefined()
  })
})
