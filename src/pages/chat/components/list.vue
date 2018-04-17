<template>
  <div class="chat-list">
    <list class="my-list">
      <item platform="android" class="chat-item" :multipleLine="multipleLine" v-for="index of items">
        <Avatar :src="url" size="large" />
        <section class="message">
          <h2>nodejs</h2>
          <p>地球：啊啊啊啊啊</p>
        </section>
        <section class="chat-extra" slot="extra">
          <time>10:30</time>
          <Badge size="large" :text="count" />
        </section>
      </item>
    </list>
  </div>  
</template>

<script>
  import { List, Avatar, Badge } from '@components'

  const Item = List.Item

  export default {
    name: 'chat-list',
    data () {
      return {
        extra: 'extra content',
        items: new Array(30).fill(0),
        url: 'http://p1.music.126.net/qvCYY458FgBaYYzdbb-wiw==/5927467185451677.jpg',
        multipleLine: false,
        count: 10
      }
    },
    components: {
      List,
      Item,
      Avatar,
      Badge
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

  .chat-item {
    height: 65px;
  }

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
  .chat-extra {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
