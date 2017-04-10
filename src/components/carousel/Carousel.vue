<template>
  <div class="carousel slide" data-ride="carousel" @mouseenter="stopInterval" @mouseleave="startInterval">
    <slot v-if="indicators" name="indicators">
      <ol class="carousel-indicators">
        <li v-for="(slide,index) in slides" :class="{active:index===value}" @click="select(index)"></li>
      </ol>
    </slot>
    <div class="carousel-inner" role="listbox">
      <slot></slot>
    </div>
    <a class="left carousel-control" href="javascript:void(0)" role="button" v-if="controls" @click="prev()">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="javascript:void(0)" role="button" v-if="controls" @click="next()">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        'default': 0
      },
      indicators: {
        type: Boolean,
        'default': true
      },
      controls: {
        type: Boolean,
        'default': true
      },
      interval: {
        type: Number,
        'default': 2000
      }
    },
    data () {
      return {
        slides: [],
        timeout: 0,
        _interval: 0
      }
    },
    watch: {
      interval () {
        this.startInterval()
      },
      value (index, oldValue) {
        let currentActiveIndex = oldValue || 0
        this.$emit('input', index)
        let direction
        if (index > currentActiveIndex) {
          direction = ['next', 'left']
        } else {
          direction = ['prev', 'right']
        }
        this.slides[index].slideClass[direction[0]] = true
        this.$nextTick(() => {
          this.slides[index].$el.offsetHeight
          this.slides.forEach((slide, i) => {
            if (i === currentActiveIndex) {
              slide.slideClass.active = true
              slide.slideClass[direction[1]] = true
            } else if (i === index) {
              slide.slideClass[direction[1]] = true
            }
          })
          this.timeout = setTimeout(() => {
            this.$select(index)
            this.timeout = 0
          }, 600)
        })
      }
    },
    mounted () {
      if (this.slides.length > 0) {
        this.$select(this.value)
      }
      this.startInterval()
    },
    methods: {
      startInterval () {
        this.stopInterval()
        if (this.interval > 0) {
          this._interval = setInterval(() => {
            this.next()
          }, this.interval)
        }
      },
      stopInterval () {
        clearInterval(this._interval)
        this._interval = 0
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
        if (this.timeout === 0) {
          this.$emit('input', index)
        }
      },
      prev () {
        if (this.timeout === 0) {
          this.$emit('input', this.value === 0 ? this.slides.length - 1 : this.value - 1)
        }
      },
      next () {
        if (this.timeout === 0) {
          this.$emit('input', this.value === this.slides.length - 1 ? 0 : this.value + 1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
