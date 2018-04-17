import Vue from 'vue'
import Router from 'vue-router'
// import {
//   Demo,
//   Chat
// } from '@pages'

// import {
//   Demo,
//   Chat
// } from '@pages'

import pages from '@pages'

const {
  Chat,
  Demo,
  Dashboard
} = pages

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/demo',
      component: Demo
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
})

export default router
