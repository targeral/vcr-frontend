import { isString } from './utils'

const VALUE = [
  'row',
  'row-reverse',
  'column',
  'column-reverse'
]

const DEFAULT = 'row'

const validator = (value) => {
  return isString(value) && VALUE.includes(value)
}

export default {
  validator,
  default: DEFAULT
}
