<template>
  <div class="goods-unpaid-wrapper">
    <ul>
      <li v-for="goods in unpaidList" class="goods-item" :key="goods.productId">
              <span class="select-button"
                    @click="selectGoods(goods)"
                    :class="{select: goods.select === true}"
              >
              </span>
        <img :src="goods.img[0]" alt="goods">
        <span class="item-goods-name" @click="goProduct(goods.productId)">
                {{goods.name}}
              </span>
        <div class="item-part">
          <div class="item-goods-actions">
            <span class="action-button" @click="changeGoodsNumber(goods,'reduce')">-</span>
            <input type="text" :value="goods.number" readonly>
            <span class="action-button" @click="changeGoodsNumber(goods,'add')">+</span>
          </div>
          <div class="item-goods-price">
            ￥{{goods.price.toFixed(2)}}
          </div>
        </div>
      </li>
    </ul>

    <div class="placeholder" v-if="(unpaidList && unpaidList.length === 0)">空</div>

    <div class="action-bar">
      <div class="action-bar-button">
        <span class="select-button" @click="selectAllGoods" :class="{select: allSelected === true}"></span>
        <span>全选</span>
        <span class="remove" @click="removeGoods">删除</span>
      </div>
      <div class="select-info">
        ({{amount}}件)合计：
        <span class="total" v-if="goodsTotal!=0">￥{{goodsTotal.toFixed(2)}}</span>
        <span v-else>0</span>
      </div>
      <div class="pay" @click="onPay">
        结算
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '@/modules/js/mixin.js'       // AV init
  import AV from 'leancloud-storage'

  const currentUser = AV.User.current()

  export default {
    name: "goods-unpaid",
    data(){
      return {
        unpaidList: null,
        paidList: null,
      }
    },
    computed: {
      allSelected: {
        get(){
          if (this.unpaidList && this.unpaidList.length) {
            return this.unpaidList.every((goods) => {
              return goods.select
            })
          }
        },
        set(newVal){
          if (this.unpaidList && this.unpaidList.length) {
            this.unpaidList.forEach((goods) => {
              goods.select = newVal
            })
          }

        }
      },
      goodsTotal(){
        let total = 0
        if (this.unpaidList && this.unpaidList.length) {
          this.unpaidList.forEach((goods) => {
            if (goods.select) {
              total += + goods.price * goods.number
            }
          })
        }
        return total
      },
      amount(){
        let paid = []
        if (this.unpaidList && this.unpaidList.length) {
          this.unpaidList.forEach((goods) => {
            if (goods.select) {
              paid.push(goods)
            }
          })
        }
        return paid.length
      }
    },
    mounted(){
      this.getCartList()
      this.getPaidList()
    },
    methods: {
      getCartList(){
        this.unpaidList = currentUser.attributes.cart
        this.unpaidList.forEach((goods) => {
          this.$set(goods, 'select', false)
        })
      },
      getPaidList(){
        this.paidList = currentUser.attributes.paid
        if(!this.paidList){this.paidList = []}
      },
      selectGoods(goods){
        goods.select = ! goods.select
      },
      selectAllGoods(){
        this.allSelected = ! this.allSelected
      },
      removeGoods(){            // 删除商品
        let array = null
        if (this.unpaidList && this.unpaidList.length) {
          array = this.unpaidList.filter((goods) => {
            return ! goods.select
          })
        }
        this.unpaidList = array
        this.updateLeanCloudCart()
      },
      goProduct(id){            // 商品页跳转
        location.href = `category.html#/product?id=${id}`
      },
      changeGoodsNumber(goods, type){         // 更新商品数量
        if (type === 'reduce') {
          this.unpaidList.forEach((item) => {     // 数量减1，当前数量为1则从数组中移除
            if (item === goods) {
              if (item.number > 1) {
                item.number --
              }else if (item.number === 1) {
                let index = this.unpaidList.indexOf(item)
                this.unpaidList.splice(index, 1)
              }
            }
          })
        }else if (type === 'add') {
          this.unpaidList.forEach((item) => {
            if (item === goods) {
              item.number ++
            }
          })
        }
        this.updateLeanCloudCart()
      },
      updateLeanCloudCart(){
        currentUser.set('cart', this.unpaidList)
        currentUser.save()
      },
      onPay(){
        let paid = []
        let unpaid = []
        if (this.unpaidList && this.unpaidList.length) {
          this.unpaidList.forEach((goods) => {
            if (goods.select) {
              let time = new Date()
              goods.time = time.toLocaleString()
              goods.receive = false
              goods.evaluate = false
              paid.push(goods)
            }else {
              unpaid.push(goods)
            }
          })
        }
        this.paidList = [...this.paidList, ...paid]
        this.unpaidList = unpaid
        currentUser.set('cart', this.unpaidList)        // 更新未付款列表
        currentUser.set('paid', this.paidList)        // 更新已付款列表
        currentUser.save()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: #2c3e50;
  $border-color: #d1d3d6;
  $duration: .3s;
  $theme-color: #6fb46c;

  .extendStyle {
    background: white;
    border-radius: 4px;
    padding: 20px 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .goods-unpaid-wrapper {
    .select-button {
      cursor: pointer;
      display: inline-block;
      height: 1em;
      width: 1em;
      border: 1px solid #abadb0;
      margin: 10px;

      &.select::before {
        content: '✓';
        display: inline-block;
        text-align: center;
        transform: translateY(-20%);
      }
    }

    .goods-item {
      @extend .extendStyle;

      img {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        vertical-align: top;
      }

      .item-goods-name {
        display: inline-block;
        width: 300px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        cursor: pointer;

        &:hover {color: $theme-color}
      }

      .item-part {
        margin: 0 10px 0 auto;
        text-align: center;

        .item-goods-actions {
          .action-button {
            display: inline-block;
            width: 1em;
            cursor: pointer;
            font-size: 20px;
            user-select: none;
          }

          input {
            border: 1px solid #d1d3d6;
            border-radius: 4px;
            height: 30px;
            width: 30px;
            text-align: center;
          }
        }
        .item-goods-price {
          padding-top: 1em;
          font-size: 14px;
          color: orangered;
        }
      }
    }
    .placeholder {text-align: center; margin: 100px 0;}
    .action-bar {
      height: 70px;
      background: white;
      display: flex;
      align-items: center;

      .action-bar-button {
        display: flex;
        align-items: center;

        .remove {
          display: inline-block; margin-left: 10px; color: coral;
          cursor: pointer; user-select: none;
        }
      }
      .select-info {
        margin: 0 20px 0 auto; font-size: 14px;

        .total {color: orangered;}
      }

      .pay {
        width: 100px;
        height: 100%;
        color: white;
        background: #61d0fa;
        //background: #ff6b5c;
        line-height: 70px;
        text-align: center;
        font-size: 1.5em;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 870px) {
    .goods-unpaid-wrapper {

      .goods-item > .item-goods-name {
        width: 200px;
      }
    }
  }

  @media (max-width: 720px) {
    .goods-unpaid-wrapper {

      .goods-item > .item-goods-name {
        width: 100px;
      }
      & .action-bar .select-info {margin: 0 7px 0 auto !important; width: 80px !important;}
    }
  }

</style>
