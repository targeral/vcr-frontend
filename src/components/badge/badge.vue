<template>
  <span :class="badgeCls">
    <slot></slot>
    <sup 
      v-if="text || dot"
      :class="scrollNumberCls"
    >
      {{ _text }}
    </sup>
  </span> 
</template>

<script>
  import props from './props'
  export default {
    name: 'badge',
    data () {
      return {
        prefixCls: 'vcr-badge'
      }
    },
    props: {
      size: props.size,
      text: [String, Number],
      corner: {
        type: Boolean,
        default () {
          return false
        }
      },
      dot: {
        type: Boolean,
        default () {
          return false
        }
      },
      overflowCount: {
        type: Number,
        default () {
          return 99
        }
      },
      hot: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    computed: {
      scrollNumberCls () {
        return {
          [`${this.prefixCls}-dot`]: this.dot,
          [`${this.prefixCls}-dot-large`]: this.dot && (this.size === 'large'),
          [`${this.prefixCls}-text`]: !this.dot && !this.corner,
          [`${this.prefixCls}-corner`]: this.corner,
          [`${this.prefixCls}-corner-large`]: this.corner && (this.size === 'large')
        }
      },
      badgeCls () {
        const prefixCls = this.prefixCls
        return [
          prefixCls,
          {
            [`${prefixCls}-not-a-wrapper`]: !this.hasSlot,
            [`${prefixCls}-corner-wrapper`]: this.corner,
            [`${prefixCls}-hot`]: !!this.hot,
            [`${prefixCls}-corner-wrapper-large`]: this.corner && (this.size === 'large')
          }
        ]
      },
      hasChildren () {
        let slotKeys = Object.keys(this.$slots.default)
        return slotKeys.length > 0
      },
      _text () {
        if (this.dot) {
          return ''
        }
        return typeof this.text === 'number' && this.text > this.overflowCount ? `${this.overflowCount}+` : this.text
      }
    }
  }
</script>