<template>
  <div ref="echartDom" class="echart-demo"></div>
</template>

<script>
  import echart from 'echarts'
  export default {
    name: 'echart',
    data () {
      return {
        chart: null,
        seriesData: [5, 20, 36, 10, 10, 20],
        timer: null
      }
    },
    methods: {
      updateChart () {
        this.seriesData[this.seriesData.length - 1]++
        this.chart.setOption({
          title: {
            text: 'dashboard'
          },
          tooltip: {},
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line',
            smooth: true,
            data: this.seriesData
          }]
        })
      }
    },
    mounted () {
      this.chart = echart.init(this.$refs.echartDom)
      this.chart.showLoading()
      this.timer = setInterval(() => {
        this.chart.hideLoading()
        this.updateChart()
      }, 1000)
    },
    destroyed () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="less">
.echart-demo {
  width: 100vw;
  height: 100vh;
  display: block;
  overflow: hidden;
}
</style>
