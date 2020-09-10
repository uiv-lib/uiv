import { isExist } from '../../utils/object.utils'

export default {
  props: {
    value: Number,
    indicators: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    },
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left'
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right'
    }
  },
  data () {
    return {
      slides: [],
      activeIndex: 0, // Make v-model not required
      timeoutId: 0,
      intervalId: 0
    }
  },
  watch: {
    interval () {
      this.startInterval()
    },
    value (index, oldValue) {
      this.run(index, oldValue)
      this.activeIndex = index
    }
  },
  mounted () {
    if (isExist(this.value)) {
      this.activeIndex = this.value
    }
    if (this.slides.length > 0) {
      this.$select(this.activeIndex)
    }
    this.startInterval()
  },
  beforeDestroy () {
    this.stopInterval()
  },
  methods: {
    run (newIndex, oldIndex) {
      let currentActiveIndex = oldIndex || 0
      let direction
      if (newIndex > currentActiveIndex) {
        direction = ['next', 'left']
      } else {
        direction = ['prev', 'right']
      }
      this.slides[newIndex].slideClass[direction[0]] = true
      this.$nextTick(() => {
        this.slides[newIndex].$el.offsetHeight
        this.slides.forEach((slide, i) => {
          if (i === currentActiveIndex) {
            slide.slideClass.active = true
            slide.slideClass[direction[1]] = true
          } else if (i === newIndex) {
            slide.slideClass[direction[1]] = true
          }
        })
        this.timeoutId = setTimeout(() => {
          this.$select(newIndex)
          this.$emit('change', newIndex)
          this.timeoutId = 0
        }, 600)
      })
    },
    startInterval () {
      this.stopInterval()
      if (this.interval > 0) {
        this.intervalId = setInterval(() => {
          this.next()
        }, this.interval)
      }
    },
    stopInterval () {
      clearInterval(this.intervalId)
      this.intervalId = 0
    },
    resetAllSlideClass () {
      this.slides.forEach(slide => {
        slide.slideClass.active = false
        slide.slideClass.left = false
        slide.slideClass.right = false
        slide.slideClass.next = false
        slide.slideClass.prev = false
      })
    },
    $select (index) {
      this.resetAllSlideClass()
      this.slides[index].slideClass.active = true
    },
    select (index) {
      if (this.timeoutId !== 0 || index === this.activeIndex) {
        return
      }
      if (isExist(this.value)) {
        this.$emit('input', index)
      } else {
        this.run(index, this.activeIndex)
        this.activeIndex = index
      }
    },
    prev () {
      this.select(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1)
    },
    next () {
      this.select(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1)
    }
  }
}
