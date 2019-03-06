<template>
  <div class="paid-goods-wrapper">
    <miro-tabs :select.sync=paidCartActiveNames>
      <miro-tabs-head slot="head" style="background: white;">
        <miro-tabs-item name="1" class="changeStyle">全部订单</miro-tabs-item>
        <miro-tabs-item name="2" class="changeStyle">待收货</miro-tabs-item>
        <miro-tabs-item name="3" class="changeStyle">待评价</miro-tabs-item>
      </miro-tabs-head>

      <miro-tabs-pane name="1">
        <goods-list :list="cart.paidList"></goods-list>
      </miro-tabs-pane>
      <miro-tabs-pane name="2">
        <goods-list :list="unReceiveList"></goods-list>
      </miro-tabs-pane>
      <miro-tabs-pane name="3">
        <goods-list :list="unEvaluateList"></goods-list>
      </miro-tabs-pane>
    </miro-tabs>
  </div>
</template>

<script>
  import List from '../goods-list'
  import mixin from '@/modules/js/mixin.js'       // AV init & miro组件
  import AV from 'leancloud-storage'
  import {mapState,mapGetters,mapMutations} from 'vuex'

  // const currentUser = AV.User.current()

  export default {
    name: "goods-paid",
    data(){
      return {
        paidCartActiveNames: '1',
      }
    },
    computed:{
      ...mapState(['cart']),

      unReceiveList(){
        if(!this.cart.paidList) {return []}
        return this.cart.paidList.filter((goods) => {
          return ! goods.receive
        })
      },
      unEvaluateList(){
        if(!this.cart.paidList) {return []}
        return this.cart.paidList.filter((goods) => {
          return goods.receive && ! goods.evaluate
        })
      }

    },
    mounted(){
      this.setPaidList()
    },
    methods: {
      ...mapMutations(['setPaidList','confirmReceive','confirmEvaluate']),

    },
    components: {'goods-list': List},
    mixins: [mixin]
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

  .paid-goods-wrapper {
    .miro-item-removeActive {animation: none;}
    .changeStyle {
      font-size: 14px;
      &:hover {background: white;color: $theme-color;}
      &.miro-item-active {color: $theme-color;background: white;}
    }
    .miro-pane-active {padding: 10px 0;}

  }
</style>
