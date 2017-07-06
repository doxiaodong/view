import { addFloat } from './float'

function add(...args: string[]) {
  const isArgsInvalid = args.some((arg) => {
    if (typeof arg !== 'string') {
      return true
    }
    if (isNaN(+arg)) {
      return true
    }
  })

  if (isArgsInvalid) {
    throw new Error('args must be number like string')
  }

  return args.reduce((sum, value) => addFloat(sum, value), '0')
}

export default add
