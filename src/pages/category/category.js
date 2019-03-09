import Vue from 'vue'
import router from './router-components/router'
import store from '@/modules/js/store.js'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './category.scss'

import Header from '@/components/miro-header.vue'
import Loading from './router-components/gamer-loading'
Vue.component('miro-header', Header)

import {mapState} from 'vuex'

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
    scrollToTop: false
  },
  computed: {
    ...mapState(['category'])
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
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
    },
    toTop(){
      document.documentElement.scrollTop = 0
    },

    handleScroll(){
      document.documentElement.scrollTop > 200 ? this.scrollToTop = true : this.scrollToTop = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPath = to.name
    }
  }
})
