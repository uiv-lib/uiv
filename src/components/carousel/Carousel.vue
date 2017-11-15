<template>
  <div class="carousel slide" data-ride="carousel" @mouseenter="stopInterval" @mouseleave="startInterval">
    <slot v-if="indicators" name="indicators" :select="select" :active-index="activeIndex">
      <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :class="{active: index === activeIndex}" @click="select(index)"></li>
      </ol>
    </slot>
    <div class="carousel-inner" role="listbox">
      <slot></slot>
    </div>
    <a class="left carousel-control" href="javascript:void(0)" role="button" v-if="controls" @click="prev()">
      <span :class="iconControlLeft" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="javascript:void(0)" role="button" v-if="controls" @click="next()">
      <span :class="iconControlRight" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
  import {isExist} from '@src/utils/objectUtils'

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
</script>
