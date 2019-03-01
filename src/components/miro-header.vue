<template>
  <header class="miro-navbar">
      <span class="left-part">
        <svg class="icon" aria-hidden="true" @click="$emit('emit')" v-if="icon">
          <use xlink:href="#i-list"></use>
        </svg>
          <span @click="goCategory">Miro</span>
      </span>
    <div class="right-part">
      <svg class="icon cart-icon" aria-hidden="true" @click="goCart">
        <use xlink:href="#i-cart"></use>
      </svg>
      <miro-popover position="bottom">
        <template slot="popover" v-if="currentUser">
          <div class="header-popover">
            <div class="popover-item"><a :href="link.member">个人中心</a></div>
            <div class="popover-item" @click="logOut">注销</div>
          </div>
        </template>
        <svg class="icon" aria-hidden="true" @click="goMemberCheck" :style="{color: iconColor}">
          <use xlink:href="#i-member"></use>
        </svg>
      </miro-popover>
    </div>
  </header>
</template>
<script>
  import '@/components/miro/svg.js'
  import mixin from '@/modules/js/mixin.js'
  import AV from 'leancloud-storage'

  export default {
    name: "miro-header",
    data(){
      return {
        link: {
          login: 'login.html',
          member: 'member.html',
          home: 'home.html',
          category: 'category.html#/all',
          cart: 'cart.html'
        },
        currentUser: null
      }
    },
    props: {
      icon: {type: Boolean, default: false}
    },
    computed: {
      iconColor(){
        if (this.currentUser) {
          return '#6fb46c'
        }else{
          return '#8e8e8e'
        }
      }
    },
    mounted(){
      this.currentUser = AV.User.current()
    },
    methods: {
      checkHandler(page){
        let login = this.link.login
        this.$toast(`需要登录才可访问${page}页面，2秒后跳转`, {
          autoClose: 2000,
          callback(){
            document.location.href = login
          }
        })
      },
      goCategory(){
        document.location.href = this.link.category
      },
      goMemberCheck(){
        if (! this.currentUser) {
          this.checkHandler('个人')
        }
      },
      goCart(){
        ! this.currentUser ? this.checkHandler('购物车') : document.location.href = this.link.cart
      },
      logOut(){
        AV.User.logOut()
        this.currentUser = AV.User.current()
        let category = this.link.category
        this.$toast('注销成功', {
          autoClose: 1000,
          callback(){
            document.location.href = category
            let event = new Event('click');
            document.dispatchEvent(event);
          }
        })
      }

    },
    mixins: mixin
  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .miro-navbar {
    padding: 10px 40px;
    height: 60px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    background: white;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5em;

    .left-part {
      span {cursor: pointer}
      .icon {
        display: none;
        margin-right: 10px;
        color: $theme-color;
        cursor: pointer;
      }
    }
    .right-part {
      .icon {
        font-size: 1.5em;
        vertical-align: bottom;
        cursor: pointer;
        color: #8e8e8e;
      }
      .cart-icon {
        font-size: 1em;
        vertical-align: middle;
        margin: 0 20px 5px 0;
      }
    }
  }

  .header-popover {
    background: white; padding: 0 10px; border-radius: 4px; transform: translateX(-70%);

    .popover-item {width: 5em; border-bottom: 1px solid #d1d3d6; cursor: pointer; padding: 10px 0;
      &:nth-child(2) {border: none;}
    }
  }

  @media (max-width: 720px) {

    .miro-layout-wrapper .miro-navbar {
      padding: 10px 20px;

      & .left-part .icon {display: inline-block;}
    }
  }

</style>
