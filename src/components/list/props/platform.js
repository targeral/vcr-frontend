import { isString } from '../../utils'

const VALUE = [
  'android',
  'ios',
  'cross'
]

const DEFAULT = 'cross'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
