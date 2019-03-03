import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import AV from 'leancloud-storage'

let handler = function (list,tag){
  let array = []
  if(list){
    list.forEach((item)=>{
      if(item.tag === tag){
        array.push(item)
      }
    })
  }
  return array
}

const store = new Vuex.Store({
  state: {
    allProduct: null,
    gameProduct: null,
    superProduct: null,
  },
  mutations: {
    setCategoryProduct(state, list){
      state.allProduct = list
      state.gameProduct = handler(state.allProduct,'game')
      state.superProduct = handler(state.allProduct,'super')
    },
  },
  actions: {
    getAllProduct({commit}){
      let allProduct = null
      let query = new AV.Query('Product')
      return query.find().then((list)=>{
        allProduct = list.map((item)=>{return item.attributes})
        commit('setCategoryProduct',allProduct)
      })
    }
  }
})

export default store
