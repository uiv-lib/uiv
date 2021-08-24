import { createVm, destroyVm } from '../utils'

describe('ProgressBar', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to render default', async () => {
    vm = createVm('<progress-bar v-model="progress"/>', {
      progress: 66,
    })
    await vm.$nextTick()
    const bars = vm.$el
    expect(bars.querySelector('.progress-bar').style.width).to.equal('66%')
  })

  it('should be able to render label', async () => {
    vm = createVm(
      '<section><progress-bar v-model="progress" label/></section>',
      {
        progress1: 1,
        progress: 66,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').textContent).to.equal('66%')
  })

  it('should be able to render custom label', async () => {
    vm = createVm(
      '<section><progress-bar v-model="progress" label label-text="Loading......Please wait."/></section>',
      {
        progress1: 1,
        progress: 66,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').textContent).to.contain(
      'Loading...'
    )
  })

  it('should be able to render label with min width', async () => {
    vm = createVm(
      '<section><progress-bar v-model="progress1" min-width label/></section>',
      {
        progress1: 1,
        progress: 66,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').style.minWidth).to.equal(
      '2em'
    )
  })

  it('should be able to render different types', async () => {
    vm = createVm(
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
    expect(bars[0].querySelector('.progress-bar').className).to.contain(
      'progress-bar-success'
    )
    expect(bars[1].querySelector('.progress-bar').className).to.contain(
      'progress-bar-info'
    )
    expect(bars[2].querySelector('.progress-bar').className).to.contain(
      'progress-bar-warning'
    )
    expect(bars[3].querySelector('.progress-bar').className).to.contain(
      'progress-bar-danger'
    )
  })

  it('should be able to render striped', async () => {
    vm = createVm(
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
    expect(bars[0].querySelector('.progress-bar').className).to.contain(
      'progress-bar-striped'
    )
    expect(bars[1].querySelector('.progress-bar').className).to.contain(
      'progress-bar-striped'
    )
    expect(bars[2].querySelector('.progress-bar').className).to.contain(
      'progress-bar-striped'
    )
    expect(bars[3].querySelector('.progress-bar').className).to.contain(
      'progress-bar-striped'
    )
  })

  it('should be able to render animation', async () => {
    vm = createVm(
      '<div><progress-bar v-model="progress" striped active/></div>',
      {
        progress: 40,
      }
    )
    await vm.$nextTick()
    const bars = vm.$el.querySelectorAll('.progress')
    expect(bars[0].querySelector('.progress-bar').className).to.contain(
      'active'
    )
  })

  it('should be able to render stacked', async () => {
    vm = createVm(
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
    expect(bars[0].querySelectorAll('.progress-bar').length).to.equal(3)
  })
})
