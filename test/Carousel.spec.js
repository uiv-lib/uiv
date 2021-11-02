import $ from 'jquery'
import { createWrapper, destroyVm, sleep, triggerEvent } from '../utils'

describe('Carousel', () => {
  let vm
  let $el

  beforeEach(() => {
    const wrapper = createWrapper(
      `<section>
    <carousel :indicators="indicators" :controls="controls" :interval="interval" ref="carousel">
      <slide v-for="(slide, index) in slides" :key="index">
        <div style="width: 100%;height: 400px;" :style="{background:index % 2 === 0? '#99a9bf' : '#d3dce6'}"></div>
        <div class="carousel-caption">
          <h3>This is {{slide.title}}</h3>
        </div>
      </slide>
    </carousel>
    <br/>
    <form class="form-inline">
      <btn @click="indicators=!indicators">Toggle Indicators</btn>
      <btn @click="controls=!controls">Toggle Controls</btn>
      <btn @click="pushSlide">Push Slide</btn>
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon">Interval</span>
          <input type="number" class="form-control" step="1" min="0" v-model.number="interval" style="width: 100px">
          <span class="input-group-addon">ms</span>
        </div>
      </div>
    </form>
  </section>`,
      {
        interval: 5000,
        indicators: true,
        controls: true,
        slides: [
          { title: 'Slide 1' },
          { title: 'Slide 2' },
          { title: 'Slide 3' },
          { title: 'Slide 4' },
        ],
      },
      {
        methods: {
          pushSlide() {
            this.slides.push({ title: `Slide ${this.slides.length + 1}` })
          },
        },
      }
    )
    $el = $(vm.$refs.carousel.$el)
  })

  afterEach(() => {
    destroyVm(vm)
  })

  it('should not be able to work if not using <carousel><slide>...</slide></carousel>', () => {
    const _error = window.console.error
    window.console.error = () => {
      // Silent to remove out logs in terminal
    }
    try {
      const spy = sinon.spy(window.console, 'error')
      const wrapper = createWrapper(
        '<carousel><slide><slide>{{ msg }}</slide></slide></carousel>',
        {
          msg: 'hello',
        }
      )
      sinon.assert.called(spy)
    } finally {
      window.console.error = _error
    }
  })

  it('should be able to work with v-model', async () => {
    const wrapper = createWrapper(
      '<carousel v-model="index"><slide>1</slide><slide>2</slide></carousel>',
      {
        index: 1,
      }
    )
    $el = $(vm.$el)
    await vm.$nextTick()
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(1).className).toContain(
      'active'
    )
    triggerEvent($el.find('.carousel-control.right').get(0), 'click')
    await sleep(700)
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(0).className).toContain(
      'active'
    )
    expect(vm.index).toEqual(0)
  })

  it('should be ok if no <slide> present in <carousel>', () => {
    const wrapper = createWrapper('<carousel>{{msg}}</carousel>', {
      msg: 'hello',
    })
  })

  it('should be able to render correct contents on init', async () => {
    await vm.$nextTick()
    expect($el.find('.carousel-inner .item').length).toEqual(4)
    expect($el.find('.carousel-indicators li').length).toEqual(4)
    expect($el.find('.carousel-control').length).toEqual(2)
    expect($el.find('.carousel-inner .item').get(0).className).toContain(
      'active'
    )
  })

  it('should be able to go next on right control click', async () => {
    await vm.$nextTick()
    triggerEvent($el.find('.carousel-control.right').get(0), 'click')
    await sleep(700)
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(1).className).toContain(
      'active'
    )
  })

  it('should be able to go prev on left control click', async () => {
    await vm.$nextTick()
    triggerEvent($el.find('.carousel-control.left').get(0), 'click')
    await sleep(700)
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(3).className).toContain(
      'active'
    )
    triggerEvent($el.find('.carousel-control.left').get(0), 'click')
    await sleep(700)
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(2).className).toContain(
      'active'
    )
  })

  it('should be able to go index on indicator click', async () => {
    await vm.$nextTick()
    const $indicators = $el.find('.carousel-indicators li')
    triggerEvent($indicators.get(1), 'click')
    await sleep(700)
    expect($el.find('.carousel-indicators .active').length).toEqual(1)
    expect($indicators.get(1).className).toContain('active')
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(1).className).toContain(
      'active'
    )
    triggerEvent($indicators.get(0), 'click')
    await sleep(700)
    expect($el.find('.carousel-indicators .active').length).toEqual(1)
    expect($indicators.get(0).className).toContain('active')
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(0).className).toContain(
      'active'
    )
  })

  it('should be able to hide indicators', async () => {
    await vm.$nextTick()
    triggerEvent($(vm.$el).find('form button').get(0), 'click')
    await vm.$nextTick()
    expect($el.find('.carousel-indicators').length).toEqual(0)
  })

  it('should be able to use custom icons', async () => {
    const leftControlClass = 'my-custom-left-class'
    const wrapper = createWrapper(
      '<carousel :icon-control-left="customLeftIcon" icon-control-right="custom-css-class"></carousel>',
      {
        customLeftIcon: leftControlClass,
      }
    )
    $el = $(vm.$el)
    expect(
      $el.find('.left.carousel-control > span').get(0).className
    ).toContain(leftControlClass)
    expect(
      $el.find('.right.carousel-control > span').get(0).className
    ).toContain('custom-css-class')
  })

  it('should be able to hide controls', async () => {
    await vm.$nextTick()
    triggerEvent($(vm.$el).find('form button').get(1), 'click')
    await vm.$nextTick()
    expect($el.find('.carousel-control').length).toEqual(0)
  })

  it('should be able to push slide', async () => {
    await vm.$nextTick()
    triggerEvent($(vm.$el).find('form button').get(2), 'click')
    await vm.$nextTick()
    expect($el.find('.carousel-indicators li').length).toEqual(5)
    expect($el.find('.carousel-inner .item').length).toEqual(5)
  })

  it('should be able to change interval', async () => {
    await vm.$nextTick()
    vm.interval = 500
    await vm.$nextTick()
    await sleep(1200)
    expect($el.find('.carousel-indicators .active').length).toEqual(1)
    expect($el.find('.carousel-indicators li').get(1).className).toContain(
      'active'
    )
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(1).className).toContain(
      'active'
    )
  })

  it('should be able to stop interval', async () => {
    await vm.$nextTick()
    vm.interval = 0
    await vm.$nextTick()
    await sleep(1200)
    expect($el.find('.carousel-indicators .active').length).toEqual(1)
    expect($el.find('.carousel-indicators li').get(0).className).toContain(
      'active'
    )
    expect($el.find('.carousel-inner .item.active').length).toEqual(1)
    expect($el.find('.carousel-inner .item').get(0).className).toContain(
      'active'
    )
  })
})
