<template>
  <pullToRefresh
    :prefixCls="prefixCls"
    :direction="direction"
    :distanceToRefresh="distanceToRefresh"
    :refreshing="refreshing"
    :indicator="indicator"
    @onRefresh="onRefresh"
  >
    <slot name="activate" slot="activate">
    </slot>
    <slot name="deactivate" slot="deactivate">
    </slot>
    <slot name="finish" slot="finish">
    </slot>
    <slot></slot>
    <slot name="release" slot="release">
      <Icon slot="release" type="loading"></Icon>
    </slot>
  </pullToRefresh>
</template>

<script>
  import pullToRefresh from './pullToRefresh'
  import props from './props'
  import Icon from '../icon'

  export default {
    name: 'vcr-pullToRefresh',
    data () {
      return {
        prefixCls: 'vcr-pull-to-refresh'
      }
    },
    props: {
      direction: props.direction,
      distanceToRefresh: {
        type: Number,
        default () {
          return 25
        }
      },
      refreshing: {
        type: Boolean,
        default () {
          return false
        }
      },
      indicator: {
        type: Object,
        default () {
          return {
            activate: '松开立即刷新',
            deactivate: '下拉可以刷新',
            release: '',
            finish: '完成刷新'
          }
        }
      }
    },
    methods: {
      onRefresh () {
        this.$emit('onRefresh')
      }
    },
    components: {
      pullToRefresh,
      Icon
    },
    mounted () {
      console.log(this.$slots.default)
    }
  }
</script>