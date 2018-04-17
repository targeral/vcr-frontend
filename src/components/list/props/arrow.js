import { isString } from '../../utils'

const VALUE = [
  'horizontal',
  'up',
  'down',
  'empty',
  ''
]

const DEFAULT = ''

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
