<template>
  <div
    :class="cls"
    :style="style"
  >
    <div
      v-if="showPrev"
      :class="`${prefixCls}-prevpage`"
    ></div>
    <Gesture
      @onPan="onPan"
      :direction="direction"
    >
      <div 
        :class="`${prefixCls}-content`"
        :style="transformStyle"
        ref="layout"
      >
        <div
          v-for="(t, i) in tabs"
          :key="`t_${i}`"
          :style="tabStyle(
            i
          )"
          :class="tabCls(
            i
          )"
          @click="onPress(i)"
        >
          {{ t.title }}
        </div>
        <div
          :style="underlineStyle"
          :class="underlineCls"
        ></div>
      </div>
    </Gesture>
    <div
      v-if="showNext"
      :class="`${prefixCls}-nextpage`"
    ></div>
  </div>
</template>

<script>
  import Gesture from 'euv-gesture'
  import { setPxStyle, getTransformPropValue, getPxStyle } from './util'
  import props from './props'

  export default {
    name: 'default-tab-bar',
    data () {
      // console.log(...this.getTransformByIndex())
      let onPan = (() => {
        let lastOffset = 0
        let finalOffset = 0

        const getLastOffset = (isVertical = this.isTabBarVertical()) => {
          let offset = +`${lastOffset}`.replace('%', '')
          if (`${lastOffset}`.indexOf('%') >= 0) {
            offset /= 100
            offset *= isVertical ? this.layout.clientHeight : this.layout.clientWidth
          }
          return offset
        }

        return {
          onPanStart: () => {
            this.isMoving = true
          },

          onPanMove: (status) => {
            if (!status.moveStatus || !this.layout) return
            const isVertical = this.isTabBarVertical()
            let offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x)
            const canScrollOffset = isVertical
              ? -this.layout.scrollHeight + this.layout.clientHeight
              : -this.layout.scrollWidth + this.layout.clientWidth
            offset = Math.min(offset, 0)
            offset = Math.max(offset, canScrollOffset)
            setPxStyle(this.layout, offset, 'px', isVertical)
            finalOffset = offset

            this.showPrev = -offset > 0
            this.showNext = offset > canScrollOffset
          },

          onPanEnd: () => {
            const isVertical = this.isTabBarVertical()
            lastOffset = finalOffset
            this.isMoving = false
            this.transform = getPxStyle(finalOffset, 'px', isVertical)
          },

          setCurrentOffset: (offset) => { lastOffset = offset }
        }
      })()
      console.log('fuck', onPan)
      return {
        transform: '',
        isMoving: false,
        showPrev: false,
        showNext: false,
        onPan
      }
    },
    props: {
      prefixCls: {
        type: String,
        default: 'vcr-tabs-default-bar'
      },
      animated: {
        type: Boolean,
        default: true,
        require: true
      },
      tabs: {
        type: Array,
        default () {
          return []
        },
        require: true
      },
      goToTab: {
        type: Function,
        default () {
          return () => {}
        },
        require: true
      },
      activeTab: {
        type: Number,
        default: 0,
        require: true
      },
      page: {
        type: Number,
        default: 5
      },
      tabBarUnderlineStyle: {
        type: Object,
        default () {
          return {}
        }
      },
      tabBarPosition: props.tabBarPosition,
      tabBarBackgroundColor: {
        type: String,
        default: '#fff'
      },
      tabBarActiveTextColor: {
        type: String,
        default: ''
      },
      tabBarInactiveTextColor: {
        type: String,
        default: ''
      },
      tabBarTextStyle: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      cls () {
        return [
          this.prefixCls,
          {
            [`${this.prefixCls}-animated`]: this.animated && !this.isMoving
          },
          `${this.prefixCls}-${this.tabBarPosition}`
        ]
      },
      style () {
        return {
          backgroundColor: this.tabBarBackgroundColor || ''
        }
      },
      transformStyle () {
        return this.tabs.length > this.page
          ? {
            ...getTransformPropValue(this.transform)
          }
          : {}
      },
      tabStyle () {
        return (
          i,
          size = this.getTabSize(this.page, this.tabs.length),
          isTabBarVertical = this.isTabBarVertical()) => {
          const {
            tabBarTextStyle, activeTab,
            tabBarActiveTextColor,
            tabBarInactiveTextColor
          } = this
          const textStyle = { ...tabBarTextStyle }
          if (activeTab === i && tabBarActiveTextColor) {
            textStyle.color = tabBarActiveTextColor
          } else if (tabBarInactiveTextColor) {
            textStyle.color = tabBarInactiveTextColor
          }
          return {
            ...this.textStyle,
            ...isTabBarVertical ? { height: `${size}%` } : { width: `${size}%` }
          }
        }
      },
      tabCls () {
        return (i, size = this.getTabSize(this.page, this.tabs.length)) => {
          const {
            prefixCls, activeTab
          } = this
          let cls = ` ${prefixCls}-tab`
          if (activeTab === i) {
            cls += ` ${cls}-active`
          }
          return cls
        }
      },
      underlineStyle () {
        const isTabBarVertical = this.isTabBarVertical()
        const { page, tabs, activeTab } = this
        const size = this.getTabSize(page, tabs.length)
        return {
          ...isTabBarVertical ? { height: `${size}%` } : { width: `${size}%` },
          ...isTabBarVertical ? { top: `${size * activeTab}%` } : { left: `${size * activeTab}%` },
          ...this.tabBarUnderlineStyle
        }
      },
      underlineCls () {
        return `${this.prefixCls}-underline`
      },
      direction () {
        return this.isTabBarVertical() ? 'vertical' : 'horizontal'
      }
    },
    components: {
      Gesture
    },
    methods: {
      getTransformByIndex () {
        const { activeTab, tabs, page = 0 } = this
        const isVertical = this.isTabBarVertical()

        const size = this.getTabSize(page, tabs.length)
        const center = page / 2
        let pos = Math.min(activeTab, tabs.length - center - 0.5)
        const skipSize = Math.min(-(pos - center + 0.5) * size, 0)
        console.log(this, this.onPan)
        this.onPan.setCurrentOffset(`${skipSize}%`)
        return {
          transform: getPxStyle(skipSize, '%', isVertical),
          showPrev: activeTab > center - 0.5 && tabs.length > page,
          showNext: activeTab < tabs.length - center - 0.5 && tabs.length > page
        }
      },
      isTabBarVertical (position = this.tabBarPosition) {
        return position === 'left' || position === 'right'
      },
      getTabSize (page, tabLength) {
        return 100 / Math.min(page, tabLength)
      },
      onPress (index) {
        const { goToTab, tabs } = this
        this.$emit('onTabClick', tabs[index], index)
        goToTab && goToTab(index)
      }
    },
    updated () {
      let { transform, showPrev, showNext } = this.getTransformByIndex()
      this.transform = transform
      this.showNext = showNext
      this.showPrev = showPrev
    },
    mounted () {
      console.log('aaa', this.onPan)
    }
  }
</script>