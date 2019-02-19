import miroCollapse from './miro-collapse'
import miroCollapseItem from './miro-collapse-item'

let Collapse = {
  install(Vue){
    Vue.component('miro-collapse',miroCollapse)
    Vue.component('miro-collapse-item',miroCollapseItem)
  }
}

export {Collapse}
