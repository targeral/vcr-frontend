<template>
  <div class="chat-search">
    <search-bar
      class="chat-search-bar"
      :placeholder="placeholder"
      :maxLength="maxLength"
      v-model="value"
      @onClear="doClear"
      @onSubmit="doSubmit"
    ></search-bar>
  </div>
</template>

<script>
  import { SearchBar } from '@components'
  export default {
    name: 'chat-search',
    data () {
      return {
        placeholder: '搜索',
        maxLength: 16,
        value: ''
      }
    },
    components: {
      SearchBar
    },
    methods: {
      doClear () {
        this.value = ''
      },
      doSubmit (value) {
        console.log(`search:${value}`)
      }
    }
  }
</script>

<style lang="less">
.chat-search {
  &-bar {
    height: 100%;
  }
}
</style>
