<template>
  <div
    @click="onClick"
    :class="wrapCls"
  >
    <div
      v-if="thumb"
      :class="`${prefixCls}-thumb`"
    >
      <img :src="thumb" />
    </div>
    <div :class="lineCls">
      <div 
        v-if="hasSlot"
        :class="`${prefixCls}-content`"
      >
        <slot></slot>
      </div>
      <div
        v-if="extraEnable"
        :class="`${prefixCls}-extra`"
      >
        <slot
          name="extra"
        >
          {{ extra }}
        </slot>
      </div>
      <div
        v-if="arrow"
        :class="arrowCls"
        aria-hidden="true" 
      ></div>
    </div>
    <div :style="coverRippleStyle" :class="rippleCls"></div>
  </div>
</template>

<script>
  import props from './props'
  export default {
    name: 'list-item',
    data () {
      return {
        prefixCls: 'vcr-list',
        RippleClicked: false,
        coverRippleStyle: { display: 'none' },
        debounceTimeout: null
      }
    },
    props: {
      align: props.align,
      arrow: props.arrow,
      platform: props.platform,
      thumb: String,
      extra: String,
      error: {
        type: Boolean,
        default () {
          return false
        }
      },
      multipleLine: {
        type: Boolean,
        default () {
          return false
        }
      },
      wrap: {
        type: Boolean,
        default () {
          return false
        }
      },
      activeStyle: Object,
      disabled: Boolean
    },
    computed: {
      wrapCls () {
        const prefixCls = `${this.prefixCls}-item`
        return [
          prefixCls,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-error`]: this.error,
            [`${prefixCls}-top`]: this.align === 'top',
            [`${prefixCls}-middle`]: this.align === 'middle',
            [`${prefixCls}-bottom`]: this.align === 'bottom'
          }
        ]
      },
      rippleCls () {
        const prefixCls = `${this.prefixCls}-ripple`
        return [
          prefixCls,
          {
            [`${prefixCls}-animate`]: this.RippleClicked
          }
        ]
      },
      lineCls () {
        const prefixCls = `${this.prefixCls}-line`
        return [
          prefixCls,
          {
            [`${prefixCls}-multiple`]: this.multipleLine,
            [`${prefixCls}-wrap`]: this.wrap
          }
        ]
      },
      arrowCls () {
        const prefixCls = `${this.prefixCls}-arrow`
        return [
          prefixCls,
          {
            [`${prefixCls}-horizontal`]: this.arrow === 'horizontal',
            [`${prefixCls}-vertical`]: this.arrow === 'down' || this.arrow === 'up',
            [`${prefixCls}-vertical-up`]: this.arrow === 'up'
          }
        ]
      },
      extraEnable () {
        console.log(this.extra, this.$slots)
        return this.extra !== undefined || this.$slots.extra !== undefined
      },
      hasSlot () {
        let slotKeys = Object.keys(this.$slots)
        return slotKeys.length > 0
      }
    },
    methods: {
      onClick (ev) {
        console.log(ev.currentTarget)
        const { platform } = this
        const isAndroid = platform === 'android'
        if (isAndroid) {
          if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout)
            this.debounceTimeout = null
          }
          let Item = ev.currentTarget
          let RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth)
          const ClientRect = ev.currentTarget.getBoundingClientRect()
          console.log(ev.clientX, ClientRect.left, Item.offsetWidth)
          let pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2
          let pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2
          const coverRippleStyle = {
            width: `${RippleWidth}px`,
            height: `${RippleWidth}px`,
            left: `${pointX}px`,
            top: `${pointY}px`
          }
          this.coverRippleStyle = coverRippleStyle
          this.RippleClicked = true

          this.$nextTick(() => {
            this.debounceTimeout = setTimeout(() => {
              this.coverRippleStyle = { display: 'none' }
              this.RippleClicked = false
            }, 1000)
          })
        }
        this.$emit('onClick')
      }
    }
  }
</script>