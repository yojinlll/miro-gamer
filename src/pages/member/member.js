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
      activeNames: 'one',
      userData: {
        user: null,
        phone: null,
        area: null,
        address: null
      },
      currentAddress: null,
      currentAddressId: null
    }
  },
  computed: {
    id(){
      let currentUser = AV.User.current()
      return currentUser.id
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
