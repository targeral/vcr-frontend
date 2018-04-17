<template>
  <svg :class="cls">
    <use :xlink-href="xlinkHref"></use>
  </svg>  
</template>
<script>
  import props from './props'
  import loadScript from './loadScript'

  export default {
    name: 'vcr-icon',
    props: {
      size: props.size,
      type: String,
      color: {
        type: String,
        default: '#000'
      }
    },
    computed: {
      cls () {
        return [
          'vcr-icon',
          `vcr-icon-${this.type}`,
          `vcr-icon-${this.size}`
        ]
      },
      xlinkHref () {
        return `#${this.type}`
      }
    },
    mounted () {
      loadScript()
    }
  }
</script>
