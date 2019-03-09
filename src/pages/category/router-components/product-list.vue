<template>
  <div class="product-list-wrapper">
    <ul class="product-list clearFix" ref="list" :style="{paddingLeft: padding+'px'} ">
      <li class="product-item" @click="goProduct(item.productId)" v-for="item in list"
          v-if="category.allProduct" :key="item.id" ref="item">
        <img class="img" :src="item.img[0]">
        <div class="price">
          ￥{{item.price.toFixed(2)}}
        </div>
        <div class="name">
          {{item.name}}
        </div>
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
        lock: false,
        array: ["//img10.360buyimg.com/n1/s450x450_jfs/t16129/142/2493125586/322566/fb5d0fba/5ab0d977Nfacb1e3d.jpg","//img10.360buyimg.com/n1/s450x450_jfs/t17062/19/876647468/328159/6c6387dc/5ab0d977Nc5ea09b8.jpg"]
      }
    },
    computed: {
      ...mapState(['category']),

      list(){
        return this.category[`${this.name}Product`]
      }     // 根据路由选择展示的产品类型
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
        if (this.lock) {
          return
        }
        this.lock = true
        setTimeout(() => {
          this.windowResize()
          this.lock = false
        }, 500)
      },
      windowResize(){     // 计算 category 分类页的产品列表如何居中 (./product-list.vue)
        if (this.$refs.list) {
          if (this.$refs.list.clientWidth < 689) {
            this.padding = (this.$refs.list.clientWidth - 220) / 2 - 20

          }else if (this.$refs.list.clientWidth < 1039) {
            this.padding = (this.$refs.list.clientWidth - 220 * 2) / 2 - 20 * 2

          }else if (this.$refs.list.clientWidth < 1500) {
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
      cursor: pointer;
      overflow: hidden;

      .img {
        height: 220px;
        width: 220px;
      }
      .price {
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        color: #e86464;
      }
      .name {
        padding: 0 10px;
        display: inline-block;
        width: 220px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
</style>
