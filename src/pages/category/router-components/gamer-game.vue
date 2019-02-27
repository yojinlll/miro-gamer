<template>
  <div class="product-list-wrapper">
    <ul class="product-list clearFix">
      <li class="product-item" @click="xxx" v-for="item in gameProduct" v-if="gameProduct" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "gamer-game",
    computed: {
      ...mapState(['gameProduct'])
    },
    methods: {
      xxx(){
        this.$router.push({name: 'product'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .product-list-wrapper{
    padding: 20px;
    border: 1px solid $border-color;

    .clearFix::after{
      display: block;
      content: '';
      clear: both;
    }

    .product-item{
      background: white;
      border: 1px solid $border-color;
      width: 100px;
      height: 300px;
      margin: 10px 0 0 10px;
      float: left;
    }
  }
</style>

