const items = {
  title: `nodejs`,
  currentMessage: '世界：啊啊啊啊啊',
  avatarUrl: 'http://p1.music.126.net/qvCYY458FgBaYYzdbb-wiw==/5927467185451677.jpg',
  count: 10,
  time: '10:32'
}

function createItem (count) {
  return new Array(count).fill(0).map((item, index) => {
    let a = Object.create(items)
    a.title = `nodejs${index}`
    return a
  })
}

const state = {
  list: createItem(20),
  search: '',
  room: {}
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
