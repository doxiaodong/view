import { addInt } from './int'

export function addFloat(a: string, b: string) {
  const aIsNegative = a[0] === '-'
  const bIsNegative = b[0] === '-'

  if (a.indexOf('.') === -1) {
    a += '.0'
  }
  if (b.indexOf('.') === -1) {
    b += '.0'
  }

  const aArr = a.split('.')
  const bArr = b.split('.')

  let retInt = addInt(aArr[0], bArr[0])

  let fa = aArr[1]
  let fb = bArr[1]

  const lenFa = fa.length
  const lenFb = fb.length
  const willAddZeros = Math.abs(lenFa - lenFb)
  let zeros = ''
  for (let i = 0; i < willAddZeros; i++) {
    zeros += '0'
  }
  if (lenFa > lenFb) {
    fb += zeros
  }
  if (lenFa < lenFb) {
    fa += zeros
  }

  fa = (aIsNegative ? '-1' : '1') + fa
  fb = (bIsNegative ? '-1' : '1') + fb

  let retFloat = addInt(fa, fb, 15, true)

  retFloat = retFloat.replace(/0+$/, '')
  const retFloatIsNegative = retFloat[0] === '-'

  retFloat = retFloat.replace(/^-/, '')
  const first = retFloat[0]

  // console.log(retFloat)
  retFloat = retFloat.slice(1)

  // 小数部分是负数则向整数部分借 1
  if (retFloatIsNegative) {
    retInt = addInt(retInt, '-1')
  }

  // 3 = 1 + 1 + 1
  if (first === '3') {
    retInt = addInt(retInt, (aIsNegative ? '-1' : '1'))
  }

  const retIntIsNegative = retInt[0] === '-'

  // 整数部分是负数表示没东西借给小数部分，所以收回来
  if (retIntIsNegative) {
    retInt = addInt(retInt, '1')
    if (retInt === '0') {
      retInt = '-' + retInt
    }
  }

  // 整数和小数部分不同符号则反转小数部分
  const floatBack = (retFloatIsNegative && !retIntIsNegative) || (!retFloatIsNegative && retIntIsNegative)

  if (floatBack) {
    const l = retFloat.length
    let shadowRetFloat = ''
    for (let i = 0; i < l - 1; i++) {
      shadowRetFloat += 9 - +retFloat[i]
    }
    shadowRetFloat += 10 - +retFloat[l - 1]

    retFloat = shadowRetFloat
  }

  if (retFloat !== '') {
    retFloat = '.' + retFloat
  }

  return retInt + retFloat
}
