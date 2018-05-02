import { isString } from '../../utils'

const VALUE = [
  'up',
  'down'
]

const DEFAULT = 'down'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
