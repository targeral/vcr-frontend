<template>
  <div
    :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        prefix: 'vcr-card'
      }
    },
    computed: {
      classes () {
        return `${this.prefix}-grid`
      }
    }
  }
</script>
