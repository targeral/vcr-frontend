<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'flex-item',
    data () {
      return {
        prefixCls: 'vcr-flexbox'
      }
    },
    computed: {
      className () {
        return [`${this.prefixCls}-item`]
      }
    }
  }
</script>
