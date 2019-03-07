import Vue from 'vue'
import router from './router-components/router'
import store from '@/modules/js/store.js'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './category.scss'

import Header from '@/components/miro-header.vue'
Vue.component('miro-header', Header)

new Vue({
  el: '#app',
  router,
  store,
  data: {
    categoryItem: {
      all: {name: '全部', path: 'all'},
      game: {name: '游戏本', path: 'game'},
      super: {name: '超级本', path: 'super'},
    },
    currentPath: 'all',
    sidebarHide: true,
  },
  mounted(){
    this.currentPath = this.$router.currentRoute.name
  },
  methods: {
    selectCategory(path){        // 触发 li 样式
      this.currentPath = path
      this.$router.push({path: path})
      this.sidebarHide = true
    },
    onSidebar(){
      this.sidebarHide = !this.sidebarHide
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPath = to.name
    }
  }
})
