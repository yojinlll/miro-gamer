<template>
  <div class="miro-collapse-item">
    <div class="miro-collapse-title" @click="onClick">
      <slot name="title"></slot>
    </div>

    <transition @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave">
    >
      <div class="miro-collapse-content" v-if="toggle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "miro-collapse-item",
    inject: ['eventBus'],
    data(){
      return {
        toggle: false,
        dataset: {
          oldPaddingTop: '',
          oldPaddingBottom: '',
          oldPaddingLeft: '',
          oldPaddingRight: '',
          oldOverflow: ''
        }
      }
    },
    computed: {
      verticalTransition() {
        return `${+this.duration}ms height ease-in-out, ${+this.duration}ms padding-top ease-in-out, ${+this.duration}ms padding-bottom ease-in-out`;
      },
      // horizontalTransition() {
      //   return `${+this.duration}ms width ease-in-out, ${+this.duration}ms padding-left ease-in-out, ${+this.duration}ms padding-right ease-in-out`;
      // }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      duration: { type: [Number, String], default: 200 }

    },
    mounted(){
      this.eventBus.$on('select', (select) => {
        this.miro = select
        if (select instanceof Array) {
          select.indexOf(this.name) >= 0 ? this.toggle = true : this.toggle = false
        }
      })
    },
    methods: {
      onClick(){
        if (this.toggle) {
          this.eventBus.$emit('removeSelect', this.name)
        }else if (! this.toggle) {
          this.eventBus.$emit('addSelect', this.name)
        }
      },

      beforeEnter(el) {
          el.style.transition = this.verticalTransition;
          this.dataset.oldPaddingTop = el.style.paddingTop;
          this.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.style.height = '0';
          el.style.paddingTop = '0';
          el.style.paddingBottom = '0';
      },
      enter(el) {
        this.dataset.oldOverflow = el.style.overflow;

          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
          } else {
            el.style.height = '';
          }
          // el.style.paddingTop = '0';
          // el.style.paddingBottom = '0';

        el.style.overflow = 'hidden';
      },
      afterEnter(el) {
        el.style.transition = '';
        el.style.overflow = this.dataset.oldOverflow;
        this.horizontal ? el.style.width = '' : el.style.height = '';
      },
      beforeLeave(el) {
        this.dataset.oldOverflow = el.style.overflow;

          this.dataset.oldPaddingTop = el.style.paddingTop;
          this.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.style.height = el.scrollHeight + 'px';

        el.style.overflow = 'hidden';
      },
      leave(el) {

          if (el.scrollHeight !== 0) {
            el.style.transition = this.verticalTransition;
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
          }
      },
      afterLeave(el) {
        el.style.transition = '';
        el.style.overflow = this.dataset.oldOverflow;

          el.style.height = '';
          el.style.paddingTop = this.dataset.oldPaddingTop;
          el.style.paddingBottom = this.dataset.oldPaddingBottom;

      }
    },
  }
</script>

<style lang="scss" scoped>
  $grey: #ddd;
  $border-radius: 4px;
  .miro-collapse-item {

    > .miro-collapse-title {
      border: 1px solid $grey;
      background: white;
      margin: -1px;
      min-height: 32px;
      cursor: pointer;
    }
    &:first-child {
      > .miro-collapse-title {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    &:last-child {
      > .miro-collapse-title:last-child {
        border-bottom-left-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
    /*.miro-collapse-content {padding: 0 8px;}*/
  }
</style>