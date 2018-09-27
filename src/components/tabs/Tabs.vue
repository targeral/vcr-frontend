<template>
  <div :class="`${prefixCls} ${prefixCls}-${tabDirection} ${prefixCls}-${tabBarPosition}`">
    <div
      :class="`${prefixCls}-tab-bar-wrap`"
      v-if="tabBarPosition === 'top' || tabBarPosition === 'left'"
    >
      <slot name="renderTabBar" v-if="renderTabBarSlot !== false">
        <DefaultTabBar
          :activeTab="currentTab"
          :animated="!!animated"
          :goToTab="tabClickGoToTab.bind(this)"
          :tabBarActiveTextColor="tabBarActiveTextColor"
          :tabBarBackgroundColor="tabBarBackgroundColor"
          :tabBarInactiveTextColor="tabBarInactiveTextColor"
          :tabBarPosition="tabBarPosition"
          :tabBarTextStyle="tabBarTextStyle"
          :tabBarUnderlineStyle="tabBarUnderlineStyle"
          :tabs="tabs"
          @onTabClick="onTabClick"
        ></DefaultTabBar>
      </slot>
    </div>
    <Gesture
      key="$content"
      @onSwipe="onSwipe"
      @onPanStart="onPan.onPanStart"
      @onPanMove="onPan.onPanMove"
      @onPanEnd="onPan.onPanEnd"
    >
      <div 
        ref="layout"
        :class="contentCls"
        :style="contentStyle"
      >
      {{ contentCls }}
        <TabPane
          :class="tabCls(index)"
          v-for="(tab, index) in tabs"
          :key="`tab_${index}`"
          :active="currentTab === index"
          :fixX="isTabVertical()"
          :fixY="!isTabVertical()"
          :tabCache="tabCache(index)"
        >
        </TabPane>
      </div>
    </Gesture>
    <div
      key="tabBar"
      :class="`${prefixCls}-tab-bar-wrap`"
      v-if="!(tabBarPosition === 'top' || tabBarPosition === 'left')"
    >
      <slot name="renderTabBar" v-if="renderTabBarSlot !== false">
        <DefaultTabBar
          :activeTab="currentTab"
          :animated="!!animated"
          :goToTab="tabClickGoToTab.bind(this)"
          :tabBarActiveTextColor="tabBarActiveTextColor"
          :tabBarBackgroundColor="tabBarBackgroundColor"
          :tabBarInactiveTextColor="tabBarInactiveTextColor"
          :tabBarPosition="tabBarPosition"
          :tabBarTextStyle="tabBarTextStyle"
          :tabBarUnderlineStyle="tabBarUnderlineStyle"
          :tabs="tabs"
          @onTabClick="onTabClick"
        ></DefaultTabBar>
      </slot>
    </div>
  </div>
</template>

