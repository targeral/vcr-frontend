<template>
  <form
    @submit="onSubmit"
    :class="wrapCls"
    ref="inputContainerRef"
    action="#"
  >
    <div :class="`${prefixCls}-input`">
      <div :class="`${prefixCls}-synthetic-ph`" ref="syntheticPhRef">
        <span :class="`${prefixCls}-synthetic-ph-container`" ref="syntheticPhContainerRef">
          <i :class="`${prefixCls}-synthetic-ph-icon`"></i>
          <span
            :class="`${prefixCls}-synthetic-ph-placeholder`"
            :style="{ visibility: placeholderVisible ? 'visible' : 'hidden' }"
          >
            {{ placeholder }}
          </span>
        </span>
      </div>
      <input
        type="search"
        :class="`${prefixCls}-value`"
        v-model="value_"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        ref="inputRef"
        :maxlength="maxLength"
      />
      <a @click="onClear" :class="clearCls" />
    </div>
    <div :class="cancelCls" @click="onCancel" ref="rightBtnRef">
      {{ cancelText }}
    </div>
  </form>
</template>

<script>
  // https://github.com/kilohaty/v-feedback
  // https://segmentfault.com/a/1190000006864910
  export default {
    name: 'search-bar',
    data () {
      return {
        prefixCls: 'vcr-search',
        isfocus: false,
        blurFromOnClear: false,
        value_: ''
      }
    },
    props: {
      defaultValue: String,
      value: String,
      placeholder: String,
      maxLength: Number,
      showCancelButton: {
        type: Boolean,
        default () {
          return false
        }
      },
      cancelText: {
        type: String,
        default () {
          return '取消'
        }
      },
      disabled: {
        type: Boolean,
        default () {
          return false
        }
      }
    },
    computed: {
      placeholderVisible () {
        return this.placeholder && !this.value_
      },
      wrapCls () {
        // 优先级：&& > ||
        let prefixCls = this.prefixCls
        return [
          prefixCls,
          {
            [`${prefixCls}-start`]: !!(this.isfocus || (this.value_ && this.value_.length > 0))
          }
        ]
      },
      clearCls () {
        let prefixCls = `${this.prefixCls}-clear`
        return [
          prefixCls,
          {
            [`${prefixCls}-show`]: !!(this.isfocus && this.value_ && this.value_.length > 0)
          }
        ]
      },
      cancelCls () {
        let prefixCls = `${this.prefixCls}-cancel`
        return [
          prefixCls,
          {
            [`${prefixCls}-show`]: this.showCancelButton || this.isfocus || (this.value_ && this.value_.length > 0),
            [`${prefixCls}-anim`]: this.firstFocus
          }
        ]
      }
    },
    methods: {
      onSubmit (e) {
        e.preventDefault()
        this.$refs.inputRef.blur()
        this.$emit('onSubmit', this.value_)
      },
      onChange (e) {
        console.log('change', e)
        if (!this.isfocus) {
          this.isfocus = true
        }
        const value = e.target.value
        if (!(this.value !== undefined)) {
          this.value_ = value
        }
        this.$emit('onChange', this.value_)
      },
      onFocus () {
        this.isfocus = true
        this.firstFocus = true
        this.$emit('onFocus', this.value_)
      },
      onBlur () {
        console.log('blur', this.blurFromOnClear)
        this.onBlurTimeout = setTimeout(() => {
          if (!this.blurFromOnClear) {
            if (document.activeElement !== this.$refs.inputRef) {
              this.isfocus = false
            }
          }
          this.blurFromOnClear = false
        }, 50)
        this.$emit('onBlur')
      },
      onCancel () {
        this.doClear(false)
        this.$emit('onCancel', this.value_)
      },
      onClear () {
        this.doClear()
      },
      doClear (blurFromOnClear = true) {
        this.blurFromOnClear = blurFromOnClear
        if (!(this.value !== undefined)) {
          this.value_ = ''
        }
        this.$emit('onClear', '')
        this.$emit('onChange', '')
        if (blurFromOnClear) {
          this.focus()
        }
      },
      focus () {
        this.$refs.inputRef.focus()
      },
      updateDom () {
        const realWidth = this.$refs.syntheticPhContainerRef.getBoundingClientRect().width // 包含小数
        if (this.$refs.inputContainerRef.className.indexOf(`${this.prefixCls}-start`) > -1) {
          this.$refs.syntheticPhRef.style.width = `${Math.ceil(realWidth)}px`
          if (!this.showCancelButton) {
            this.$refs.rightBtnRef.style.marginRight = 0
          }
        } else {
          this.$refs.syntheticPhRef.style.width = '100%'
          if (!this.showCancelButton) {
            this.$refs.rightBtnRef.style.marginRight =
              `-${this.$refs.rightBtnRef.offsetWidth + parseInt(this.rightBtnInitMarginleft, 10)}px`
          }
        }
      }
    },
    beforeMount () {
      if (this.value !== undefined) {
        this.value_ = this.value
      } else if (this.defaultValue !== undefined) {
        this.value_ = this.defaultValue
      } else {
        this.value_ = ''
      }
    },
    mounted () {
      const initBtn = window.getComputedStyle(this.$refs.rightBtnRef)
      this.rightBtnInitMarginleft = initBtn['margin-left']
      console.log('mounted')
      this.updateDom()
    },
    updated () {
      console.log('updated')
      // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
      // offsetWidth 某些时候是向上取整，某些时候是向下取整，不能用
      this.updateDom()
    },
    destroyed () {
      if (this.onBlurTimeout) {
        clearTimeout(this.onBlurTimeout)
        this.onBlurTimeout = null
      }
    }
  }
</script>