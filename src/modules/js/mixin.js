import AV from 'leancloud-storage'
import '@/modules/js/leanCloud-init'

import Vue from 'vue'
import {miro} from '@/components/miro/miro-ui.js'
Vue.use(miro)

import Header from '@/components/miro-header.vue'
Vue.component('miro-header',Header)

let mixin = {
  methods: {
    checkLogin(){
      if (! this.$children) return
      this.$children.forEach((component) => {
        if (component.$options.name === 'miro-header') {
          if(!component.currentUser) document.location.href = 'login.html'
        }
      })
    }
  }
}

export default mixin
