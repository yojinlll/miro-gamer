import miroTabs from './miro-tabs'
import miroTabsHead from './miro-tabs-head'
import miroTabsItem from './miro-tabs-item'
import miroTabsPane from './miro-tabs-pane'

let Tabs = {
  install(Vue){
    Vue.component('miro-tabs',miroTabs)
    Vue.component('miro-tabs-head',miroTabsHead)
    Vue.component('miro-tabs-item',miroTabsItem)
    Vue.component('miro-tabs-pane',miroTabsPane)
  }
}

export {Tabs}
