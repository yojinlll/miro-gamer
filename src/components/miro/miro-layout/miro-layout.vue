<template>
  <div class="miro-layout" :class="{hasAside}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miroLayout",
    data(){
      return {
        hasAside: false
      }
    },
    mounted(){
      this.$children.forEach((vm)=>{
        if(vm.$options.name === 'miroAside'){
          this.hasAside = true
        }
      })
    }

  }
</script>

<style lang="scss" scoped>
  .miro-layout{
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &.hasAside{
     flex-direction: row;
   }
  }
</style>