console.log('aaaa', self)
self.addEventListener('install', e => {
  console.log('install')
  e.waitUntil()
})

self.addEventListener('activate', () => {
  console.log('active')
})
