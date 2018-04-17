import { isString } from '../../utils'

const VALUE = [
  'large',
  'small'
]

const DEFAULT = 'small'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
