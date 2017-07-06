import add from '.'

describe('addInt', () => {
  test('normal', () => {
    expect(add()).toBe('0')
    expect(add('1')).toBe('1')
    expect(add('1', '1')).toBe('2')
    expect(add('.1', '1', '1')).toBe('2.1')
    expect(add('1', '1', '-1.8')).toBe('0.2')
  })

  test('args', () => {
    expect(
      () => {
        add(1 as any)
      }
    ).toThrowError('args must be number like string')
    expect(
      () => {
        add('asd')
      }
    ).toThrowError('args must be number like string')
    expect(
      () => {
        add('1.1.2')
      }
    ).toThrowError('args must be number like string')
  })
})
