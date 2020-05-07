// 配置vuex
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import auth from '@/auth'

export default new Vuex.Store({
  state: {
    loading: false,
    user: auth.getUser()
  },
  mutations: {
    // loading
    setLoad(state, loading) {
      state.loading = loading
    },
    // user
    setUser(state, user) {
      state.user = user
      auth.setUser(user)
    },
    delUser(state) {
      state.user = {}
      auth.delUser()
    },
  },
  actions: {

  }
})
