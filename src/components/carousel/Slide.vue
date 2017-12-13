<template>
  <div class="item" :class="slideClass">
    <slot></slot>
  </div>
</template>

<script>
  import {spliceIfExist} from '../../utils/arrayUtils'

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
    },
    beforeDestroy () {
      let slides = this.$parent && this.$parent.slides
      spliceIfExist(slides, this)
    }
  }
</script>
