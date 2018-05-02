<template>
  <div :class="classname">
    <div :class="`${prefixCls}-left`" role="button" @click="onLeftClick">
      <span
        v-if="showIcon"
        :class="`${prefixCls}-left-icon`"
        aria-hidden="true"
      >
        <slot name="icon">{{ icon }}</slot>
      </span>
      {{ leftContent }}
    </div>
    <div :class="`${prefixCls}-title`"><slot></slot></div>
    <div :class="`${prefixCls}-right`"><slot name="rightContent">{{ rightContent }}</slot></div>
  </div>
</template>

<script>
  import props from './props'
  export default {
    name: 'vcr-navbar',
    data () {
      return {
        prefixCls: 'vcr-navbar'
      }
    },
    props: {
      mode: props.mode,
      icon: String,
      leftContent: String,
      rightContent: String
    },
    computed: {
      classname () {
        return [
          this.prefixCls,
          `${this.prefixCls}-${this.mode}`
        ]
      },
      showIcon () {
        return this.icon !== undefined || this.$slots.icon !== undefined
      }
    },
    methods: {
      onLeftClick () {
        this.$emit('onLeftClick')
      }
    }
  }
</script>