import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import Notfound from '@/views/404'
import Welcome from '@/views/welcome'
import ChannelList from '@/views/channellist'
import NewChannel from '@/views/newchannel'
import GameList from '@/views/gamelist'
import NewGame from '@/views/newgame'
import ChannelPack from '@/views/channelpack'
import Pack from '@/views/pack'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      // name: 'home',
      component: Home,
      children:[
        {path: '/',name: 'welcome',component: Welcome},
        {path: '/channellist',name: 'channellist',component: ChannelList},
        {path: '/newchannel',name: 'newchannel',component: NewChannel},
        {path: '/gamelist',name: 'gamelist',component: GameList},
        {path: '/newgame',name: 'newgame',component: NewGame},
        {path: '/channelpack',name: 'channelpack',component: ChannelPack},
        {path: '/pack',name: 'pack',component: Pack},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: Notfound
    },
  ]
})
