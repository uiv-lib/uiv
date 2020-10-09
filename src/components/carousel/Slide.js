import { spliceIfExist } from '../../utils/array.utils'

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
    const slides = this.$parent && this.$parent.slides
    spliceIfExist(slides, this)
  }
}
