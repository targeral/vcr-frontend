<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
  import props from './props'
  export default {
    name: 'flex',
    data () {
      return {
        prefixCls: 'vcr-flexbox'
      }
    },
    props: {
      direction: props.direction,
      wrap: props.wrap,
      justify: props.justify,
      align: props.align,
      alignContent: props.alignContent
    },
    computed: {
      className () {
        return [
          this.dirCls,
          this.wrapCls,
          this.justifyCls,
          this.alignCls,
          this.alignContentCls
        ]
      },
      dirCls () {
        let { prefixCls, direction } = this
        return {
          [`${prefixCls}-dir-row`]: direction === 'row',
          [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
          [`${prefixCls}-dir-column`]: direction === 'column',
          [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse'
        }
      },
      wrapCls () {
        let { prefixCls, wrap } = this
        return {
          [`${prefixCls}-nowrap`]: wrap === 'nowrap',
          [`${prefixCls}-wrap`]: wrap === 'wrap',
          [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse'
        }
      },
      justifyCls () {
        let { prefixCls, justify } = this
        return {
          [`${prefixCls}-justify-start`]: justify === 'start',
          [`${prefixCls}-justify-end`]: justify === 'end',
          [`${prefixCls}-justify-center`]: justify === 'center',
          [`${prefixCls}-justify-between`]: justify === 'between',
          [`${prefixCls}-justify-around`]: justify === 'around'
        }
      },
      alignCls () {
        let { prefixCls, align } = this
        return {
          [`${prefixCls}-align-start`]: align === 'start',
          [`${prefixCls}-align-center`]: align === 'center',
          [`${prefixCls}-align-end`]: align === 'end',
          [`${prefixCls}-align-baseline`]: align === 'baseline',
          [`${prefixCls}-align-stretch`]: align === 'stretch'
        }
      },
      alignContentCls () {
        let { prefixCls, alignContent } = this
        return {
          [`${prefixCls}-align-content-start`]: alignContent === 'start',
          [`${prefixCls}-align-content-end`]: alignContent === 'end',
          [`${prefixCls}-align-content-center`]: alignContent === 'center',
          [`${prefixCls}-align-content-between`]: alignContent === 'between',
          [`${prefixCls}-align-content-around`]: alignContent === 'around',
          [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch'
        }
      }
    }
  }
</script>