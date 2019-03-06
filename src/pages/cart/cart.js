import Vue from 'vue'
import store from '@/modules/js/store.js'
import router from './router-components/router.js'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './cart.scss'

import mixin from '@/modules/js/mixin.js'
import AV from 'leancloud-storage'

// import {mapState, mapActions} from 'vuex'


new Vue({
  el: '#app',
  store,
  router,
  data: {
    isActive: 'cart',
    routerName: [
      {path:'cart', name:'购物车'},
      {path:'order', name:'已购列表'}
    ]
  },
  mounted(){
    this.checkLogin()
    this.isActive = this.$router.currentRoute.name
  },
  methods: {
    onActive(path){
      this.isActive = path
    }
  },
  mixins: [mixin]
})
