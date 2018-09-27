import { isString } from '../../utils'

const VALUE = [
  'top',
  'bottom',
  'left',
  'right'
]

const DEFAULT = 'top'

const validator = value => isString(value) && VALUE.includes(value)

export default {
  validator,
  default: DEFAULT
}
