import miroButton from './miro-button.vue'
import miroButtonGroup from './miro-button-group.vue'

let Button = {
  install(Vue){
    Vue.component('miro-button',miroButton)
    Vue.component('miro-button-group',miroButtonGroup)
  }
}

export {Button}
