<template>
  <div class="product-list-wrapper">
    <ul class="product-list clearFix" ref="list" :style="{paddingLeft: padding+'px'} ">
      <li class="product-item" @click="goProduct(item.productId)" v-for="item in list"
          v-if="category.allProduct" :key="item.id" ref="item">
        <img class="img" :src="item.img[0]">
        <div class="price">
          {{item.price}}
        </div>
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import mixin from '@/modules/js/mixin.js'

  export default {
    name: "product-list",
    data(){
      return {
        name: this.$router.currentRoute.name,
        padding: 0,      // 窗口变化时计算padding值
        lock: false
      }
    },
    computed: {
      ...mapState(['category']),

      list(){return this.category[`${this.name}Product`]}     // 根据路由选择展示的产品类型
    },
    mounted(){
      if (! this.category.allProduct) {
        this.getAllProduct()
      }
      this.windowResize()
      window.onresize = this.windowResize
    },
    methods: {
      ...mapActions(['getAllProduct']),

      goProduct(id){
        this.$router.push({name: 'product', query: {id: id}})
      },
      debounce(){
        if(this.lock){ return }
        this.lock = true
        setTimeout(()=>{
          this.windowResize()
          this.lock = false
        },500)
      },
      windowResize(){     // 计算 category 分类页的产品列表如何居中 (./product-list.vue)
        if(this.$refs.list){
          if (this.$refs.list.clientWidth < 689) {
            this.padding = (this.$refs.list.clientWidth - 220) / 2 - 20

          }else if (this.$refs.list.clientWidth < 1039) {
            this.padding = (this.$refs.list.clientWidth - 220 * 2) / 2 - 20 * 2

          }else if(this.$refs.list.clientWidth < 1500){
            this.padding = 40
          }
        }
      }

    },
    watch: {
      $route(to){
        this.name = to.name
      }
    },
    mixins: [mixin]
  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .product-list-wrapper {
    min-height: 500px;
    padding: 50px 20px 200px 20px;

    .clearFix::after {
      display: block;
      content: '';
      clear: both;
    }

    /*.product-list {border: 1px solid black;}*/
    .product-item {
      background: white;
      border: 1px solid $border-color;
      width: 220px;
      height: 350px;
      margin: 30px 0 0 20px;
      float: left;

      .img{
        height: 210px;
        width: 210px;
        border: 1px solid red;
      }
      .price{
        height: 50px;
        border: 1px solid blue;
      }
    }
  }
</style>
