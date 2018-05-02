<template>
  <div class="dashboard">
    <ul>
      <li v-for="(value, key) in usage" :key="key">
        {{ key }}: {{ value}}
      </li>
    </ul>
    <echart
      v-for="echart of echarts"
      :key="echart.title"
      :title="echart.title"
      :loading="echart.loading"
      :xAxis="echart.dateRegion"
      :seriesData="echart.metricData"
    ></echart>
  </div>
</template>

<script>
  import { Echart } from '@components'
  export default {
    name: 'dashboard',
    data () {
      return {}
    },
    components: {
      Echart
    },
    computed: {
      echarts () {
        let { dashboard } = this.$store.state
        return dashboard.echarts
      },
      usage () {
        let { dashboard } = this.$store.state
        return dashboard.usage
      }
    },
    methods: {
      getData () {
        this.$store.dispatch('dashboard/getFlowInData', '2018-03-17 00:00:00')
        this.$store.dispatch('dashboard/getFlowOutData', '2018-03-17 00:00:00')
        this.$store.dispatch('dashboard/getFlowUsage', '2018-03-17 00:00:00')
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>