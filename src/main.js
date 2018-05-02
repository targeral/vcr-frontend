import Vue from 'vue'
import axios from 'axios'
import router from './routers'
import store from './store'
import App from './App'

Vue.prototype.$https = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
