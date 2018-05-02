<template>
  <div ref="echartDom" class="echart-demo"></div>
</template>

<script>
  import echart from 'echarts'
  export default {
    name: 'echart',
    data () {
      return {
        chart: null
      }
    },
    props: {
      title: {
        type: String,
        default () {
          return 'echart'
        }
      },
      loading: {
        type: Boolean,
        default () {
          return false
        }
      },
      xAxis: {
        type: Array,
        default () {
          return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      },
      seriesData: {
        type: Array,
        default () {
          return [5, 20, 36, 10, 10, 20]
        }
      }
    },
    watch: {
      seriesData (value) {
        this.updateChart()
      },
      loading (value) {
        value && this.chart.showLoading()
        !value && this.chart.hideLoading()
      }
    },
    methods: {
      updateChart () {
        this.chart.setOption({
          title: {
            text: this.title
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              snap: true
            }
          },
          xAxis: {
            data: this.xAxis
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
      this.loading && this.chart.showLoading()
      !this.loading && this.updateChart()
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
