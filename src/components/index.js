import gameSelect from '@/components/game-select'
import channelSelect from '@/components/channel-select'
export default {
  install(Vue) {
    Vue.component(gameSelect.name, gameSelect)
    Vue.component(channelSelect.name, channelSelect)
  }
}
