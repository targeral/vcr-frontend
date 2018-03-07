import Vue from 'vue'
import App from './App'
import axios from 'axios'

Vue.prototype.$http = axios

new Vue({
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
