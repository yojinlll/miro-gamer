import miroGridRow from './miro-grid-row'
import miroGridCol from './miro-grid-col'

let Grid = {
  install(Vue){
    Vue.component('miro-row',miroGridRow)
    Vue.component('miro-col',miroGridCol)
  }
}

export {Grid}
