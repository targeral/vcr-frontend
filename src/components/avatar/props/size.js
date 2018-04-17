import { isString } from '../../utils'

const VALUE = [
  'large',
  'small',
  'default'
]

const validator = value => isString(value) && VALUE.includes(value)

const DEFAULT = 'default'

export default {
  validator,
  default: DEFAULT
}
