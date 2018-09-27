<script>
  import { getPxStyle, getTransformPropValue } from './util'
  export default {
    name: 'tab-pane',
    render: function (h) {
      return h('div', {
        ref: 'layout',
        style: this.style
      }, [this.tabCache])
    },
    data () {
      return {
        offsetX: 0,
        offstY: 0
      }
    },
    props: {
      fixX: {
        type: Boolean,
        default: true
      },
      fixY: {
        type: Boolean,
        default: true
      },
      active: Boolean,
      tabCache: Object
    },
    computed: {
      style () {
        return {
          ...this.fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {},
          ...this.fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {}
        }
      }
    },
    watch: {
      active (active) {
        if (active) {
          this.offsetX = 0
          this.offsetY = 0
        } else {
          this.offsetX = this.$refs.layout.scrollLeft
          this.offsetY = this.$refs.layout.scrollTop
        }
      }
    }
  }
</script>