<template>
  <div class="chat-search">
    <search-bar
      :placeholder="placeholder"
      :maxLength="maxLength"
    ></search-bar>
  </div>
</template>

<script>
  import { SearchBar } from '@components'
  export default {
    name: 'chat-search',
    data () {
      return {
        placeholder: 'Search',
        maxLength: 8,
        value: 'test'
      }
    },
    components: {
      SearchBar
    }
  }
</script>

<style lang="less">

</style>
