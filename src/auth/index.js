// 状态管理
const key = 'wenmai'
const channelPage = 'channelPage'
const gameList = 'gameList'
export default {
  // user
  setUser(user) {
    const jsonStr = JSON.stringify(user)
    window.localStorage.setItem(key, jsonStr)
  },
  getUser() {
    const jsonStr = window.localStorage.getItem(key) || '{}'
    return JSON.parse(jsonStr)
  },
  delUser() {
    window.localStorage.removeItem(key)
  },
  //channelPage
  setChannelPage(page) {
    window.sessionStorage.setItem(channelPage, JSON.stringify(page))
  },
  getChannelPage() {
    return JSON.parse(window.sessionStorage.getItem(channelPage) || '{}')
  },
  //gameList
  setGameList(game) {
    window.localStorage.setItem(gameList, JSON.stringify(game))
  },
  getGameList() {
    return JSON.parse(window.localStorage.getItem(gameList) || '{}')
  }
}
