<template>
  <div class="miro-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miroContent"
  }
</script>

<style lang="scss" scoped>
  .miro-content{
    border: 1px solid black;
  }
</style>