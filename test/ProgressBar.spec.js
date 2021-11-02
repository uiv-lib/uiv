import { createWrapper, destroyVm } from '../utils'

describe('ProgressBar', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to render default', async () => {
    const wrapper = createWrapper('<progress-bar v-model="progress"/>', {
      progress: 66,
    })
    await vm.$nextTick()
    const bars = vm.$el
    expect(bars.querySelector('.progress-bar').style.width).toEqual('66%')
  })

  it('should be able to render label', async () => {
    const wrapper = createWrapper(
      '<section><progress-bar v-model="progress" label/></section>',
      {
        progress1: 1,
        progress: 66,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').textContent).toEqual('66%')
  })

  it('should be able to render custom label', async () => {
    const wrapper = createWrapper(
      '<section><progress-bar v-model="progress" label label-text="Loading......Please wait."/></section>',
      {
        progress1: 1,
        progress: 66,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').textContent).toContain(
      'Loading...'
    )
  })

  it('should be able to render label with min width', async () => {
    const wrapper = createWrapper(
      '<section><progress-bar v-model="progress1" min-width label/></section>',
      {
        progress1: 1,
        progress: 66,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').style.minWidth).toEqual('2em')
  })

  it('should be able to render different types', async () => {
    const wrapper = createWrapper(
      `<section>
    <progress-bar v-model="progress40" type="success"/>
    <progress-bar v-model="progress20" type="info"/>
    <progress-bar v-model="progress60" type="warning"/>
    <progress-bar v-model="progress80" type="danger"/>
  </section>`,
      {
        progress20: 20,
        progress40: 40,
        progress60: 60,
        progress80: 80,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').className).toContain(
      'progress-bar-success'
    )
    expect(bars[1].querySelector('.progress-bar').className).toContain(
      'progress-bar-info'
    )
    expect(bars[2].querySelector('.progress-bar').className).toContain(
      'progress-bar-warning'
    )
    expect(bars[3].querySelector('.progress-bar').className).toContain(
      'progress-bar-danger'
    )
  })

  it('should be able to render striped', async () => {
    const wrapper = createWrapper(
      `  <section>
    <progress-bar v-model="progress40" type="success" striped/>
    <progress-bar v-model="progress20" type="info" striped/>
    <progress-bar v-model="progress60" type="warning" striped/>
    <progress-bar v-model="progress80" type="danger" striped/>
  </section>`,
      {
        progress20: 20,
        progress40: 40,
        progress60: 60,
        progress80: 80,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').className).toContain(
      'progress-bar-striped'
    )
    expect(bars[1].querySelector('.progress-bar').className).toContain(
      'progress-bar-striped'
    )
    expect(bars[2].querySelector('.progress-bar').className).toContain(
      'progress-bar-striped'
    )
    expect(bars[3].querySelector('.progress-bar').className).toContain(
      'progress-bar-striped'
    )
  })

  it('should be able to render animation', async () => {
    const wrapper = createWrapper(
      '<div><progress-bar v-model="progress" striped active/></div>',
      {
        progress: 40,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').className).toContain('active')
  })

  it('should be able to render stacked', async () => {
    const wrapper = createWrapper(
      `<div><progress-bar>
    <progress-bar-stack v-model="progress35" type="success"/>
    <progress-bar-stack v-model="progress20" type="warning" striped/>
    <progress-bar-stack v-model="progress10" type="danger"/>
  </progress-bar></div>`,
      {
        progress20: 20,
        progress35: 35,
        progress10: 10,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelectorAll('.progress-bar').length).toEqual(3)
  })
})
