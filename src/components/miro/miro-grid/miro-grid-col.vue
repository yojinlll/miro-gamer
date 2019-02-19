<template>
  <div class="miro-col" :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "miroCol",
    props: {
      span: {type: [Number, String]},
      offset: {type: [Number, String]},
      phone: {type: [Number, String, Object]},
      ipad: {type: [Number, String, Object]}
    },
    computed: {
      gutter(){
        return this.$parent.gutter
      },
      colClass(){
        let classArray = []
        let {span, offset, gutter, phone, ipad} = this

        classArray = [
          gutter && `gutter-${gutter}`,
          span && `span-${span}`,
          offset && `offset-${offset}`,
        ]

        this.createClass(phone,classArray,'phone')
        this.createClass(ipad,classArray,'ipad')
        this.validator()
        return classArray
      }
    },
    methods: {
      createClass(obj,array,str){
        if (typeof obj === 'object') {
          array.push(
            obj.span && `${str}-span-${obj.span}`,
            obj.offset && `${str}-offset-${obj.offset}`
          )
        }else {
          array.push(
            obj && `${str}-span-${obj}`
          )
        }
      },
      validator(){
        let {phone, ipad} = this
        let array = [phone, ipad]
        array.forEach((item) => {
          if (typeof item === 'object') {
            let keys = Object.keys(item)
            let valid = true
            keys.forEach(key => {
              if (! ['span', 'offset'].includes(key)) {
                valid = false
              }
            })
            if(!valid) {console.error('组件 props 里的 phone 和 ipad 中应该存在 span 属性或 offset 属性')}
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miro-col {
    /*width: 50%;*/
    $class-prefix: gutter-;
    @for $n from 1 through 100 {
      &.#{$class-prefix}#{$n}:not(:last-child) {
        margin-right: $n * 1px;
      }
    }

    $class-prefix: span-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }

    @media (min-width: 577px) and (max-width: 993px) {
      $class-prefix: ipad-span-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: ipad-offset-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

    @media (max-width: 577px) {
      $class-prefix: phone-span-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: phone-offset-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
    }

  }
</style>
