<template>
  <div class="miro-tabs-item" @click="logMe"
       :class="{'miro-item-active': activeItem,'miro-item-removeActive': !activeItem}"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miro-tabs-item",
    inject: ['eventBus'],
    data(){
      return {
        activeItem: false,
        itemClass: {

        }
      }
    },
    props: {
      name: {
        type: String | Number,
        require: true
      }
    },
    mounted(){
      this.eventBus.$on('select', (name) => {
        this.name === name ? this.activeItem = true : this.activeItem = false
      })
    },
    methods: {
      logMe(){
        this.eventBus.$emit('select', this.name)
      }
    }

  }
</script>

<style lang="scss" scoped>
  $color: #f9f9f9;

  .miro-tabs-item {
    /*border: 1px solid yellowgreen;*/
    flex-shrink: 1;
    padding: 0 1em;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 10px;

    &:hover {
      border-radius: 4px;
      background: $color;
      cursor: pointer;
    }
  }

  .miro-item-active {
    border-radius: 4px;
    background: $color;
  }
  .miro-item-removeActive{
    animation: fade .5s;
  }
  @keyframes fade {
    0%{background: $color}
    100%{background: none;}
  }
</style>