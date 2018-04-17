<template>
  <div :class="prefixCls">
    <div
      v-if="renderHeader"
      :class="`${prefixCls}-header`"
    >
      {{ renderHeaderContent }}
    </div>
    <div 
      v-if="hasSlot"
      :class="`${prefixCls}-body`"
    >
      <slot></slot>
    </div>
    <div
      v-if="renderFooter"
      :class="`${prefixCls}-footer`"
    >
      {{ renderFooterContent }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        prefixCls: 'vcr-list'
      }
    },
    props: {
      renderHeader: {
        type: [String, Function]
      },
      renderFooter: {
        type: [String, Function]
      }
    },
    computed: {
      renderHeaderContent () {
        const renderHeader = this.renderHeader
        return typeof renderHeader === 'function' ? renderHeader() : renderHeader
      },
      renderFooterContent () {
        const renderFooter = this.renderFooter
        return typeof renderFooter === 'function' ? renderFooter() : renderFooter
      },
      hasSlot () {
        let slotKeys = Object.keys(this.$slots)
        return slotKeys.length > 0
      }
    }
  }
</script>