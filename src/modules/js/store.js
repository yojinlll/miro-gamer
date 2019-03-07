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
let upDatePaidList = function (list){
  currentUser.set('paid', list)        // 更新已付款列表
  currentUser.save()
}
let upDateEvaluation = function (goods){
  let query = new AV.Query('Evaluation');
  query.equalTo('id', goods.productId);
  query.find().then((item)=>{
    // 用户评价: 用户，评价时间，评价内容
    let array = item[0].attributes.userEvaluation
    let {username} = currentUser.attributes
    let obj = {
      username,
      text: goods.evaluateText,
    }
    let time = new Date()
    obj.time = time.toLocaleString()
    array.push(obj)
    let todo = AV.Object.createWithoutData('Evaluation', item[0].id);
    todo.set('userEvaluation', array);
    todo.save();
  })
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
      if(!currentUser.attributes.paid){return}
      state.paidList = currentUser.attributes.paid
    },
    confirmReceive(state, goods){
      state.paidList.forEach((item) => {
        if (item === goods) {
          item.receive = true
        }
      })
      upDatePaidList(state.paidList)
    },
    confirmEvaluate(state, goods){
      state.paidList.forEach((item) => {
        if (item === goods) {
          item.evaluate = true
          item.evaluateText = goods.evaluateText
        }
      })
      upDatePaidList(state.paidList)
      upDateEvaluation(goods)
    },

  },
  actions: {}
}

const store = new Vuex.Store({
  modules: {
    category: categoryModule,
    cart: cartModule,
  }
})

export default store
