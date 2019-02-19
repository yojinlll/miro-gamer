<template>
  <transition name="fade">
    <div class="miro-aside" v-if="visible" ref="aside" :style="hideStyle">
      <slot></slot>
      <button class="button" @click="onHide">X</button>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "miroAside",
    data(){
      return {
        visible: true,
        hideStyle: {}
      }
    },
    mounted(){
      // console.log(this.$refs.aside.getBoundingClientRect().width)
    },
    methods: {
      onHide(){
        this.visible = false
        this.hideStyle.marginLeft = '-100px'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miro-aside {
    border: 1px solid black;
    position: relative;

    .button {
      position: absolute;
      right: 0;
    }
  }


  .fade-leave-active {
    transition: all .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