<script>
  import Gesture from 'euv-gesture'
  import TabPane from './TabPane'
  import DefaultTabBar from './DefaultTabBar'
  import { getTransformPropValue, setTransform, setPxStyle } from './util'
  import props from './props'
  export default {
    name: 'tabs',
    data () {
      return {
        contentPos: '',
        isMoving: false,
        currentTab: this.getTabIndex(),
        nextCurrentTab: this.currentTab,
        onPan: (() => {
          let lastOffset = 0
          let finalOffset = 0

          const getLastOffet = (isVertical = this.isTabVertical()) => {
            let offset = +`${lastOffset}`.replace('%', '')
            if (`${lastOffset}`.indexOf('%') >= 0) {
              offset /= 100
              offset *= isVertical ? this.$refs.layout.clientHeight : this.layout.clientWidth
            }
            return offset
          }

          return {
            onPanStart: () => {
              if (!this.swipeable || this.anmiated) return
              this.isMoving = true
              console.log(this.isMoving)
            },

            onPanMove: (status) => {
              const { swipeable, animated, useLeftInsteadTransform } = this
              if (!status.moveStatus || !this.$refs.layout || !swipeable || !animated) return
              const isVertical = this.isTabVertical()
              let offset = getLastOffet() + (isVertical ? status.moveStatus.y : status.moveStatus.x)
              console.log(offset)
              // console.log(this.$refs.layout)
              const canScrollOffset = isVertical
                ? -this.$refs.layout.scrollHeight + this.$refs.layout.clientHeight
                : -this.$refs.layout.scrollWidth + this.$refs.layout.clientWidth
              console.log(canScrollOffset)
              offset = Math.min(offset, 0)
              offset = Math.max(offset, canScrollOffset)
              console.log('offset', offset)
              setPxStyle(this.$refs.layout, offset, 'px', isVertical, useLeftInsteadTransform)
              finalOffset = offset
            },

            onPanEnd: () => {
              if (!this.swipeable || this.animated) return
              lastOffset = finalOffset
              const isVertical = this.isTabVertical()
              const offsetIndex = this.getOffsetIndex(finalOffset, isVertical ? this.$refs.layout.clientHeight : this.$refs.layout.clientWidth)
              this.isMoving = false
              if (offsetIndex === this.currentTab) {
                if (this.usePaged) {
                  setTransform(
                    this.$refs.layout,
                    this.getContentPosByIndex(
                      offsetIndex,
                      this.isTabVertical(),
                      this.useLeftInsteadTransform
                    )
                  )
                }
              } else {
                this.goToTab(offsetIndex)
              }
            },

            setCurrentOffset: (offset) => { lastOffset = offset }
          }
        })()
      }
    },
    components: {
      DefaultTabBar,
      TabPane,
      Gesture
    },
    props: {
      tabs: {
        type: Array,
        required: true
      },
      tabBarPosition: props.tabBarPosition,
      renderTabBar: {
        type: [Object, Boolean],
        default () {
          return undefined
        }
      },
      initialPage: {
        type: [Number, String]
      },
      page: {
        type: [Number, String]
      },
      swipeable: {
        type: Boolean,
        default: true
      },
      useOnPan: {
        type: Boolean,
        default: true
      },
      prerenderingSiblingsNumber: {
        type: Number,
        default: 1
      },
      animated: {
        type: Boolean,
        default: true
      },
      destroyInactiveTab: {
        type: Boolean,
        default: false
      },
      distanceToChangeTab: {
        type: Number,
        default: 0.3
      },
      usePaged: {
        type: Boolean,
        default: true
      },
      tabDirection: props.tabDirection,
      tabBarUnderlineStyle: {
        type: Object
      },
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
      },
      noRenderContent: {
        type: Boolean,
        default: false
      },
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
      useLeftInsteadTransform: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getContentPosByIndex (index, isVertical, useLeft = false) {
        const value = `${-index * 100}%`
        this.onPan.setCurrentOffset(value)
        if (useLeft) {
          return `${value}`
        } else {
          const translate = isVertical ? `0px, ${value}` : `${value}, 0px`
          return `translate3d(${translate}, 1px)`
        }
      },
      goToTab (index, force = false, usePaged = this.usePaged) {
        const { tabDirection, useLeftInsteadTransform } = this
        if (usePaged) {
          if (!force && this.nextCurrentTab === index) {
            return false
          }
          this.nextCurrentTab = index
          const { tabs } = this
          if (index >= 0 && index < tabs.length) {
            if (!force) {
              this.$emit('onChange', tabs[index], index)
              if (this.page !== undefined) {
                return false
              }
            }

            this.currentTab = index
            this.contentPos = this.getContentPosByIndex(
              index,
              this.isTabVertical(tabDirection),
              useLeftInsteadTransform
            )
          }
        }
        return true
      },
      tabClickGoToTab (index) {
        this.goToTab(index, false, true)
      },
      onSwipe (status) {
        const { tabBarPosition, swipeable, usePaged } = this
        if (!swipeable || !usePaged || this.isTabVertical()) return
        switch (tabBarPosition) {
          case 'top':
          case 'bottom':
            switch (status.direction) {
              case 2:
                if (!this.isTabVertical()) {
                  this.goToTab(this.prevCurrentTab + 1)
                }
                break
              case 8:
                if (this.isTabVertical()) {
                  this.goToTab(this.prevCurrentTab + 1)
                }
                break
              case 4:
                if (!this.isTabVertical()) {
                  this.goToTab(this.prevCurrentTab - 1)
                }
                break
              case 16:
                if (this.isTabVertical()) {
                  this.goToTab(this.prevCurrentTab - 1)
                }
                break
            }
            break
        }
      },
      onTabClick () {
        this.$emit('onTabClick')
      },
      shouldRenderTab (idx) {
        const { prerenderingSiblingNumber = 0 } = this
        const { currentTab = 0 } = this
        return currentTab - prerenderingSiblingNumber <= idx && idx <= currentTab + prerenderingSiblingNumber
      },
      getTabIndex () {
        const { page, initialPage, tabs } = this
        const param = (page !== undefined ? page : initialPage) || 0

        let index = 0
        if (typeof param === 'string') {
          tabs.forEach((t, i) => {
            if (t.key === param) {
              index = i
            }
          })
        } else {
          index = param || 0
        }
        return index < 0 ? 0 : index
      },
      isTabVertical (direction = this.tabDirection) {
        return direction === 'vertical'
      }
    },
    computed: {
      content () {
        return this.tabBarPosition === 'top' || this.tabBarPosition === 'left'
      },
      contentCls () {
        let prefixCls = `${this.prefixCls}-content-wrap`
        return [
          prefixCls,
          {
            [`${prefixCls}-animated`]: this.anmiated && !this.isMoving
          }
        ]
      },
      contentStyle () {
        const { animated, useLeftInsteadTransform, contentPos, currentTab } = this
        return animated ? (
          useLeftInsteadTransform ? {
            position: 'relateive',
            ...this.isTabVertical() ? { top: contentPos } : { left: contentPos }
          } : getTransformPropValue(contentPos)
        ) : {
          position: 'relative',
          ...this.isTabVertical() ? { top: `${-currentTab * 100}%` } : { left: `${-currentTab * 100}%` }
        }
      },
      tabCls () {
        return (index) => {
          let cls = `${this.prefixCls}-pane-wrap`
          return [
            cls,
            {
              [`${cls}-active`]: this.currentTab === index,
              [`${cls}-inactive`]: this.currentTab !== index
            }
          ]
        }
      },
      tabCache () {
        return (index) => {
          if (this.shouldRenderTab(index)) {
            return this.$slots.default[index]
          } else if (this.destroyInactiveTab) {
            return undefined
          }
        }
      },
      renderTabBarSlot () {
        console.log('a', this.renderTabBar)
        return this.renderTabBar !== false
      }
    }
  }
</script>