import Vue from 'vue'
import Router from 'vue-router'
import pages from '@pages'

const {
  Chat,
  Demo,
  Dashboard,
  Home,
  FourZeroFour
} = pages

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
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
    },
    {
      path: '*',
      component: FourZeroFour
    }
  ]
})

export default router
