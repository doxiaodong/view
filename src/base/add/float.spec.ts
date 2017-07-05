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
})
