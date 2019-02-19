import Toast from './miro-toast'

let toast

export default {
  install(Vue){
    Vue.prototype.$toast = function (text,toastOptions){
      if(toast && (toastOptions && toastOptions.only)){
        toast.onClose(0)
      }


      let Constructor = Vue.extend(Toast)
      toast = new Constructor({
        propsData: toastOptions
      })
      toast.$slots.default = text
      toast.$mount()
      document.body.appendChild(toast.$el)

    }
  }
}

