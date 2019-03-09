import AV from 'leancloud-storage'
import '@/modules/js/leanCloud-init'

import Vue from 'vue'
import {miro} from '@/components/miro/miro-ui.js'
Vue.use(miro)

import '@/components/miro/svg.js'
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
    },
    windowResize(){     // 计算 category 分类页的产品列表如何居中 (./product-list.vue)
      if(this.$refs.list){
        if (this.$refs.list.clientWidth < 689) {
          this.padding = (this.$refs.list.clientWidth - 250) / 2 - 10

        }else if (this.$refs.list.clientWidth < 1039) {
          this.padding = (this.$refs.list.clientWidth - 250 * 2) / 2 - 10 * 2

        }else if(this.$refs.list.clientWidth < 1500){
          this.padding = 40
        }
      }
    }
  }
}

export default mixin
