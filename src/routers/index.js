import Vue from 'vue'
import Router from 'vue-router'
import {
  Demo
} from '@pages'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/demo',
      component: Demo
    }
  ]
})

export default router
