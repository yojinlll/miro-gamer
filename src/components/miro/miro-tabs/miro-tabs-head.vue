<template>
  <div class="miro-tabs-head" >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miro-tabs-head",
    // inject: ['eventBus'],
    mounted(){
      // console.log(this.eventBus,344)
    }
  }
</script>

<style lang="scss" scoped>
  $tab-height: 40px;

  .miro-tabs-head{
    /*border: 1px solid orangered;*/
    display: flex;
    height: $tab-height;
    justify-content: flex-start;
    align-items: center;
  }
</style>