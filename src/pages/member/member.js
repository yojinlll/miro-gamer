import Vue from 'vue'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './member.scss'

import '@/components/miro/svg.js'

import mixin from '@/modules/js/mixin.js'
import AV from 'leancloud-storage'
import {LeanCloudHandler} from '@/modules/js/utils.js'


const currentUser = AV.User.current() // 获取当前用户

// import {all} from '@/modules/js/productData.js'
// let Product = AV.Object.extend('Product')
// let array = []
// all.forEach((item)=>{
//   let product = new Product()
//   product.set('name', item.name);
//   product.set('productId', item.id);
//   product.set('tag', item.tag);
//   product.set('price', item.price);
//   product.set('img', item.img);
//   array.push(product)
// })
// AV.Object.saveAll(array)

// import {all} from '@/modules/js/productData.js'
// let allId = all.map((item)=>{
//   return item.id
// })
// console.log(allId)
// let Evaluation = AV.Object.extend('Evaluation')
// let array = []
// allId.forEach((item)=>{
//   let evaluation = new Evaluation()
//   evaluation.set('id', item);
//   evaluation.set('userEvaluation', []);
//   array.push(evaluation)
// })
// AV.Object.saveAll(array)


new Vue({
  el: '#app',
  data(){
    return {
      activeNames: '1',
      userData: {   // 地址数据
        user: null,
        phone: null,
        area: null,
        address: null
      },
      currentAddress: null,       // 当前展示的地址数据
    }
  },
  computed: {
    id(){       // 用户id
      return currentUser.id
    },
    userName(){   // 用户注册名
      return currentUser.attributes.username
    }
  },
  mounted(){
    this.checkLogin()
    this.queryAddress()
  },
  methods: {
    confirm(){
      console.log(this.id)
    },
    saveAddress(){

      if (this.userData.user && this.userData.phone && this.userData.area && this.userData.address) {

        if (! this.currentAddress) {
          console.log('新建地址')
          this.setAddress()
        }else {
          // 更新地址
          console.log('更新地址')
          this.setAddress()
        }

        for (let key in this.userData) {        // 清空 input
          this.userData[key] = null
        }
      }else{
        this.$toast('请填写输入框所需的地址信息',{position: 'middle',autoClose: 2000})
      }
    },
    setAddress(){
      currentUser.set('address',this.userData)
      currentUser.save()
      this.currentAddress = JSON.parse(JSON.stringify(this.userData))
    },
    queryAddress(){
      this.currentAddress = currentUser.attributes.address
    },
    changeAddress(){
      this.userData = this.currentAddress
    }
  },

  mixins: [mixin]
})
