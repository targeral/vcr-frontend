import { isString } from '../../utils'

const VALUE = [
  'start',
  'center',
  'end',
  'baseline',
  'stretch'
]

const DEFAULT = 'center'

const validator = (value) => {
  return isString(value) && VALUE.includes(value)
}

export default {
  validator,
  default: DEFAULT
}
