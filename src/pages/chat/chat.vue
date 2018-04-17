<template>
  <div id="chat">
    <!-- <chat-list></chat-list> -->
    <!-- <chat-room></chat-room> -->
    <!-- <chat-search></chat-search> -->
    <flex class="chat-container" direction="column">
      <chat-search class="chat-search"></chat-search>
      <chat-list></chat-list>
    </flex>
  </div>
</template>

<script>
import { Flex } from '@components'
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
    ChatList,
    ChatRoom,
    ChatSearch
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

  & .chat-search {
    height: 7vh;
    overflow: hidden;
  }

  & .chat-list {
    flex: 1 1 0;
    height: 93vh;
    overflow: auto;
  }
}
</style>
