import {
  createWrapper,
  nextTick,
  sleep,
  triggerEvent,
} from '../../__test__/utils'
import Carousel from './Carousel'

describe('Carousel', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = createWrapper(
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
    await nextTick()
  })

  it('should be able to work with v-model', async () => {
    const wrapper = createWrapper(
      '<carousel v-model="index"><slide>1</slide><slide>2</slide></carousel>',
      {
        index: 1,
      }
    )
    await nextTick()
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[1].classes()).toContain(
      'active'
    )
    wrapper.findAll('.carousel-control.right')[0].trigger('click')
    await sleep(700)
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[0].classes()).toContain(
      'active'
    )
    expect(wrapper.vm.index).toEqual(0)
  })

  it('should be ok if no <slide> present in <carousel>', () => {
    const wrapper = createWrapper('<carousel>{{msg}}</carousel>', {
      msg: 'hello',
    })
  })

  it('should be able to render correct contents on init', async () => {
    expect(wrapper.findAll('.carousel-inner .item').length).toEqual(4)
    expect(wrapper.findAll('.carousel-indicators li').length).toEqual(4)
    expect(wrapper.findAll('.carousel-control').length).toEqual(2)
    expect(wrapper.findAll('.carousel-inner .item')[0].classes()).toContain(
      'active'
    )
  })

  it('should be able to go next on right control click', async () => {
    wrapper.findAll('.carousel-control.right')[0].trigger('click')
    await sleep(700)
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[1].classes()).toContain(
      'active'
    )
  })

  it('should be able to go prev on left control click', async () => {
    await triggerEvent(wrapper.findAll('.carousel-control.left')[0], 'click')
    await sleep(700)
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[3].classes()).toContain(
      'active'
    )
    await triggerEvent(wrapper.findAll('.carousel-control.left')[0], 'click')
    await sleep(700)
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[2].classes()).toContain(
      'active'
    )
  })

  it('should be able to go index on indicator click', async () => {
    const $indicators = wrapper.findAll('.carousel-indicators li')
    await triggerEvent($indicators[1], 'click')
    await sleep(700)
    expect(wrapper.findAll('.carousel-indicators .active').length).toEqual(1)
    expect($indicators[1].classes()).toContain('active')
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[1].classes()).toContain(
      'active'
    )
    await triggerEvent($indicators[0], 'click')
    await sleep(700)
    expect(wrapper.findAll('.carousel-indicators .active').length).toEqual(1)
    expect($indicators[0].classes()).toContain('active')
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[0].classes()).toContain(
      'active'
    )
  })

  it('should be able to hide indicators', async () => {
    await triggerEvent(wrapper.findAll('form button')[0], 'click')
    expect(wrapper.findAll('.carousel-indicators').length).toEqual(0)
  })

  it('should be able to use custom icons', async () => {
    const leftControlClass = 'my-custom-left-class'
    const wrapper = createWrapper(
      '<carousel :icon-control-left="customLeftIcon" icon-control-right="custom-css-class"></carousel>',
      {
        customLeftIcon: leftControlClass,
      }
    )
    expect(
      wrapper.findAll('.left.carousel-control > span')[0].classes()
    ).toContain(leftControlClass)
    expect(
      wrapper.findAll('.right.carousel-control > span')[0].classes()
    ).toContain('custom-css-class')
  })

  it('should be able to hide controls', async () => {
    await triggerEvent(wrapper.findAll('form button')[1], 'click')
    expect(wrapper.findAll('.carousel-control').length).toEqual(0)
  })

  it('should be able to push slide', async () => {
    await triggerEvent(wrapper.findAll('form button')[2], 'click')
    expect(wrapper.findAll('.carousel-indicators li').length).toEqual(5)
    expect(wrapper.findAll('.carousel-inner .item').length).toEqual(5)
  })

  it('should be able to change interval', async () => {
    wrapper.vm.interval = 500
    await nextTick()
    await sleep(1200)
    expect(wrapper.findAll('.carousel-indicators .active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-indicators li')[1].classes()).toContain(
      'active'
    )
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[1].classes()).toContain(
      'active'
    )
  })

  it('should be able to stop interval', async () => {
    wrapper.vm.interval = 0
    await sleep(1200)
    expect(wrapper.findAll('.carousel-indicators .active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-indicators li')[0].classes()).toContain(
      'active'
    )
    expect(wrapper.findAll('.carousel-inner .item.active').length).toEqual(1)
    expect(wrapper.findAll('.carousel-inner .item')[0].classes()).toContain(
      'active'
    )
  })

  it.skip('should not be able to work if not using <carousel><slide>...</slide></carousel>', () => {
    expect(
      createWrapper.bind(
        null,
        '<carousel><slide><slide>{{ msg }}</slide></slide></carousel>',
        {
          msg: 'hello',
        }
      )
    ).toThrow('Slide parent must be Carousel.')
  })
})
