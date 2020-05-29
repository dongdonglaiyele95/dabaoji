// 配置vuex
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import auth from '@/auth'

export default new Vuex.Store({
  state: {
    user: auth.getUser(),
    getChannelPage: auth.getChannelPage(), //channelPage
    getGameList: auth.getGameList(), //GameList
  },
  mutations: {
    // user
    setUser(state, user) {
      state.user = user
      auth.setUser(user)
    },
    delUser(state) {
      state.user = {}
      auth.delUser()
    },
    // channelPage
    setChannelPage(state, page) {
      state.getChannelPage = page
      auth.setChannelPage(page)
    },
    //GameList
    setGameList(state, game) {
      state.getGameList = game
      auth.setGameList(game)
    },
  },
  actions: {

  }
})
