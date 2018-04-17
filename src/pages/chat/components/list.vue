<template>
  <div class="chat-list">
    <list class="my-list">
      <item platform="android" extra="10:30" :multipleLine="multipleLine" v-for="index of items">
        <Avatar :src="url" size="large" />
        <section class="message">
          <h2>nodejs</h2>
          <p>地球：啊啊啊啊啊</p>
        </section>
      </item>
    </list>
  </div>  
</template>

<script>
  import { List, Avatar } from '@components'

  const Item = List.Item

  export default {
    name: 'chat-list',
    data () {
      return {
        extra: 'extra content',
        items: new Array(30).fill(0),
        url: 'http://p1.music.126.net/qvCYY458FgBaYYzdbb-wiw==/5927467185451677.jpg',
        multipleLine: true
      }
    },
    components: {
      List,
      Item,
      Avatar
    },
    methods: {
      renderHeader () {
        return 'Basic Style'
      }
    }
  }
</script>

<style lang="less">
.my-list {
  overflow: auto;

  .list-item {
    display: flex;
    align-items: center;
  }

  .message {
    margin-left: 15px;
    h2, p{
      padding: 0;
      margin: 0;
    }
    h2 {
      font-size: 16px;
      color: #000;
    }
    p {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
