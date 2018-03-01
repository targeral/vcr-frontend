import Vue from 'vue'
import App from './App'

new Vue({
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')

const init = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/static/js/sw.js').then(registration => {
        console.log('SW registered', registration)
        registration.onupdatefound = function () {
          if (navigator.serviceWorker.controller) {
            const installingWorker = registration.installing
            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  console.log('installed')
                  break

                case 'redundant':
                  throw new Error('The installing ' + 'service worker became redundant.')
                default:
              }
            }
          }
        }
      }).catch(registrationError => {
        console.log('SW registration failed:', registrationError)
      })
    })
  }
}

init()
