import Vue from 'vue'

import '@/modules/css/reset.css'
import '@/modules/css/common.css'
import './login.scss'

import mixin from '@/modules/js/mixin.js'       // miro 组件引入
import AV from 'leancloud-storage'


new Vue({
  el: '#app',
  data(){
    return {
      username: null,
      password: null
    }
  },
  methods: {
    signup(){
      if (this.username && this.password) {

        let user = new AV.User()
        user.setUsername(this.username)
        user.setPassword(this.password)
        user.signUp().then(function (loggedInUser){
          console.log('注册成功', 1111)
        }, function (error){
          console.log('注册失败，该用户名已存在。')
        }).then(() => {

          AV.User.logIn(this.username, this.password).then(function (loggedInUser){
            console.log('登录成功', 2222)
          }, function (error){}).then(()=>{this.goMember()})
        })
      }else {
        this.$toast('请填写用户名及登录密码',{center:true,autoClose: 2000})
      }
    },
    logout(){
      AV.User.logOut()
    },
    confirm(){
      let currentUser = AV.User.current()
      console.log('无用户登录')

      if (currentUser) {

        console.log(currentUser.getSessionToken())
        this.goMember()

        return true
      }
    },
    goMember(){
      this.$toast('登录成功，页面将在两秒后跳转', {
        autoClose: 2000,
        center: true
      })
      setTimeout(() => {
        document.location.href = 'member.html'
      },2000)
    }

  },
  mixins: mixin
})
