<template>
  <div class="product-wrapper">
    <div class="product-info" v-if="currentProduct">
      <div class="img-part">
        {{currentProduct.img1}}
        {{currentProduct.img2}}
      </div>
      <div class="info-part">
        <div>{{currentProduct.name}}</div>
        <div>价格：<span>{{currentProduct.price}}</span></div>
        <div>
          数量：
          <span>-</span>
          <input type="text" v-model="count">
          <span>+</span>
        </div>
      </div>
    </div>
    <div class="product-evaluate"></div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "gamer-product",
    data(){
      return {
        currentProduct: null,
        count: 0,
      }
    },
    computed: {
      ...mapState(['allProduct']),
    },
    mounted(){
      if (! this.allProduct) {
        this.getAllProduct().then(() => {
          this.getCurrentProduct()
        })
      }else {
        this.getCurrentProduct()
      }
    },
    methods: {
      ...mapActions(['getAllProduct']),

      getCurrentProduct(){
        let {id} = this.$router.currentRoute.query
        if (this.allProduct) {
          this.allProduct.forEach((item) => {
            if (item.productId === id) {
              this.currentProduct = item
            }
          })
        }
      }
    },

  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .product-wrapper {
    margin: 70px auto;
    padding: 10px;
    border: 1px solid $border-color;
    width: 350px;

    .product-info {
      border: 1px solid $border-color;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .img-part,.info-part{
        border: 1px solid $border-color;
        width: 300px;
        height: 300px;
      }
    }
    .product-evaluate{
      margin-top: 50px;
      border: 1px solid $border-color;
      height: 200px;
    }
  }

  @media (max-width: 320px){ .product-wrapper{width: 310px;} }
  @media (min-width: 930px) {
    .product-wrapper{width: 700px;}
    .product-info{flex-direction: row !important;}
    .img-part,.info-part {border: 1px solid red;}
  }
</style>
