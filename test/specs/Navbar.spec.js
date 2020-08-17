import { createVm, destroyVm, sleep } from '../utils'

function baseVm () {
  return createVm(`<div><navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <template slot="collapse">
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
        <template slot="dropdown">
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
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to render correct content', async () => {
    vm = baseVm()
    const nav = vm.$el.querySelector('nav')
    expect(nav.className).to.equal('navbar navbar-default')
    expect(nav.querySelector('.navbar-brand')).to.exist
    expect(nav.querySelector('.navbar-brand').textContent).to.equal('Brand')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    expect(collapse).to.exist
    expect(collapse.querySelectorAll('.nav.navbar-nav').length).to.equal(2)
    expect(collapse.querySelectorAll('.nav.navbar-nav.navbar-right').length).to.equal(1)
    expect(collapse.querySelectorAll('.navbar-form.navbar-left').length).to.equal(1)
  })

  it('should be able to render nav-text', async () => {
    vm = createVm(`<div><navbar>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <navbar-text>Signed in as wxsm</navbar-text>
</navbar></div>`)
    const nav = vm.$el.querySelector('nav')
    expect(nav.querySelector('.navbar-text')).to.exist
    expect(nav.querySelector('.navbar-text').textContent).to.equal('Signed in as wxsm')
  })

  it('should be able to render static top', async () => {
    vm = createVm(`<div><navbar static-top>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
</navbar></div>`)
    const nav = vm.$el.querySelector('nav')
    expect(nav.className).to.contain('navbar-static-top')
  })

  it('should be able to render inverse', async () => {
    vm = createVm(`<div><navbar inverse>
  <a class="navbar-brand" slot="brand" href="#">Brand</a>
  <template slot="collapse">
    <navbar-nav>
      <li class="active"><a role="button">Link <span class="sr-only">(current)</span></a></li>
      <li><a role="button">Link</a></li>
    </navbar-nav>
  </template>
</navbar></div>`)
    const nav = vm.$el.querySelector('nav')
    expect(nav.className).to.contain('navbar-inverse')
  })

  it('should be able to toggle collapse content', async () => {
    vm = baseVm()
    const nav = vm.$el.querySelector('nav')
    const trigger = nav.querySelector('.navbar-toggle')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    expect(collapse.className).not.contain('in')
    trigger.click()
    await sleep(500)
    expect(collapse.className).to.contain('in')
    trigger.click()
    await sleep(500)
    expect(collapse.className).not.contain('in')
  })

  it('should be able to use with v-model', async () => {
    vm = createVm('<div><navbar v-model="show"/></div>', {
      show: true
    })
    const nav = vm.$el
    const trigger = nav.querySelector('.navbar-toggle')
    const collapse = nav.querySelector('.navbar-collapse.collapse')
    await sleep(500)
    expect(collapse.className).to.contain('in')
    vm.show = false
    await sleep(500)
    expect(collapse.className).not.contain('in')
    trigger.click()
    await sleep(500)
    expect(collapse.className).to.contain('in')
  })

  it('should be able to render fixed-top', async () => {
    vm = createVm('<navbar fixed-top/>')
    const nav = vm.$el
    expect(nav.className).to.contain('navbar-fixed-top')
  })

  it('should be able to render fixed-bottom', async () => {
    vm = createVm('<navbar fixed-bottom/>')
    const nav = vm.$el
    expect(nav.className).to.contain('navbar-fixed-bottom')
  })
})
