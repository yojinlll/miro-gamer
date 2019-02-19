<template>
  <svg class="miro-icon" aria-hidden="true"
       :class="{loading: icon==='loading'}"
       v-if="icon"
  >
    <use :xlink:href=`#i-${icon}`></use>
  </svg>
</template>

<script>
  import '../svg.js'
  export default {
    name: "miroIcon",
    props: {
      icon: String,
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes spin {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  .loading {animation: spin 1s infinite linear;}

  .miro-icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

</style>
