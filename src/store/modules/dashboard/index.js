import $https from 'axios'
import qs from 'qs'

const flowInUrl = 'https://api.mrmasachi.tk/aws/network/in'
const flowOutUrl = 'https://api.mrmasachi.tk/aws/network/out'
const flowUsageUrl = 'https://api.mrmasachi.tk/aws/network/usage'
let prefix = 1

class Echart {
  constructor (
    title = 'dashboard',
    dateRegion = [],
    metricData = [],
    loading = true
  ) {
    this.title = title + prefix++
    this.loading = loading
    this.dateRegion = this.dateRegion
    this.metricData = metricData
  }
  updateData (title, dateRegion, metricData, loading = false) {
    this.title = title
    this.loading = loading
    console.log(dateRegion)
    this.dateRegion = this.parsedateRegion(dateRegion)
    this.metricData = metricData
  }
  parsedateRegion (dateRegion) {
    return dateRegion.map(dr => dr.date)
  }
}

function getTodayDate () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  let day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`
  let hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`
  let minute = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes}`
  let second = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function qsTimeParam (startTime, endTime) {
  return qs.stringify({
    startTime,
    endTime
  })
}

const state = {
  echarts: [],
  usage: {
    All: 0,
    In: 0,
    Out: 0
  }
}

const mutations = {
  addEchart (state) {
    let echart = new Echart()
    state.echarts.push(echart)
  },
  updateEchart (state, { index, MetricName, dateRegion, MetricData, loading }) {
    console.log('title', MetricName)
    state.echarts[index].updateData(MetricName, dateRegion, MetricData, loading)
  },
  updateUsage (state, usage) {
    state.usage = usage
  }
}

const actions = {
  getFlowInData ({ commit, state }, startTime, endTime = getTodayDate()) {
    commit('addEchart')
    let index = state.echarts.length - 1
    $https
      .post(flowInUrl, qsTimeParam(startTime, endTime))
      .then(res => {
        let { data: { dateRegion, MetricData, MetricName } } = res
        commit('updateEchart', {
          index,
          MetricName,
          dateRegion,
          MetricData,
          loading: false
        })
      })
  },
  getFlowOutData ({ commit, state }, startTime, endTime = getTodayDate()) {
    commit('addEchart')
    let index = state.echarts.length - 1
    $https
      .post(flowOutUrl, qsTimeParam(startTime, endTime))
      .then(res => {
        let { data: { dateRegion, MetricData, MetricName } } = res
        commit('updateEchart', {
          index,
          MetricName,
          dateRegion,
          MetricData,
          loading: false
        })
      })
  },
  getFlowUsage ({ commit, state }, startTime, endTime = getTodayDate()) {
    $https
      .post(flowUsageUrl, qsTimeParam(startTime, endTime))
      .then(res => {
        let {
          data: {
            MetricData: {
              All, Out, In
            }
          }
        } = res
        console.log(All, Out, In)
        commit('updateUsage', { All, Out, In })
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
