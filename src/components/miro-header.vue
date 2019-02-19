<template>
  <header class="miro-navbar">
      <span class="left-part">
        <svg class="icon" aria-hidden="true" @click="onEmit" v-if="icon">
          <use xlink:href="#i-list"></use>
        </svg>
          Miro
      </span>
    <div class="right-part">
      <a href="login.html">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#i-member"></use>
        </svg>
      </a>
    </div>
  </header>
</template>
<script>
  export default {
    name: "miro-header",
    data(){
      return {
        isToggle: true
      }
    },
    props: {
      icon: {type:Boolean, default:false}
    },
    methods: {
      onEmit(){
        this.isToggle = ! this.isToggle
        this.$emit('emit',this.isToggle)
      }
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
    .right-part .icon {
      font-size: 1.5em;
      vertical-align: bottom;
      cursor: pointer;
    }
  }

  @media (max-width: 720px) {

    .miro-layout-wrapper .miro-navbar {padding: 10px 20px;}
    .miro-layout-wrapper .miro-navbar .left-part .icon {display: inline-block;}

  }

</style>
