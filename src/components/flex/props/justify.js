import { isString } from './utils'

const VALUE = [
  'start',
  'end',
  'center',
  'between',
  'around'
]

const DEFAULT = 'start'

const validator = (value) => {
  return isString(value) && VALUE.includes(value)
}

export default {
  validator,
  default: DEFAULT
}
