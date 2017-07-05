import add from '.'

describe('addInt', () => {
  test('normal', () => {
    expect(add('1')).toBe('1')
    expect(add('1', '1')).toBe('2')
    expect(add('.1', '1', '1')).toBe('2.1')
    expect(add('1', '1', '-1.8')).toBe('0.2')
  })
})
