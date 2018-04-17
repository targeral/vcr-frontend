import { isString } from '../../utils'

const VALUE = [
  'top',
  'middle',
  'buttom'
]

const DEFAULT = 'middle'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
