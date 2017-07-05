import { addInt } from './int'

describe('add int', () => {
  test('normal', () => {
    expect(addInt('1', '1')).toBe('2')
    expect(addInt('1', '-1')).toBe('0')
    expect(addInt('-1', '1')).toBe('0')
    expect(addInt('-1', '-1')).toBe('-2')
    expect(addInt('11', '23')).toBe('34')
    expect(addInt('111', '-23')).toBe('88')
    expect(addInt('11', '-23')).toBe('-12')
    expect(addInt('31', '-23')).toBe('8')
    expect(addInt('-312', '121')).toBe('-191')
    expect(addInt('-2', '1')).toBe('-1')
  })
  test('big', () => {
    expect(addInt('111', '129', 2)).toBe('240')
    expect(addInt('111', '190', 2)).toBe('301')
    expect(addInt('17111', '3990', 2)).toBe('21101')
    expect(addInt('31', '-23', 1)).toBe('8')
    expect(addInt('-312', '124')).toBe('-188')
    expect(addInt('-312', '121', 1)).toBe('-191')
  })
  test('big than Infinity', () => {
    expect(addInt('9007199254740992', '1')).toBe('9007199254740993')
    expect(addInt('-9007199254740994', '1')).toBe('-9007199254740993')
  })
})
