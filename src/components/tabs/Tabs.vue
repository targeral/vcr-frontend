<template>
  <div :class="`${prefixCls}` `${prefixCls}-${tabDirection}` `${prefixCls}-${tabBarPosition}`">
    <div
      key="tabBar"
      :class="`${prefixCls}-tab-bar-wrap`"
    >
    </div>
    <Gesture
      key="$content"
      @onSwipe="onSwipe"

    >
      <div ref="layout"></div>
    </Gesture>
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    data () {
      return {
        contentPos: '',
        isMoving: false,
        onPan: (() => {
          let lastOffset = 0
          let finalOffset = 0

          const getLastOffet = (isVertical = this.isTabVertical()) => {
            let offset = +`${lastOffset}`.replace('%', '')
            if (`${lastOffset}`.indexOf('%') >= 0) {
              offset /= 100
              offset *= isVertical ? 
            }
          }
        })()
      }
    },
    props: {
      barTintColor: {
        type: String,
        default: 'white'
      },
      tintColor: {
        type: String,
        default: '#108ee9'
      },
      unselectedTintColor: {
        type: String,
        default: '#888'
      },
      hidden: {
        type: Boolean,
        default: false
      },
      prefixCls: {
        type: String,
        default: 'vcr-tabs'
      },
      noRenderContent: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getContentPosByIndex (index, isVertical, useLeft = false) {
        const value = `${-index * 100}%`

      }
    },
    computed: {
      content () {
        return this.tabBarPosition === 'top' || this.tabBarPosition === 'left'
      }
    }
  }
</script>