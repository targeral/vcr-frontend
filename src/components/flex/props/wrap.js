import { isString } from './utils'

const VALUE = [
  'nowrap',
  'wrap',
  'wrap-reverse'
]

const DEFAULT = 'nowrap'

const validator = (value) => {
  return isString(value) && VALUE.includes(value)
}

export default {
  validator,
  default: DEFAULT
}
