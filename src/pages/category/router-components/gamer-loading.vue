<template>
  <div class="gamer-loading">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#i-loading"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "gamer-loading"
  }
</script>

<style lang="scss" scoped>
  .gamer-loading{
    width: 100px;
    text-align: center;
    margin: 200px auto;

    > .icon{font-size: 3em;animation: spin 1.5s infinite linear;}

    @keyframes spin{
      0%{transform:rotate(0deg);}
      100%{transform:rotate(360deg);}
    }
  }
</style>
