export function addInt(a: string, b: string, maxLength = 15) {
  let aIsNegative = a[0] === '-'
  let bIsNegative = b[0] === '-'

  const bothNegative = aIsNegative && bIsNegative
  let retIsNegative = bothNegative
  if (aIsNegative) {
    a = a.slice(1)
  }
  if (bIsNegative) {
    b = b.slice(1)
  }

  if (bothNegative) {
    aIsNegative = false
    bIsNegative = false
  }

  return removeUnuseZero(add(a, b), retIsNegative)

  function add(pa, pb, ret = '', nextAdd = 0): string {
    const lenA = pa.length
    const lenB = pb.length

    const ia = pa.slice(-maxLength, lenA)
    const ib = pb.slice(-maxLength, lenB)
    const len = Math.max(ia.length, ib.length)
    const one = Math.pow(10, len)

    let iab = (aIsNegative ? -ia : +ia) + (bIsNegative ? -ib : +ib) + nextAdd

    nextAdd = 0

    if (iab > one) {
      nextAdd = 1
      iab -= one
    }

    if (iab > 0) {
      iab = iab + one
      iab = (iab + '').slice(1) as any // special iab string
    }

    const nextA = pa.slice(0, -maxLength)
    const nextB = pb.slice(0, -maxLength)
    const shouldContinue = nextA.length > 0 || nextB.length > 0

    if (iab < 0) {
      nextAdd = -1
      iab += one
    }

    ret = iab + ret

    if (shouldContinue) {
      return add(nextA, nextB, ret, nextAdd)
    }

    // 处理相减后值为 负数 的情况
    // 对应规则为 19920122 -> 80079878
    if (nextAdd === -1) {
      retIsNegative = true

      let checkRet = ''
      const l = ret.length

      if (l > 1) {
        for (let i = 0; i < l - 1; i++) {
          checkRet += 9 - +ret[i]
        }
      }
      checkRet += 10 - +ret[l - 1]

      ret = checkRet
    }
    return ret
  }
}

function removeUnuseZero(str: string, addNegative: boolean): string {
  let ret = str.replace(/^0+/, '')
  if (ret === '') {
    ret = '0'
  }

  if (addNegative && ret !== '0') {
    ret = '-' + ret
  }
  return ret
}
