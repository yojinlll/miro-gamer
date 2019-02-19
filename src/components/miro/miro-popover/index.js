import miroPopover from './miro-popover'

let Popover = {
  install(Vue){
    Vue.component('miro-popover',miroPopover)
  }
}

export {Popover}
