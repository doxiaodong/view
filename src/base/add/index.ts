import { addInt } from './int'
import { addFloat } from './float'

export function add(a: string, b: string) {
  const isFloat = a.indexOf('.') !== -1 || b.indexOf('.') !== -1
  if (isFloat) {
    return addFloat(a, b)
  }
  return addInt(a, b)
}
