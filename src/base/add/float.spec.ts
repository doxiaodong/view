import { addFloat } from './float'

describe('addFloat', () => {
  test('normal', () => {
    expect(addFloat('1', '1')).toBe('2')
    expect(addFloat('1.1', '1')).toBe('2.1')
    expect(addFloat('0.1', '0.12')).toBe('0.22')
    expect(addFloat('0.1', '0.92')).toBe('1.02')
    expect(addFloat('0.12', '0.9')).toBe('1.02')
    expect(addFloat('0.08', '0.92')).toBe('1')

    expect(addFloat('0.08', '-0.92')).toBe('-0.84')
    expect(addFloat('-1.08', '0.92')).toBe('-0.16')

    expect(addFloat('-1.11', '-0.92')).toBe('-2.03')
    expect(addFloat('1.99', '-1.92')).toBe('0.07')
  })

  test('float back', () => {
    expect(addFloat('1.09', '-0.92')).toBe('0.17')
    expect(addFloat('1.99', '-2.920')).toBe('-0.93')

    expect(addFloat('1.99', '-2.921')).toBe('-0.931')
    expect(addFloat('1.991', '-2.92')).toBe('-0.929')
  })

  test('big than Infinity', () => {
    expect(addFloat('9007199254740992.9007199254740992', '1')).toBe('9007199254740993.9007199254740992')
    expect(addFloat('-9007199254740994.9007199254740992', '1')).toBe('-9007199254740993.9007199254740992')
  })

  test('random', () => {
    const arr = []
    for (let i = 0; i < 10000; i++) {
      arr.push([randomFloat(), randomFloat()])
    }

    arr.forEach((item) => {
      expect(addFloat(item[0], item[1])).toBe(
        (+item[0] * 1000 + +item[1] * 1000 as any).toFixed(0) / 1000 + ''
      )
    })
  })
})

function randomFloat() {
  return (Math.random() * 100000).toFixed(3)
}
