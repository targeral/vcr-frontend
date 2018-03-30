<template>
  <div>
    <section class="demo-container">
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
    </section>
  </div>
</template>

<script>
import VRow from '@components/row'
import VCol from '@components/col'

export default {
  name: 'demo',
  data () {
    return {}
  },
  components: {
    VRow,
    VCol
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
