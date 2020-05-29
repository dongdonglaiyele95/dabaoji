// 公用封装插件注册
import gameSelect from '@/components/game-select'
import channelSelect from '@/components/channel-select'
import uploadImage from '@/components/upload-image'
export default {
  install(Vue) {
    Vue.component(gameSelect.name, gameSelect)
    Vue.component(channelSelect.name, channelSelect)
    Vue.component(uploadImage.name, uploadImage)
  }
}
