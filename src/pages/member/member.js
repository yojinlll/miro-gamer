import Vue from 'vue'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './member.scss'

import '@/components/miro/svg.js'

import mixin from '@/modules/js/mixin.js'
import AV from 'leancloud-storage'

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
//   product.set('img1', item.img1);
//   product.set('img2', item.img2);
//   array.push(product)
// })
// AV.Object.saveAll(array)


new Vue({
  el: '#app',
  data(){
    return {
      activeNames: '2',
      // userName: null,
      userData: {   // 地址数据
        user: null,
        phone: null,
        area: null,
        address: null
      },
      currentAddress: null,       // 当前展示的地址数据
      currentAddressId: null      // 当前展示的地址数据的id
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
          // 新建地址
          console.log('新建地址')
          let Address = AV.Object.extend('Address')
          let address = new Address()
          this.setAddress(address)
          this.currentAddress = JSON.parse(JSON.stringify(this.userData))

          address.save().then(() => {
            console.log('done', address.id)
          })
        }else {
          // 更新地址
          console.log('更新地址')
          let address = AV.Object.createWithoutData('Address', this.currentAddressId)
          this.setAddress(address)
          this.currentAddress = JSON.parse(JSON.stringify(this.userData))

          address.save().then(() => {
            console.log('done', address.id)
          })
        }

        for (let key in this.userData) {
          this.userData[key] = null
        }
      }else{
        this.$toast('请填写输入框所需的地址信息',{position: 'middle',autoClose: 2000})
      }
    },
    queryAddress(){
      let query = new AV.Query('Address')
      query.equalTo('id', this.id)
      query.find().then((addressList) => {
        this.currentAddress = addressList[0].attributes
        this.currentAddressId = addressList[0].id        // 需要修改的地址对象id
      })
    },
    changeAddress(){
      this.userData = this.currentAddress
    },
    setAddress(className){
      className.set('id', this.id)
      className.set('user', this.userData.user)
      className.set('phone', this.userData.phone)
      className.set('area', this.userData.area)
      className.set('address', this.userData.address)
    }

  },

  mixins: [mixin]
})
