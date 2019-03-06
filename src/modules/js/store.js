import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import AV from 'leancloud-storage'
import '@/modules/js/leanCloud-init'

const currentUser = AV.User.current()

let categoryHandler = function (list, tag){
  let array = []
  if (list) {
    list.forEach((item) => {
      if (item.tag === tag) {
        array.push(item)
      }
    })
  }
  return array
}

const categoryModule = {
  state: {
    allProduct: null,
    gameProduct: null,
    superProduct: null,
  },
  mutations: {
    setCategoryProduct(state, list){
      state.allProduct = list
      state.gameProduct = categoryHandler(state.allProduct, 'game')
      state.superProduct = categoryHandler(state.allProduct, 'super')
    },
  },
  actions: {
    getAllProduct({commit}){
      let allProduct = null
      let query = new AV.Query('Product')
      return query.find().then((list) => {
        allProduct = list.map((item) => {
          return item.attributes
        })
        commit('setCategoryProduct', allProduct)
      })
    }
  }
}
const cartModule = {
  state: {
    paidList: null
  },
  mutations: {
    setPaidList(state){
      state.paidList = currentUser.attributes.paid
    },
    confirmReceive(state,goods){
      state.paidList.forEach((item)=>{
        if(item===goods){
          goods.receive = true
        }
      })
    },
    confirmEvaluate(state,goods){
      state.paidList.forEach((item)=>{
        if(item===goods){
          goods.evaluate = true
        }
      })
    }
  }
}

const store = new Vuex.Store({
  modules: {
    category: categoryModule,
    cart: cartModule,
  }
})

export default store
