<template>
  <div class="miro-tabs-pane"
       :class="{'miro-pane-active': activePane}"
       v-show="activePane"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miro-tabs-pane",
    inject: ['eventBus'],
    data(){
      return {
        activePane: false
      }
    },
    props: {
      name: {
        type: String | Number,
        require: true
      }
    },
    mounted(){
      this.eventBus.$on('select', (name) => {
        this.name === name ? this.activePane = true : this.activePane = false
      })
    }

  }
</script>

<style lang="scss" scoped>
  $color: #f9f9f9;

  .miro-pane-active {
    border-radius: 6px;
    padding: 10px;
    background: $color;
  }
</style>