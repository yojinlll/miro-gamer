<template>
  <div class="miro-toast" :class="{
          [`position-${position}-enter`]: isActive.enter,
          [`position-${position}-leave`]: isActive.leave
       }"
  >
    <div class="miro-toast-message" :style="isCenter">
      <slot v-if="!useHtml"></slot>
      <div v-else="useHtml" v-html="this.$slots.default"></div>
    </div>
    <div class="miro-toast-close" v-if="showClose" @click="onClickClose">
      <miro-icon class="toast-icon" icon="close"></miro-icon>
    </div>
  </div>
</template>

<script>
  import Icon from '../miro-icon/miro-icon'

  export default {
    name: "miroToast",
    props: {
      autoClose: {
        type: [Boolean, Number],
        default: true
      },
      showClose: {
        type: Boolean,
        default: false
      },
      useHtml: {
        type: Boolean,
        default: false
      },
      center: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top'
      },
      callback: {
        type: Function,
        default(){
        }
      },
      only: {
        type: Boolean,
        default: false
      }

    },
    data(){
      return {
        //动画类名激活
        isActive: {
          enter: true,
          leave: false
        },
      }
    },
    computed: {
      isCenter(){
        if (this.center) {
          return {justifyContent: 'center'}
        }
      },
      // currentAnimation(){
      //   if (this.position === 'top') {
      //     return 'downSlide'
      //   }else if (this.position === 'middle') {
      //     return 'slide'
      //   }else if (this.position === 'bottom') {
      //     return 'upSlide'
      //   }
      // }
    },
    mounted(){
      this.initConfirmClose()
    },
    methods: {
      initConfirmClose(){
        if (this.autoClose) {
          // 默认三秒关闭，可自拟时间
          this.autoClose === true ? this.onClose(3000) : this.onClose(this.autoClose)
        }
      },
      onClickClose(){
        this.onClose(0)
        if (this.callback) {
          this.callback()
        }
      },
      onClose(time){
        setTimeout(() => {
          // 激活动画类名
          this.isActive.leave = true
          setTimeout(() => {
            this.$el.remove()
            this.$destroy()

            // 300毫秒是动画持续时间，耦合了。
          }, 300)
        }, time)
      },

    },
    components: {
      'miro-icon': Icon
    }
  }
</script>

<style lang="scss" scoped>
  $time:.3s;

  .miro-toast {
    display: inline-flex;
    min-height: 40px;
    border-radius: 6px;
    background: rgba(85, 85, 85, 0.87);
    color: white;
    z-index: 999;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);

    .miro-toast-message {
      padding: 10px 20px;
      min-width: 200px;
      max-width: 500px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .miro-toast-close {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all $time;

      .toast-icon:hover{
        transform: scale(1.3,1.3);
      }
    }

    &.position-top-enter {
      top: 10%;
      animation: downSlide-enter $time;
    }
    &.position-top-leave {
      animation: downSlide-leave $time;
    }
    &.position-middle-enter {
      top: 50%;
      animation: slide-enter $time;
    }
    &.position-middle-leave {
      animation: slide-leave $time;
    }
    &.position-bottom-enter {
      bottom: 5%;
      animation: upSlide-enter $time;
    }
    &.position-bottom-leave {
      animation: upSlide-leave $time;
    }
  }

  @keyframes downSlide-enter {
    0% { top: 0; opacity: 0;}
    100% { top: 10%; opacity: 1;}
  }

  @keyframes downSlide-leave {
    0% { top: 10%; opacity: 1;}
    100% { top: 0; opacity: 0;}
  }

  @keyframes slide-enter {
    0% { left: 25%; opacity: 0;}
    100% { left: 50%; opacity: 1;}
  }

  @keyframes slide-leave {
    0% { left: 50%; opacity: 1;}
    100% { left: 75%; opacity: 0;}
  }

  @keyframes upSlide-enter {
    0% { bottom: 0; opacity: 0;}
    100% { bottom: 5%; opacity: 1;}
  }

  @keyframes upSlide-leave {
    0% { bottom: 5%; opacity: 1;}
    100% { bottom: 0; opacity: 0;}
  }

  /*.downSlide-enter, .downSlide-leave-to {opacity: 0;top: 0;}*/

  /*.downSlide-enter-to, .downSlide-leave {opacity: 1; top: 5%;}*/

  /*.downSlide-enter-active, .downSlide-leave-active {transition: all .5s;}*/

  /*.upSlide-enter, .upSlide-leave-to {opacity: 0; bottom: 0;}*/

  /*.upSlide-enter-to, .upSlide-leave {opacity: 1; bottom: 5%;}*/

  /*.upSlide-enter-active, .upSlide-leave-active {transition: all .5s;}*/

  /*.slide-enter {opacity: 0; left: 25%}*/

  /*.slide-enter-to, .slide-leave {opacity: 1;}*/

  /*.slide-enter-active, .slide-leave-active {transition: all .5s;}*/

  /*.slide-leave-to {opacity: 0; left: 75%}*/
</style>