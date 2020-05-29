import axios from 'axios'
import store from '@/store'
import router from '@/router'

//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]

//基准地址
axios.defaults.baseURL = 'http://192.168.2.238:8080/v2/api'

//拦截器
axios.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.params = {
      token: store.state.user.token,
      uid: store.state.user.user_id,
      tm: new Date().getTime()
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  const status = res.data.result
  if (status == '10003' || status == '10004') {
    store.commit('delUser')
    router.push('/login')
  }
  return res
}, err => {
  return Promise.reject(err)
})

export default axios
