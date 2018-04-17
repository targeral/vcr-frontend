import { isString } from '../../utils'

const VALUE = [
  'xxs',
  'xs',
  'sm',
  'md',
  'lg'
]

const validator = value => isString(value) && VALUE.includes(value)

const DEFAULT = 'md'

export default {
  validator,
  default: DEFAULT
}
