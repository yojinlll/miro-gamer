<template>
  <div class="miro-header">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miroHeader"
  }
</script>

<style lang="scss" scoped>
  .miro-header{
    border: 1px solid black;
  }
</style>