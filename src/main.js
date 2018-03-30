import Vue from 'vue'
import router from './routers'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
