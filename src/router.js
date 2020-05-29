import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// 路由懒加载
const Home = () => import('@/views/home')
const Login = () => import('@/views/login')
const Notfound = () => import('@/views/404')
const Welcome = () => import('@/views/welcome')
const ChannelList = () => import('@/views/channellist')
const NewChannel = () => import('@/views/newchannel')
const GameList = () => import('@/views/gamelist')
const NewGame = () => import('@/views/newgame')
const ChannelPack = () => import('@/views/channelpack')
const Pack = () => import('@/views/pack')
const Manager = () => import('@/views/manager')

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      // name: 'home',
      component: Home,
      children: [{
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/channellist',
          name: 'channellist',
          component: ChannelList
        },
        {
          path: '/newchannel',
          name: 'newchannel',
          component: NewChannel
        },
        {
          path: '/gamelist',
          name: 'gamelist',
          component: GameList
        },
        {
          path: '/newgame',
          name: 'newgame',
          component: NewGame
        },
        {
          path: '/channelpack',
          name: 'channelpack',
          component: ChannelPack
        },
        {
          path: '/pack',
          name: 'pack',
          component: Pack
        },
        {
          path: '/manager',
          name: 'manager',
          component: Manager
        },
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

// 路由拦截器
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.user.token) {
    return next('/login')
  }
  next()
})

export default router
