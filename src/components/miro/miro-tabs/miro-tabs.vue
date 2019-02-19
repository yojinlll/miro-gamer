<template>
  <div class="miro-tabs">
    <slot name="head"></slot>
    <div class="miro-tabs-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "miro-tabs",
    props: {
      select: ''
    },
    data(){return {eventBus: new Vue()}},
    provide(){return {eventBus: this.eventBus}},

    mounted(){
      this.updateName()
    },
    methods: {
      updateName(){
        // eventBus 用于监听当前 name 的值
        this.eventBus.$emit('select',this.select)
        this.eventBus.$on('select', (name)=>{

          // update 将当前 name 更新到 props
          this.$emit('update:select',name)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miro-tabs{
    /*border: 1px solid black;*/

    > .miro-tabs-body{
      padding: 10px;
    }
  }
</style>