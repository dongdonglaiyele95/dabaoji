import Vue from 'vue'
import App from './App.vue'
import router from './router' //路由
import store from '@/store' //状态
import '@/style/index.less' //样式

//UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


//API
import axios from '@/api'
Vue.prototype.$http = axios

//公用组件封装
import plugin from '@/components'
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
