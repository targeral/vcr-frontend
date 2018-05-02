<template>
  <div ref="containerRef" :class="containerCls">
    <div :class="`${prefixCls}-content-wrapper`">
      <div ref="contentRef" :class="cla">
        <div v-if="isUp">
          <slot></slot>
        </div>
        <div :class="`${prefixCls}-indicator`">
          <slot :name="currSt">{{ indicator[currSt] }}</slot>          
        </div>
        <div v-if="isDown">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import props from './props'
  const isWebView = typeof navigator !== 'undefined' &&
  /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)
  const UP = 'up'
  const DOWN = 'down'
  function setTransform (nodeStyle, value) {
    nodeStyle.transform = value
    nodeStyle.webkitTransform = value
    nodeStyle.MozTransform = value
  }

  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get () {
        supportsPassive = true
      }
    })
    window.addEventListener('test', null, opts)
  } catch (e) {
    // empty
  }
  const willPreventDefault = supportsPassive ? { passive: false } : false

  export default {
    name: 'pullToRefresh',
    data () {
      return {
        // currSt: `activate` / `deactivate` / `release` / `finish`
        currSt: '',
        _lastScreenY: null,
        _ScreenY: null,
        _startScreenY: null,
        dragOnEdge: false
      }
    },
    props: {
      prefixCls: {
        type: String,
        default () {
          return 'pull-to-refresh'
        }
      },
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
            release: '加载中...',
            finish: '完成刷新'
          }
        }
      },
      getScrollContainer: {
        type: Function,
        default () {
          return () => undefined
        }
      }
    },
    computed: {
      containerCls () {
        return [
          this.prefixCls,
          `${this.prefixCls}-${this.direction}`
        ]
      },
      cla () {
        return [
          `${this.prefixCls}-content`,
          !this.dragOnEdge && `${this.prefixCls}-transition`
        ]
      },
      isUp () {
        return this.direction === UP
      },
      isDown () {
        return this.direction === DOWN
      }
    },
    methods: {
      init (ele) {
        console.log(ele)
        if (!ele) {
          // like return in destroy fn ???!!
          return
        }
        this._to = {
          touchstart: this.onTouchStart.bind(this, ele),
          touchmove: this.onTouchMove.bind(this, ele),
          touchend: this.onTouchEnd.bind(this, ele),
          touchcancel: this.onTouchEnd.bind(this, ele)
        }
        Object.keys(this._to).forEach(key => {
          ele.addEventListener(key, this._to[key], willPreventDefault)
        })
      },
      triggerPullToRefresh () {
        // 在初始化时、用代码 自动 触发 pullToRefresh
        // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
        if (!this.dragOnEdge) {
          if (this.refreshing) {
            if (this.direction === UP) {
              this._lastScreenY = -this.distanceToRefresh - 1
            }
            if (this.direction === DOWN) {
              this._lastScreenY = this.distanceToRefresh + 1
            }
            this.currSt = 'release'
            this.$nextTick(() => this.setContentStyle(this._lastScreenY))
          } else {
            this.currSt = 'finish'
            this.$nextTick(() => this.reset())
          }
        }
      },
      onTouchStart (ele, e) {
        console.log('touch start', e.touches[0].screenY)
        this._ScreenY = this._startScreenY = e.touches[0].screenY
        // 一开始 refreshing 为 true 时 this._lastScreenY 有值
        this._lastScreenY = this._lastScreenY || 0
      },
      isEdge (ele, direction) {
        const container = this.getScrollContainer()
        if (container && container === document.body) {
          const scrollNode = document.scrollingElement ? document.scrollingElement : document.body
          if (direction === UP) {
            return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight
          }
          if (direction === DOWN) {
            return scrollNode.scrollTop <= 0
          }
        }

        if (direction === UP) {
          return ele.scrollHeight - ele.scrollTop === ele.clientHeight
        }
        if (direction === DOWN) {
          console.log(`scrollTop ${ele.scrollTop}`, ele)
          return ele.scrollTop <= 0
        }
      },
      onTouchMove (ele, e) {
        // 使用 pageY 对比有问题
        const _screenY = e.touches[0].screenY
        const { direction } = this
        console.log(`touch move currentY:${e.touches[0].screenY} startY: ${this._startScreenY} dragRight: ${direction === DOWN && this._startScreenY > _screenY}`)

        // 拖动方向不符合的不处理
        if ((direction === UP && this._startScreenY < _screenY) ||
          (direction === DOWN && this._startScreenY > _screenY)) {
          return
        }
        if (this.isEdge(ele, direction)) {
          if (!this.dragOnEdge) {
            this.dragOnEdge = true
          }

          const _diff = Math.round(_screenY - this._ScreenY)
          this._ScreenY = _screenY
          this._lastScreenY += _diff

          this.setContentStyle(this._lastScreenY)

          if (Math.abs(this._lastScreenY) < this.distanceToRefresh) {
            if (this.currSt !== 'deactivate') {
              this.currSt = 'deactivate'
            }
          } else {
            if (this.currSt === 'deactivate') {
              this.currSt = 'activate'
            }
          }
          // 参考：https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
          // iOS UIWebView issue, It seems no problem in WKWebView
          // 当滑出屏幕外后，无法触发touchEnd
          // https://segmentfault.com/q/1010000002943205
          if (isWebView && e.changedTouches[0].clientY < 0) {
            this.onTouchEnd()
          }
        }
      },
      onTouchEnd () {
        if (this.dragOnEdge) {
          this.dragOnEdge = false
        }
        if (this.currSt === 'activate') {
          this.currSt = 'release'
          this._timer = setTimeout(() => {
            if (!this.refreshing) {
              this.currSt = 'finish'
              this.$nextTick(() => this.reset())
            }
          }, 1000)
          this.$emit('onRefresh')
        } else {
          this.reset()
        }
      },
      reset () {
        this._lastScreenY = 0
        this.setContentStyle(0)
      },
      setContentStyle (ty) {
        if (this.$refs.contentRef) {
          setTransform(this.$refs.contentRef.style, `translate3d(0px,${ty}px,0)`)
        }
      },
      destroy (ele) {
        if (!this._to || !ele) {
          return
        }
        Object.keys(this._to).forEach(key => {
          ele.removeEventListener(key, this._to[key])
        })
      }
    },
    watch: {
      refreshing () {
        this.triggerPullToRefresh()
      }
    },
    mounted () {
      setTimeout(() => {
        this.init(this.$refs.containerRef)
        this.triggerPullToRefresh()
      })
    },
    destroyed () {
      this.destroy(this.$refs.containerRef)
    }
  }
</script>