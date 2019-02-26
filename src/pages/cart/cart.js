import Vue from 'vue'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './cart.scss'

import mixin from '@/modules/js/mixin.js'
import AV from 'leancloud-storage'

new Vue({
  el: '#app',
  data: {
    activeNames: '1',
    cartList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    orderList: [11, 22, 33, 44, 55, 66, 77, 88, 99, 101]
  },
  mounted(){
    this.checkLogin()
  },
  methods: {
    log(){
      console.log(1111)
    },
  },
  mixins: [mixin]
})
