// 状态管理
const key = 'wenmai'
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
  }
}
