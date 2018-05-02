import { isString } from '../../utils'

const VALUE = [
  'dark',
  'light'
]

const DEFAULT = 'dark'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
