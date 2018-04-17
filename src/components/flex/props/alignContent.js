import { isString } from '../../utils'

const VALUE = [
  'start',
  'end',
  'center',
  'between',
  'around',
  'stretch'
]

const DEFAULT = 'stretch'

const validator = (value) => {
  return isString(value) && VALUE.includes(value)
}

export default {
  validator,
  default: DEFAULT
}
