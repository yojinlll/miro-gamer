<template>
  <div class="all-wrapper">
    <ul class="all-list clearFix">
      <li class="all-item" @click="xxx" v-for="item in allList">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "gamer-all",
    data(){
      return {
        allList: [0,1,2,3,4,5,6,7,8,9,10]
      }
    },
    methods: {
      xxx(){
        console.log(1111)
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

  .all-wrapper{
    padding: 20px;
    border: 1px solid $border-color;

    .clearFix::after{
      display: block;
      content: '';
      clear: both;
    }

    .all-item{
      background: white;
      border: 1px solid $border-color;
      width: 100px;
      height: 200px;
      margin: 10px 0 0 10px;
      float: left;
    }
  }
</style>

