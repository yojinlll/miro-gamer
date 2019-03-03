import Vue from 'vue'
import store from '@/modules/js/store.js'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './cart.scss'

import mixin from '@/modules/js/mixin.js'
import AV from 'leancloud-storage'
// import {mapState, mapActions} from 'vuex'

const currentUser = AV.User.current()


new Vue({
  el: '#app',
  store,
  data: {
    activeNames: '1',
    cartList: null,
    orderList: [],
    amount: null,
  },
  computed: {
    allSelected: {
      get(){
        if (this.cartList && this.cartList.length) {
          return this.cartList.every((goods) => {
            return goods.select
          })
        }
      },
      set(newVal){
        if (this.cartList && this.cartList.length) {
          this.cartList.forEach((goods) => {
            goods.select = newVal
          })
        }

      }
    },
    goodsTotal(){
      let total = 0
      if (this.cartList && this.cartList.length) {
        this.cartList.forEach((goods) => {
          if (goods.select) {
            total += + goods.price * goods.number
          }
        })
      }
      return total
    }
  },
  mounted(){
    this.checkLogin()
    this.getCartList()
  },
  methods: {
    getCartList(){
      this.cartList = currentUser.attributes.cart
      this.cartList.forEach((goods) => {
        this.$set(goods, 'select', false)
      })
    },
    changeGoodsNumber(goods, type){
      if (type === 'reduce') {
        this.cartList.forEach((item) => {
          if (item === goods) {
            if (item.number > 1) {
              item.number --
            }else if (item.number === 1) {
              let index = this.cartList.indexOf(item)
              this.cartList.splice(index, 1)
            }
          }
        })
      }else if (type === 'add') {
        this.cartList.forEach((item) => {
          if (item === goods) {
            item.number ++
          }
        })
      }
      this.updateLeanCloudCart()
    },
    onPay(){
      console.log(this.cartList)
      // console.log(this.goodsTotal)
    },
    selectGoods(goods){
      goods.select = ! goods.select
    },
    selectAllGoods(){
      this.allSelected = ! this.allSelected
    },
    removeGoods(){
      let array = null
      if (this.cartList && this.cartList.length) {
         array = this.cartList.filter((goods) => {
          return !goods.select
        })
      }
      this.cartList = array
      this.updateLeanCloudCart()

    },
    updateLeanCloudCart(){
      currentUser.set('cart', this.cartList)
      currentUser.save().then(()=>{
        console.log('更新')
      })
    }
  },
  mixins: [mixin]
})
