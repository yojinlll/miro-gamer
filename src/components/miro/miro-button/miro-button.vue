<template>
  <button class="miro-button" :class="{[`icon-${iconPosition}`]:true}" @click="onToggle">
    <miro-icon icon="loading" v-if="toggle"></miro-icon>
    <miro-icon :icon="icon" v-else></miro-icon>
    <div class="miro-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import Icon from '../miro-icon/miro-icon'

  export default {
    name: "miroButton",
    data(){
      return {
        toggle: false
      }
    },
    props: {
      icon: {},
      loading: {
        type: Boolean,
        default: false
      },
      iconPosition: {
        type: String,
        default: 'left',
        validator(value){
          return ! (value !== 'left' && value !== 'right')
        }
      }
    },
    methods:{
      onToggle(){
        this.$emit('click')
        if(this.loading){
          this.toggle = !this.toggle
        }
      }
    },
    components: {
      'miro-icon': Icon
    }
  }
</script>
<style lang="scss" scoped>
  $button-height: 32px;
  $font-size: 14px;
  $button-bg: white;
  $button-active-bg: #eee;
  $border-radius: 6px;
  $color: #444;
  $border-color: #999;
  $border-color-hover: #666;
  $background-color: darkolivegreen;

  .miro-button {
    font-size: $font-size;
    height: $button-height;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $button-bg;
    color: $color;
    display: inline-flex; justify-content: center; align-items: center;
    vertical-align: middle;
    cursor: pointer;

    &:hover {
      position: relative;
      border-color: $border-color-hover;
      z-index: 1;
    }
    &:active {
      position: relative;
      background-color: $button-active-bg;
      z-index: 1;
    }
    &:focus {
      outline: none;
    }

    > .miro-icon {order: 1; margin-right: .3em;}
    > .miro-button-content {order: 2;}

    &.icon-right {
      > .miro-icon {order: 2;margin-right: 0;margin-left: .3em;}
      > .miro-button-content {order: 1;}
    }
  }
</style>