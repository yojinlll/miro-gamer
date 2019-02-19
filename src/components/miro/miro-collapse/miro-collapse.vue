<template>
  <div class="miro-collapse">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "miro-collapse",
    data(){
      return {
        eventBus: new Vue()
      }
    },
    props: {
      single: {
        type: Boolean,
        default: false
      },
      select: {
        type: Array
      }
    },
    provide(){
      return {eventBus: this.eventBus}
    },
    mounted(){
      this.eventBus.$emit('select', this.select)

      this.eventBus.$on('addSelect', (name) => {

        let selectedCopy = JSON.parse(JSON.stringify(this.select))
        this.single ? selectedCopy = [name] : selectedCopy.push(name)

        this.eventBus.$emit('select', selectedCopy)
        this.$emit('update:select', selectedCopy)
      })

      this.eventBus.$on('removeSelect', (name) => {

        let selectedCopy = JSON.parse(JSON.stringify(this.select))
        let index = selectedCopy.indexOf(name)
        selectedCopy.splice(index, 1)

        this.eventBus.$emit('select', selectedCopy)
        this.$emit('update:select', selectedCopy)
      })
    },
  }
</script>

<style lang="scss" scoped>
  $grey: #ddd;
  $border-radius: 4px;

  .miro-collapse {
    border: 1px solid $grey;
    border-radius: $border-radius;
  }

</style>