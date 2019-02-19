<template>
  <div class="miro-popover-wrapper" ref="popover">
    <transition name="fade">
      <div class="miro-popover" ref="content" v-show="visible"
           :class="{[`position-${position}`]: true}"
      >
        <slot name="popover" :close="close"></slot>
      </div>
    </transition>
    <span ref="trigger">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: "miro-popover",
    data(){
      return {
        visible: false,
      }
    },
    props: {
      trigger: {
        type: String,
        default: 'click',
      },
      position: {
        type: String,
        default: 'top'
      }
    },
    mounted(){
      if (this.trigger !== 'click') {
        this.$refs.popover.addEventListener('mouseenter', this.open)
        this.$refs.popover.addEventListener('mouseleave', this.close)
        this.$refs.content.addEventListener('mouseenter', this.toggleVisible)
        this.$refs.content.addEventListener('mouseleave', this.toggleVisible)
      }else {

        this.$refs.popover.addEventListener('click', this.onClick)
      }
    },
    beforeDestroy(){
      if (this.trigger !== 'click') {
        this.$refs.popover.removeEventListener('mouseenter', this.open)
        this.$refs.popover.removeEventListener('mouseleave', this.close)
        this.$refs.content.removeEventListener('mouseenter', this.toggleVisible)
        this.$refs.content.removeEventListener('mouseleave', this.toggleVisible)
      }else {
        this.$refs.popover.removeEventListener('click', this.onClick)
      }
    },
    methods: {
      changePosition(){
        const {content, popover} = this.$refs
        document.body.appendChild(content)

        const {width, height, top, left} = popover.getBoundingClientRect()
        const {height: height2, width: width2} = content.getBoundingClientRect()

        let gap = 15
        let position = {
          top: {top: top + window.scrollY - height2 - gap, left: left + window.scrollX},
          bottom: {top: top + window.scrollY + height + gap, left: left + window.scrollX},
          left: {top: top + window.scrollY + (height - height2) / 2, left: left + window.scrollX - width2 - gap},
          right: {top: top + window.scrollY + (height - height2) / 2, left: left + window.scrollX + width + gap},
        }

        content.style.top = position[this.position].top + 'px'
        content.style.left = position[this.position].left + 'px'
      },
      onClickDocument(e){
        if (this.$refs.trigger.contains(e.target)) {
          return
        }else if(e.target === this.$refs.content || this.$refs.content.contains(e.target)) {
          return
        }else {
          this.close()
        }
      },
      onClick(){
        this.visible ? this.close() : this.open()
      },
      open(){
        // this.visible = true
        this.toggleVisible()
        this.$nextTick(() => {
          this.changePosition()
          document.addEventListener('click', this.onClickDocument)

        })
      },
      close(){
        // this.visible = false
        this.toggleVisible()
        document.removeEventListener('click', this.onClickDocument)
      },
      toggleVisible(){
        this.visible = !this.visible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miro-popover-wrapper {
    display: inline-block;
  }

  .miro-popover {
    display: inline-block;
    border-radius: 4px;
    padding: 10px;
    max-width: 20em;
    position: absolute;
    background: white;
    color: #5a5a5a;
    filter: drop-shadow(0 0px 2px rgba(0, 0, 0, 0.4));

    &::before{
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      border: 6px solid transparent;
    }

    &.position-top {
      &::before{
        border-top-color: white;
        top: 100%;
        left: 20px;
      }
    }
    &.position-left {
      &::before{
        border-left-color: white;
        top: calc(50% - 6px);
        left: 100%;
      }
    }
    &.position-bottom {
      &::before{
        border-bottom-color: white;
        bottom: 100%;
        left: 20px;
      }
    }
    &.position-right {
      &::before{
        border-right-color: white;
        top: calc(50% - 6px);
        right: 100%;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }


</style>