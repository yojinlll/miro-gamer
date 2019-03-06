<template>
  <div>
    <ul class="goods-list" v-if="list">
      <li class="goods-item" v-for="(goods,index) in list" :key="index">
        <div class="goods-time">{{goods.time}}</div>
        <div class="goods-info-1">
          <img :src="goods.img[0]" alt="goods">
          <span class="item-goods-name" @click="goProduct(goods.productId)">
                  {{goods.name}}
              </span>
          <div class="action-button" @click="actions(goods)">
            <miro-button one v-if="!goods.receive">确认收货</miro-button>
            <miro-button two v-else-if="goods.receive && !goods.evaluate" @click="onPopover(goods)">评价商品</miro-button>
            <miro-button three v-else-if="goods.receive && goods.evaluate" @click="goProduct(goods.productId)">
              查看评价
            </miro-button>
          </div>
        </div>
        <div class="goods-info-2">
        <span class="info">
          数量：{{goods.number}}
        </span>
          <span class="info">
          单价：￥{{goods.price.toFixed(2)}}
        </span>
          <span class="info">
          实付：￥{{(goods.price * goods.number).toFixed(2)}}
        </span>
        </div>
      </li>
    </ul>
    <div class="placeholder">空</div>
    <div class="evaluate-frame" v-if="popoverActive">
      <miro-button @click="popoverActive = false">
        close
      </miro-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import AV from 'leancloud-storage'
  const currentUser = AV.User.current()

  export default {
    name: "goods-list",
    data(){
      return {
        popoverActive: false
      }
    },
    props: {list: Array},
    computed:{
      ...mapState(['cart'])
    },
    methods: {
      ...mapMutations(['confirmReceive','confirmEvaluate']),

      goProduct(id){
        // location.href = `category.html#/product?id=${id}`
      },
      actions(goods){
        if (! goods.receive) {
          this.confirmReceive(goods)
        }else if (goods.receive && ! goods.evaluate) {
          this.confirmEvaluate(goods)
        }
        // currentUser.set('paid', this.cart.paidList)        // 更新已付款列表
        // currentUser.save()
      },
      onPopover(index){
        this.popoverActive = true
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
    padding: 15px;
    margin-bottom: 20px;
  }

  .goods-item {
    @extend .extendStyle;

    .goods-time {
      padding-bottom: 5px; border-bottom: 1px solid $border-color;
      margin-bottom: 1em;font-size: 12px;
    }

    .goods-info-1 {
      display: flex;align-items: center;

      img {margin-right: 10px;width: 60px;height: 60px;vertical-align: top;}

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
      .action-button {
        margin-left: auto;

        .miro-button[one] {background: #ff6448; border: none; color: white;}
        .miro-button[two] {background: #8ab7ff; border: none; color: white;}
        .miro-button[three] {background: #82d07f; border: none; color: white;}
      }
    }
    .goods-info-2 {
      font-size: 14px;padding-top: 5px;margin-top: 1em;

      .info {margin-right: 10px;font-size: 12px;}
    }
  }

  .placeholder {text-align: center; margin: 100px 0;}

  .evaluate-frame {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50vh;
    width: 50vw;
    background: rgba(214, 214, 214, 0.4);
  }

  @media (max-width: 950px) {
    .paid-goods-wrapper .goods-item .goods-info-1 .item-goods-name {width: 200px;}
  }

  @media (max-width: 780px) {
    .evaluate-frame {width: 95vw !important;}
  }

  @media (max-width: 600px) {
    .paid-goods-wrapper .goods-item .goods-info-1 .item-goods-name {width: 100px;}
  }

</style>
