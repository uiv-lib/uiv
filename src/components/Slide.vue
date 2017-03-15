<template>
  <div class="item" :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        slideClass: {
          active: false,
          prev: false,
          next: false,
          left: false,
          right: false
        }
      }
    },
    created () {
      try {
        this.$parent.slides.push(this)
      } catch (e) {
        throw new Error('Slide parent must be Carousel.')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
