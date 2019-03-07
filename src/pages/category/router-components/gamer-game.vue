<template>
  <div class="product-list-wrapper">
    <ul class="product-list clearFix">
      <li class="product-item" @click="goProduct(item.productId)" v-for="item in category.gameProduct" v-if="category.gameProduct" :key="item.id">
        {{item.name}}
      </li>
    </ul>
    <gamer-loading v-if="!category.allProduct"></gamer-loading>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Loading from './gamer-loading'

  export default {
    name: "gamer-game",
    computed: {
      ...mapState(['category'])
    },
    mounted(){
      if(!this.category.gameProduct){
        this.getAllProduct()
      }
    },
    methods: {
      ...mapActions(['getAllProduct']),

      goProduct(id){
        this.$router.push({name: 'product',query: { id:id }})
      }
    },
    components: {
      'gamer-loading': Loading
    }
  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .product-list-wrapper{
    min-height: 500px;
    padding: 20px;

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

