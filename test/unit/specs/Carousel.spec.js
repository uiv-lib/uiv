import Vue from 'vue'
import $ from 'jquery'
import Carousel from '@src/components/carousel/Carousel.vue'
import Slide from '@src/components/carousel/Slide.vue'
import CarouselDoc from '@docs/pages/components/Carousel.md'
import utils from './../utils'

describe('Carousel', () => {
  let vm
  let $el

  beforeEach(() => {
    let Constructor = Vue.extend(CarouselDoc)
    vm = new Constructor().$mount()
    $el = $(vm.$el)
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
  })

  it('should not be able to work if not using <carousel><slide>...</slide></carousel>', () => {
    let _error = window.console.error
    window.console.error = () => {
      // Silent to remove out logs in terminal
    }
    try {
      let spy = sinon.spy(window.console, 'error')
      let res = Vue.compile('<carousel><slide><slide>{{ msg }}</slide></slide></carousel>')
      let vm = new Vue({
        data () {
          return {
            msg: 'hello'
          }
        },
        components: {Carousel, Slide},
        render: res.render,
        staticRenderFns: res.staticRenderFns
      }).$mount()
      sinon.assert.called(spy)
      $(vm.$el).remove()
      vm.$destroy()
    } finally {
      window.console.error = _error
    }
  })

  it('should be able to work with v-model', async () => {
    let res = Vue.compile('<carousel v-model="index"><slide>1</slide><slide>2</slide></carousel>')
    let vm = new Vue({
      data () {
        return {
          index: 1
        }
      },
      components: {Carousel, Slide},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el)
    await vm.$nextTick()
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(1).className).to.contain('active')
    $el.find('.carousel-control.right').get(0).click()
    await utils.sleep(700)
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(0).className).to.contain('active')
    expect(vm.index).to.equal(0)
    $el.remove()
    vm.$destroy()
  })

  it('should be ok if no <slide> present in <carousel>', () => {
    let res = Vue.compile('<carousel>{{msg}}</carousel>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Carousel, Slide},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    $(vm.$el).remove()
    vm.$destroy()
  })

  it('should be able to render correct contents on init', async () => {
    let $el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    expect($el.find('.carousel-inner .item').length).to.equal(4)
    expect($el.find('.carousel-indicators li').length).to.equal(4)
    expect($el.find('.carousel-control').length).to.equal(2)
    expect($el.find('.carousel-inner .item').get(0).className).to.contain('active')
  })

  it('should be able to go next on right control click', async () => {
    let $el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    $el.find('.carousel-control.right').get(0).click()
    await utils.sleep(700)
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(1).className).to.contain('active')
  })

  it('should be able to go prev on left control click', async () => {
    let $el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    $el.find('.carousel-control.left').get(0).click()
    await utils.sleep(700)
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(3).className).to.contain('active')
    $el.find('.carousel-control.left').get(0).click()
    await utils.sleep(700)
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(2).className).to.contain('active')
  })

  it('should be able to go index on indicator click', async () => {
    let $el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    $el.find('.carousel-indicators li').get(1).click()
    await utils.sleep(700)
    expect($el.find('.carousel-indicators .active').length).to.equal(1)
    expect($el.find('.carousel-indicators li').get(1).className).to.contain('active')
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(1).className).to.contain('active')
    $el.find('.carousel-indicators li').get(0).click()
    await utils.sleep(700)
    expect($el.find('.carousel-indicators .active').length).to.equal(1)
    expect($el.find('.carousel-indicators li').get(0).className).to.contain('active')
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(0).className).to.contain('active')
  })

  it('should be able to hide indicators', async () => {
    let _$el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    $el.find('form button').get(0).click()
    await vm.$nextTick()
    expect(_$el.find('.carousel-indicators').length).to.equal(0)
  })

  it('should be able to use custom icons', async () => {
    let res = Vue.compile('<carousel :icon-control-left="customLeftIcon" icon-control-right="custom-css-class"></carousel>')
    let leftControlClass = 'my-custom-left-class'
    let vm = new Vue({
      data () {
        return {
          customLeftIcon: leftControlClass
        }
      },
      components: {Carousel, Slide},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    let $el = $(vm.$el)
    expect($el.find('.left.carousel-control > span').get(0).className).to.contain(leftControlClass)
    expect($el.find('.right.carousel-control > span').get(0).className).to.contain('custom-css-class')
    $el.remove()
    vm.$destroy()
  })

  it('should be able to hide controls', async () => {
    let _$el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    $el.find('form button').get(1).click()
    await vm.$nextTick()
    expect(_$el.find('.carousel-control').length).to.equal(0)
  })

  it('should be able to push slide', async () => {
    let _$el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    $el.find('form button').get(2).click()
    await vm.$nextTick()
    expect(_$el.find('.carousel-indicators li').length).to.equal(5)
    expect(_$el.find('.carousel-inner .item').length).to.equal(5)
  })

  it('should be able to change interval', async () => {
    let $el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    vm.$refs['carousel-example'].interval = 500
    await vm.$nextTick()
    await utils.sleep(1200)
    expect($el.find('.carousel-indicators .active').length).to.equal(1)
    expect($el.find('.carousel-indicators li').get(1).className).to.contain('active')
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(1).className).to.contain('active')
  })

  it('should be able to stop interval', async () => {
    let $el = $(vm.$refs['carousel-example'].$refs.carousel.$el)
    await vm.$nextTick()
    vm.$refs['carousel-example'].interval = 0
    await vm.$nextTick()
    await utils.sleep(1200)
    expect($el.find('.carousel-indicators .active').length).to.equal(1)
    expect($el.find('.carousel-indicators li').get(0).className).to.contain('active')
    expect($el.find('.carousel-inner .item.active').length).to.equal(1)
    expect($el.find('.carousel-inner .item').get(0).className).to.contain('active')
  })
})
