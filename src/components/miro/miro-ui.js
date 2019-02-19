import {Icon} from "./miro-icon/index.js"
import {Button} from "./miro-button/index.js"
import {Input} from "./miro-input/index.js"
import {Popover} from "./miro-popover/index.js"
import {Collapse} from "./miro-collapse/index.js"
import {Grid} from "./miro-grid/index.js"
import {Tabs} from "./miro-tabs/index.js"
import Toast from "./miro-toast/toastPlugin.js"

const components = [
  Icon,
  Button,
  Input,
  Popover,
  Collapse,
  Grid,
  Tabs,
]

const miro = {
  install(Vue){
    components.forEach((component)=>{
      component.install(Vue)
    })
    Vue.use(Toast)
  }
}

export {
  miro,
  Icon,
  Button,
  Input,
  Popover,
  Collapse,
  Grid,
  Tabs,
  Toast,
}
