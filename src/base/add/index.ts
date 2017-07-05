import { addFloat } from './float'

function add(...args: string[]) {
  // TODO: check args isNamberString[]
  return args.reduce((sum, value) => addFloat(sum, value), '0')
}

export default add
