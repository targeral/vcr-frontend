import { isString } from '../../utils'

const VALUE = [
  'horizontal',
  'vertical'
]

const DEFAULT = 'horizontal'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
