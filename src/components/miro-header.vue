<template>
  <header class="miro-navbar">
      <span class="left-part">
        <svg class="icon" aria-hidden="true" @click="$emit('emit')" v-if="icon">
          <use xlink:href="#i-list"></use>
        </svg>
          <a href="member.html">Miro</a>
      </span>
    <div class="right-part">
      <a href="login.html">
        <svg class="icon cart-icon" aria-hidden="true">
          <use xlink:href="#i-cart"></use>
        </svg>
      </a><a href="login.html">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#i-member"></use>
        </svg>
      </a>
    </div>
  </header>
</template>
<script>
  import '@/components/miro/svg.js'

  export default {
    name: "miro-header",
    data(){
      return {
        link: {
          login: 'login.html',
          member: 'member.html',
          home: 'home.html'
        },
      }
    },
    props: {
      icon: {type:Boolean, default:false}
    }
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

    .left-part .icon {
      display: none;
      margin-right: 10px;
      color: $theme-color;
      cursor: pointer;
    }
    .right-part{
      .icon {
        font-size: 1.5em;
        vertical-align: bottom;
        cursor: pointer;
        color: #8e8e8e;
      }
      .cart-icon{
        font-size: 1em;
        vertical-align: middle;
        margin: 0 20px 5px 0;
      }
    }
  }

  @media (max-width: 720px) {

    .miro-layout-wrapper .miro-navbar {
      padding: 10px 20px;

      & .left-part .icon {display: inline-block;}
    }
  }

</style>
