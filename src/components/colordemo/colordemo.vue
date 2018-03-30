<template>
  <div class="test">
    <ul>
        <li v-for="index of counts" :key="index + 'a'" :class="'box-'+index">red-{{index}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        counts: 10
      }
    }
  }
</script>

<style lang="less">
  @import '../style/index.less';
  ul {
    width: 100px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    li {
      color: #000;
      text-align: left;
      padding: 10px;
      box-sizing: border-box;
      &.box-1 {
        background: @red-1;
      }
      &.box-2 {
        background: @red-2;
      }
      &.box-3 {
        background: @red-3;
      }
      &.box-4 {
        background: @red-4;
      }
      &.box-5 {
        background: @red-5;
      }
      &.box-6 {
        background: @red-6;
      }
      &.box-7 {
        background: @red-7;
      }
      &.box-8 {
        background: @red-8;
      }
      &.box-9 {
        background: @red-9;
      }
      &.box-10 {
        background: @red-10;
      }
    }
  }
</style>
