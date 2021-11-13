import { createWrapper, sleep } from '../../__test__/utils'

function baseVm() {
  return createWrapper(`<div><navbar>
    <template #brand><a class="navbar-brand" href="#">Brand</a></template>
  <template #collapse>
    <navbar-nav>
      <li class="active"><a role="button">Link <span class="sr-only">(current)</span></a></li>
      <li><a role="button">Link</a></li>
    </navbar-nav>
    <navbar-form left>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search">
      </div>
      <btn>Submit</btn>
    </navbar-form>
    <navbar-nav right>
      <li><a role="button">Link</a></li>
      <dropdown tag="li">
        <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
        <template #dropdown>
          <li><a role="button">Action</a></li>
          <li><a role="button">Another action</a></li>
          <li><a role="button">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a role="button">Separated link</a></li>
        </template>
      </dropdown>
    </navbar-nav>
  </template>
</navbar></div>`)
}

describe('Navbar', () => {
  it('should be able to render correct content', async () => {
    const wrapper = baseVm()
    const nav = wrapper.vm.$el.querySelector('nav')
    expect(nav.className).toEqual('navbar navbar-default')
    expect(nav.querySelector('.navbar-brand')).toBeDefined()
    expect(nav.querySelector('.navbar-brand').textContent).toEqual('Brand')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    expect(collapse).toBeDefined()
    expect(collapse.querySelectorAll('.nav.navbar-nav').length).toEqual(2)
    expect(
      collapse.querySelectorAll('.nav.navbar-nav.navbar-right').length
    ).toEqual(1)
    expect(
      collapse.querySelectorAll('.navbar-form.navbar-left').length
    ).toEqual(1)
  })

  it('should be able to render nav-text', async () => {
    const wrapper = createWrapper(`<div><navbar>
      <template #brand><a class="navbar-brand" href="#">Brand</a></template>
  <navbar-text>Signed in as wxsm</navbar-text>
</navbar></div>`)
    const nav = wrapper.vm.$el.querySelector('nav')
    expect(nav.querySelector('.navbar-text')).toBeDefined()
    expect(nav.querySelector('.navbar-text').textContent).toEqual(
      'Signed in as wxsm'
    )
  })

  it('should be able to render static top', async () => {
    const wrapper = createWrapper(`<div><navbar static-top>
      <template #brand><a class="navbar-brand" href="#">Brand</a></template>
</navbar></div>`)
    const nav = wrapper.vm.$el.querySelector('nav')
    expect(nav.className).toContain('navbar-static-top')
  })

  it('should be able to render inverse', async () => {
    const wrapper = createWrapper(`<div><navbar inverse>
      <template #brand><a class="navbar-brand" href="#">Brand</a></template>
  <template #collapse>
    <navbar-nav>
      <li class="active"><a role="button">Link <span class="sr-only">(current)</span></a></li>
      <li><a role="button">Link</a></li>
    </navbar-nav>
  </template>
</navbar></div>`)
    const nav = wrapper.vm.$el.querySelector('nav')
    expect(nav.className).toContain('navbar-inverse')
  })

  it('should be able to toggle collapse content', async () => {
    const wrapper = baseVm()
    const nav = wrapper.vm.$el.querySelector('nav')
    const trigger = nav.querySelector('.navbar-toggle')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    expect(collapse.className).not.toContain('in')
    trigger.click()
    await sleep(500)
    expect(collapse.className).toContain('in')
    trigger.click()
    await sleep(500)
    expect(collapse.className).not.toContain('in')
  })

  it('should be able to use with v-model', async () => {
    const wrapper = createWrapper('<div><navbar v-model="show"/></div>', {
      show: true,
    })
    const vm = wrapper.vm
    const nav = vm.$el
    const trigger = nav.querySelector('.navbar-toggle')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    await sleep(500)
    expect(collapse.className).toContain('in')
    vm.show = false
    await sleep(500)
    expect(collapse.className).not.toContain('in')
    trigger.click()
    await sleep(500)
    expect(collapse.className).toContain('in')
  })

  it('should be able to render fixed-top', async () => {
    const wrapper = createWrapper('<navbar fixed-top/>')
    const vm = wrapper.vm
    const nav = vm.$el
    expect(nav.className).toContain('navbar-fixed-top')
  })

  it('should be able to render fixed-bottom', async () => {
    const wrapper = createWrapper('<navbar fixed-bottom/>')
    const vm = wrapper.vm
    const nav = vm.$el
    expect(nav.className).toContain('navbar-fixed-bottom')
  })
})
