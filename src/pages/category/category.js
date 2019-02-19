import Vue from 'vue'
import '../../components/miro/svg.js'
import '@/modules/reset.css'
import '@/modules/common.css'
import './category.scss'

import Header from '@/components/miro-header.vue'
Vue.component('miro-header',Header)

new Vue({
  el: '#app',
  data: {
    categoryItem: ['全部', '游戏本', '轻薄本'],
    currentIndex: 0,
    sidebarToggle: true
  },
  methods: {
    selectCategory(index){        // 触发 li 样式
      this.currentIndex = index
    },
    onSidebar(e){
      this.sidebarToggle = e
    }
  }
})
