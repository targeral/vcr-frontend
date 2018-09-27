<template>
  <div class="demo">
    <!-- <section class="demo-container">
      <v-row class="grid-row">
        <v-col class="grid-col" :span="12">col-12</v-col>
        <v-col class="grid-col" :span="12">col-12</v-col>
      </v-row>
      <v-row class="grid-row">
        <v-col class="grid-col" :span="8">col-8</v-col>
        <v-col class="grid-col" :span="8">col-8</v-col>
        <v-col class="grid-col" :span="8">col-8</v-col>
      </v-row>
      <v-row class="grid-row">
        <v-col class="grid-col" :span="6">col-6</v-col>
        <v-col class="grid-col" :span="6">col-6</v-col>
        <v-col class="grid-col" :span="6">col-6</v-col>
        <v-col class="grid-col" :span="6">col-6</v-col>
      </v-row>
    </section> -->
    <Tabs :tabs="tabs">
      <div key="t1"><p>content1</p></div>
      <div key="t2"><p>content2</p></div>
      <div key="t3"><p>content3</p></div>
      <div key="t4"><p>content4</p></div>
      <div key="t5"><p>content5</p></div>
    </Tabs>
  </div>
</template>

<script>
import VRow from '@components/row'
import VCol from '@components/col'
import { Tabs } from '@components'

export default {
  name: 'demo',
  data () {
    return {
      cV: this.value,
      tabs: [
        { key: 't1', title: 't1' },
        { key: 't2', title: 't2' },
        { key: 't3', title: 't3' },
        { key: 't4', title: 't4' },
        { key: 't5', title: 't5' }
      ],
      a: {
        b: {
          c: 'lalalal'
        }
      }
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  methods: {
    handleInput (e) {
      const value = e.target.value
      this.$nextTick(() => {
        this.cV = value.slice(0, 2)
        this.$emit('input', this.cV)
      })
    }
  },
  components: {
    VRow,
    VCol,
    Tabs
  }
}
</script>

<style lang="less">
.demo-container {
  position: relative;
  text-align: left;
  padding: 42px 20px 50px;
}
.grid-row {
  margin: 8px 0;
  &-flex {
    padding: 8px 0;
    background-color: #f5f5f5;
  }
}
.grid-col {
  background-color: #00a0e9;
  color: #fff;
  padding: 16px 0;
  &:nth-child(odd) {
    background-color: rgba(0,160,233,.7)
  }
}
</style>
