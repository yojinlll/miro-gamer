<template>
  <div>
    {{testData}}
    <button @click="yyy">change</button>
  </div>
</template>

<script>
  export default {
    name: "test",
    props:{
      testData: Number
    },
    methods: {
      yyy(){
        console.log(this.testData)
        this.testData = 123
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
