<template>
  <div class="product-wrapper" v-if="currentProduct">
    <div class="product-info" >
      <div class="img-part">
        <div class="img-main">
          <img :src="showImg" alt="show-product-img">
        </div>
        <div class="img-list">
          <div @click="selectImg(img)" v-for="img in currentProduct.img">
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
        <div class="number-info">
          数量：
          <span @click="changeNumber('reduce')">-</span>
          <input type="text" v-model="number">
          <span @click="changeNumber('add')">+</span>
        </div>
        <div class="actions">
          <miro-button-group>
            <miro-button @click="addCart(number)">立即购买</miro-button>
            <miro-button @click="addCart(number)">添加购物车</miro-button>
          </miro-button-group>
        </div>
      </div>
    </div>
    <div class="product-detail" >
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
        <miro-tabs-pane name="2">
          <ul class="user-evaluation">
            <li v-for="(item, index) in evaluation" :key="index">
              <span class="username">
                {{item.username}}:
              </span>
              <div class="content">{{item.text}}</div>
              <div class="time">——&nbsp;{{item.time}}</div>
            </li>
          </ul>
          <div style="line-height: 100px; text-align: center;" v-if="!evaluation.length">空</div>
        </miro-tabs-pane>
      </miro-tabs>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import AV from 'leancloud-storage'
  import Loading from './gamer-loading'


  export default {
    name: "gamer-product",
    data(){
      return {
        evaluation: [],
        currentProduct: null,
        number: 0,
        showImg: null,
        activeNames: '1'
      }
    },
    computed: {
      ...mapState(['category']),
    },
    mounted(){
      if (! this.category.allProduct) {
        this.getAllProduct().then(() => {
          this.getCurrentProduct()
        })
      }else {
        this.getCurrentProduct()
      }
      this.getProductEvaluation()
    },
    methods: {
      ...mapActions(['getAllProduct']),

      getCurrentProduct(){
        // 通过查询字符串获取对应产品数据
        let {id} = this.$router.currentRoute.query
        if (this.category.allProduct) {
          this.category.allProduct.forEach((item) => {
            if (item.productId === id) {
              this.currentProduct = item
            }
          })
        }
      },
      getProductEvaluation(){
        let {id} = this.$router.currentRoute.query
        let productEvaluation = new AV.Query('Evaluation');
        productEvaluation.equalTo('id', id);
        productEvaluation.find().then((result)=>{
          this.evaluation = result[0].attributes.userEvaluation
        })
      },
      selectImg(img){
        this.showImg = img
      },
      changeNumber(type){
        if (type === 'reduce') {
          if (this.number !== 0) {
            this.number --
          }
        }else {
          this.number ++
        }

      },
      addCart(number){
        if(number !== 0){
          // 获取用户
          let currentUser = AV.User.current()
          // 获取当前时间
          let d = new Date()
          let time = d.toLocaleString()
          // 获取当前展示产品的数据
          let {productId} = this.currentProduct
          let product = {...this.currentProduct, number,time}
          // 设置购物单
          let cart = []
          if(currentUser.attributes.cart){cart = currentUser.attributes.cart}
          // 关联锁
          let exist = false
          // 产品存在，则修改
          cart.forEach((item)=>{
            if(item.productId === productId){
              exist = true
              item.number = item.number + number
              item.time = time
            }
          })
          // 产品不存在，则添加
          if(exist===false){cart.unshift(product)}
          currentUser.set('cart', cart)
          currentUser.save().then(()=>{
            this.number = 0
            this.$toast('已添加到购物车',{position:'middle',center: true})
          })
        }else {
          this.$toast('未选择购买数量',{position:'middle',center: true,autoClose:2000})
        }
      }
    },
    watch: {
      currentProduct(val){
        this.showImg = val.img[0]
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

  .product-wrapper {
    min-height: 500px;
    margin: 70px auto;
    padding: 10px;
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
          padding: 10px;

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

        .price-info, .number-info {
          margin-top: 30px;

          input {
            border: 1px solid $border-color;
            border-radius: 4px;
            width: 30px;
            height: 30px;
            text-align: center;
          }
        }
        .price-info > span {color: #e86464}
        .number-info {
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

      .tabs-details {
        padding: 20px;

        .details-list {
          float: left;
          padding-right: 50px;

          li {padding: 5px 0;}
        }
      }
      .user-evaluation{
        width: 100%;

        li{
          background: #fff;
          margin-bottom: 20px;
          padding: 10px;

          .username{
            display: inline-block;
            padding: 0 5px;
            color: $theme-color
          }
          .content{padding: 10px 20px;}
          .time{margin-left: auto; width: 200px; color: #537dbd; font-size: 14px;}

          &:last-child{margin-bottom: 0;}
        }
      }
    }
  }

  .clearFix::after {
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
