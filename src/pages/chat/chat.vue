<template>
  <div id="chat">
    <flex class="chat-container" direction="column">
      <Navbar class="chat-navbar">
        <Icon slot="icon" type="left" />
        <Icon slot="rightContent" type="ellipsis" />
        消息
      </Navbar>
      <div class="chat-room-list">
        <chat-search class="chat-search"></chat-search>
        <chat-list></chat-list>
      </div>
    </flex>
  </div>
</template>

<script>
import { Flex, Navbar, Icon } from '@components'
import components from './components'
console.log(Flex)

const FlexItem = Flex.Item
const { ChatList, ChatRoom, ChatSearch } = components

export default {
  name: 'Chat',
  data () {
    return {}
  },
  components: {
    Flex,
    FlexItem,
    Navbar,
    ChatList,
    ChatRoom,
    ChatSearch,
    Icon
  },
  updated () {
    console.log('chat updated')
  }
}
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
.chat-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  & .chat-navbar,
  & .chat-search {
    height: 7vh;
  }
  & .chat-room-list {
    flex: 1 1 0;
    height: 86vh;
  }
}
</style>
