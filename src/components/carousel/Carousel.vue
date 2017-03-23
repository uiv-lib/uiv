<template>
  <div class="carousel slide" data-ride="carousel" @mouseenter="stopInterval" @mouseleave="startInterval">
    <ol class="carousel-indicators" v-if="indicators">
      <li v-for="(slide,index) in slides" :class="{active:index===activeIndex}" @click="select(index)"></li>
    </ol>
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
        activeIndex: 0,
        timeout: 0,
        _interval: 0
      }
    },
    watch: {
      interval () {
        this.startInterval()
      }
    },
    mounted () {
      if (this.slides.length > 0) {
        this.$select(0)
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
        if (this.slides.length === 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index >= this.slides.length) {
          index = this.slides.length - 1
        }
        if (index === this.activeIndex) {
          return
        }
        let currentActiveIndex = this.activeIndex
        if (this.timeout === 0) {
          this.activeIndex = index
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
      prev () {
        this.select(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1)
      },
      next () {
        this.select(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
