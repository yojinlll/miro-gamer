<template>
  <div class="miro-row" :style="wrap">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miroRow",
    props: {
      gutter: {
        type: [Number, String]
      }
    },
    computed: {
      wrap(){
        // 添加 gutter 属性后无法在 span 为 24 时，实现换行
        if (!this.gutter) return {flexWrap:'wrap'}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miro-row {
    display: flex;
  }

</style>