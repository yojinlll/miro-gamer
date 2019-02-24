<template>
  <div class="product-wrapper">
    <ul class="product-list">
      <li class="product-item">
        product
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "gamer-product",
    methods: {

    },

  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .product-wrapper{
    padding: 20px;
    border: 1px solid $border-color;


    .product-item{
      border: 1px solid $border-color;
      width: 100px;
      height: 200px;
    }
  }
</style>
