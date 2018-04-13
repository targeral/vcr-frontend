<template>
  <div id="chat">
    <p>This is chat page</p>
    <!-- <chat-list></chat-list> -->
    <!-- <chat-room></chat-room> -->
    <!-- <chat-search></chat-search> -->
    <flex direction="column">
      <flex-item>
        <chat-search></chat-search>
      </flex-item>
      <flex-item>
        <chat-list></chat-list>
      </flex-item>
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
  }
}
</script>

<style lang="less">

</style>
