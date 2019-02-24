import Vue from 'vue'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './member.scss'

import '@/components/miro/svg.js'

import mixin from '@/modules/js/mixin.js'
import AV from 'leancloud-storage'


new Vue({
  el: '#app',
  data(){
    return {
      activeNames: 'one'
    }
  },
  methods: {
    confirm(){
      let currentUser = AV.User.current()
      console.log(currentUser)
      if (currentUser) {
        console.log(currentUser.getSessionToken())
        return true
      }
    }
  },

  mixins: mixin
})
