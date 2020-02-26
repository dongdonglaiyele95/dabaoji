import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
// import Home from '@/views/home'
const Home = () => import('@/views/home')

// import Login from '@/views/login'
const Login = () => import('@/views/login')

// import Notfound from '@/views/404'
const Notfound = () => import('@/views/404')

// import Welcome from '@/views/welcome'
const Welcome = () => import('@/views/welcome')

// import ChannelList from '@/views/channellist'
const ChannelList = () => import('@/views/channellist')

// import NewChannel from '@/views/newchannel'
const NewChannel = () => import('@/views/newchannel')

// import GameList from '@/views/gamelist'
const GameList = () => import('@/views/gamelist')

// import NewGame from '@/views/newgame'
const NewGame = () => import('@/views/newgame')

// import ChannelPack from '@/views/channelpack'
const ChannelPack = () => import('@/views/channelpack')

// import Pack from '@/views/pack'
const Pack = () => import('@/views/pack')


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
