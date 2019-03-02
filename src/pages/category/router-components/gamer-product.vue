<template>
  <div class="product-wrapper">
    <div class="product-info" v-if="currentProduct">
      <div class="img-part">
        <div class="img-main">
          <img :src="showImg" alt="show-product-img">
        </div>
        <div class="img-list">
          <div @click="log(img)" v-for="img in currentProduct.img">
            <img :src="img" alt='product-img'>
          </div>
        </div>
      </div>
      <div class="info-part">
        <div>{{currentProduct.name}}</div>
        <div class="price-info">
          价格：
          <span>￥{{currentProduct.price}}</span>
        </div>
        <div class="amount-info">
          数量：
          <span class="minus" @click="changeAmount('minus')">-</span>
          <input type="text" v-model="amount">
          <span class="add" @click="changeAmount('add')">+</span>
        </div>
        <div class="actions">
          <miro-button-group>
            <miro-button>立即购买</miro-button>
            <miro-button>添加购物车</miro-button>
          </miro-button-group>
        </div>
      </div>
    </div>
    <div class="product-detail">
      <miro-tabs :select.sync="activeNames">
        <miro-tabs-head slot="head">
          <miro-tabs-item name="1">商品详情</miro-tabs-item>
          <miro-tabs-item name="2">商品评价</miro-tabs-item>
        </miro-tabs-head>

        <miro-tabs-pane name="1" class="tabs-details clearFix">
          <ul class="details-list">
            <li>品牌: XXXX</li>
            <li>内存容量: 16G</li>
            <li>售后服务: 全国联保</li>
            <li>分辨率: 1920x1080</li>
            <li>厚度: 20.0mm及以上</li>
            <li>重量: 2.5kg及以上</li>
            <li>是否触摸屏: 非触摸屏</li>
            <li>是否超极本: 否</li>
            <li>操作系统: windows 10</li>
          </ul>
          <ul class="details-list">
            <li>通信技术类型: 无线网卡 蓝牙</li>
            <li>是否PC平板二合一: 否</li>
            <li>机械硬盘容量: 1TB</li>
            <li>屏幕尺寸: 17.3英寸</li>
            <li>显存容量: 8GB</li>
            <li>固态硬盘: 256GB</li>
            <li>CPU: 英特尔 酷睿 i7-8750H</li>
            <li>屏幕比例: 16:9</li>
            <li>屏幕刷新率: 144HZ</li>
            <li>锂电池电芯数量: 6芯锂电池</li>
          </ul>
        </miro-tabs-pane>
        <miro-tabs-pane name="2" style="line-height: 100px; text-align: center">
          商品评价
        </miro-tabs-pane>
      </miro-tabs>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "gamer-product",
    data(){
      return {
        currentProduct: null,
        amount: 0,
        showImg: null,
        activeNames: '1'
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
      },
      log(img){
        this.showImg = img
      },
      changeAmount(type){
        if (type === 'minus') {
          if (this.amount !== 0) {
            this.amount --
          }
        }else {
          this.amount ++
        }

      }
    },
    watch: {
      currentProduct(val){
        this.showImg = val.img[0]
      }
    }
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .img-part, .info-part {
        width: 300px;
        /*height: 300px;*/
      }

      .img-part {
        display: flex; flex-direction: column; justify-content: flex-end;
        .img-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          img {
            width: 300px;
            height: 300px;
          }
        }
        .img-list {
          div {
            border: 1px solid white;
            display: inline-block;
            cursor: pointer;

            &:hover {border: 1px solid $border-color;}

            img {
              padding: 5px;
              width: 45px;
              height: 45px;
            }
          }
        }
      }

      .info-part {
        /*border: 1px solid blue;*/
        padding: 50px 20px 20px 20px;

        .price-info, .amount-info {
          margin-top: 30px;

          input {
            border: 1px solid $border-color;
            border-radius: 4px;
            width: 30px;
            height: 30px;
            text-align: center;
          }
        }
        .price-info > span{color: #e86464}
        .amount-info {
          display: flex;
          align-items: center;

          span {
            margin: 0 10px;
            font-size: 1.3em;
            cursor: pointer;
            user-select: none;
          }
        }

        .actions {
          margin-top: 50px;
          border-top: 1px solid $border-color;
          padding-top: 30px;
          text-align: center;

          .miro-button {
            border-radius: 0;
            width: 120px;
            height: 50px;
          }

        }
      }
    }
    .product-detail {
      margin-top: 50px;
      border: 1px solid $border-color;
      padding: 10px;

      .tabs-details{
        padding: 20px;

        .details-list{
          float: left;
          padding-right: 50px;

          li{padding: 5px 0;}
        }
      }
    }
  }

  .clearFix::after{
    display: block;
    content: '';
    clear: both;
  }

  @media (max-width: 320px) {
    .product-wrapper {width: 310px;}
  }

  @media (min-width: 930px) {
    .product-wrapper {
      width: 700px;
      .product-info {
        flex-direction: row !important;
        .img-part, .info-part {
          width: 400px;
          height: 400px;
        }
      }
    }

  }
</style>
