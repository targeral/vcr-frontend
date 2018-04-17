import { isString } from '../../utils'

const VALUE = [
  'circle', 'square'
]

const validator = value => isString(value) && VALUE.includes(value)

const DEFAULT = 'circle'

export default {
  validator,
  default: DEFAULT
}
