<template>
  <PullToRefresh
    @onRefresh="onRefresh"
    :refreshing="refreshing"
    class="chat-list"
  >
    <list>
      <item platform="android" class="chat-item" :multipleLine="multipleLine" v-for="item of list" :key="item.title">
        <Avatar :src="item.avatarUrl" size="large" />
        <section class="message">
          <h2>{{ item.title }}</h2>
          <p>{{ item.currentMessage }}</p>
        </section>
        <section class="chat-extra" slot="extra">
          <time>{{ item.time }}</time>
          <Badge size="large" :text="item.count" />
        </section>
      </item>
    </list>
  </PullToRefresh>
</template>

<script>
  import { List, Avatar, Badge, PullToRefresh } from '@components'

  const Item = List.Item

  export default {
    name: 'chat-list',
    data () {
      return {
        extra: 'extra content',
        items: new Array(30).fill(0),
        url: 'http://p1.music.126.net/qvCYY458FgBaYYzdbb-wiw==/5927467185451677.jpg',
        multipleLine: false,
        count: 10,
        refreshing: false
      }
    },
    computed: {
      list () {
        console.log(this.$store.state)
        return this.$store.state.chat.list
      }
    },
    components: {
      List,
      Item,
      Avatar,
      Badge,
      PullToRefresh
    },
    methods: {
      renderHeader () {
        return 'Basic Style'
      },
      onRefresh () {
        console.log('onrefresh')
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 3000)
      }
    },
    mounted () {
      console.log(this)
    }
  }
</script>

<style lang="less">
.chat-list {
  height: 100%;
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
