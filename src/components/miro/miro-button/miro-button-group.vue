<template>
  <div class="miro-button-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miroButtonGroup",
    mounted(){
      for (let node of this.$el.children) {
        let name = node.nodeName.toLowerCase()
        if (name !== 'button') {
          console.warn(`miro-button-group 的子元素应该是 miro-button，不应该是 ${name}。`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-radius: 6px;

  .miro-button-group {
    display: inline-flex;
    vertical-align: middle;

    > .miro-button {
      border-radius: 0;

      &:not(:first-child) {
        margin-left: -1px;
      }

      &:first-child {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
      }
      &:last-child {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
  }
</style>
