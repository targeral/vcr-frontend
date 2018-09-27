<template>
  <Flex class="home">
    <FlexItem v-for="link of links" :key="link.url" class="links-item">
      <router-link :to="link.url">{{ link.name }}</router-link>
    </FlexItem>
    <img :src="a && a.b && a.b.c" alt="">
  </Flex>
</template>

<script>
  import { Flex } from '@components'
  const FlexItem = Flex.Item
  export default {
    name: 'home',
    data () {
      return {
        links: [
          {
            name: '流量统计',
            url: '/dashboard'
          }
        ],
        a: {
          b: {
            c: 'lalalal'
          }
        }
      }
    },
    components: {
      Flex,
      FlexItem
    }
  }
</script>

<style lang="less">
.home {
  width: 100vw;
  height: 100vh;

  .link-item {
    width: 19vw;
    height: 19vw;
    border: 1px solid #ccc;
  }
}
</style>
