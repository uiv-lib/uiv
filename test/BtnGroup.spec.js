import $ from 'jquery'
import { createVm, destroyVm } from '../utils'

describe('BtnGroup', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to render btn group', () => {
    vm = createVm(`<div><btn-group>
  <btn>Left</btn>
  <btn>Middle</btn>
  <btn>Right</btn>
</btn-group></div>`)
    const _$el = $(vm.$el)
    expect(_$el.find('.btn-group').length).to.equal(1)
    expect(_$el.find('.btn-group > .btn').length).to.equal(3)
  })

  it('should be able to render btn toolbar', () => {
    vm = createVm(`<div><btn-toolbar>
  <btn-group>
    <btn>1</btn>
    <btn>2</btn>
    <btn>3</btn>
    <btn>4</btn>
  </btn-group>
  <btn-group>
    <btn>5</btn>
    <btn>6</btn>
    <btn>7</btn>
  </btn-group>
  <btn-group>
    <btn>8</btn>
  </btn-group>
</btn-toolbar></div>`)
    const _$el = $(vm.$el)
    expect(_$el.find('.btn-toolbar').length).to.equal(1)
    expect(_$el.find('.btn-toolbar > .btn-group').length).to.equal(3)
  })

  it('should be able to render different sizes', () => {
    vm = createVm(`<div>
  <btn-group size="lg">
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
  <btn-group>
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
  <btn-group size="sm">
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
  <btn-group size="xs">
    <btn>Left</btn>
    <btn>Middle</btn>
    <btn>Right</btn>
  </btn-group>
</div>`)
    const _$el = $(vm.$el)
    expect(_$el.find('.btn-group').length).to.equal(4)
    expect(_$el.find('.btn-group').get(0).className).to.contain('btn-group-lg')
    expect(_$el.find('.btn-group').get(2).className).to.contain('btn-group-sm')
    expect(_$el.find('.btn-group').get(3).className).to.contain('btn-group-xs')
  })

  it('should be able to render nesting btn group', () => {
    vm = createVm(`<div><btn-group>
  <btn>Left</btn>
  <btn>Middle</btn>
  <dropdown>
    <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
  <btn>Right</btn>
</btn-group></div>`)
    const _$el = $(vm.$el)
    expect(_$el.find('.btn-group > .btn').length).to.equal(4)
    expect(_$el.find('.btn-group > .btn-group').length).to.equal(1)
  })

  it('should be able to render vertical btn group', () => {
    vm = createVm(`<div><btn-group vertical>
  <btn>Top</btn>
  <btn>Center</btn>
  <dropdown>
    <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
  <btn>Bottom</btn>
</btn-group></div>`)
    const _$el = $(vm.$el)
    expect(_$el.find('.btn-group-vertical').length).to.equal(1)
  })

  it('should be able to render justified btn group', async () => {
    vm = createVm(`<div><btn-group justified>
  <btn href="javascript:;">Left</btn>
  <btn href="javascript:;">Middle</btn>
  <btn href="javascript:;">Right</btn>
</btn-group>
<br/>
<btn-group justified>
  <btn justified>Left</btn>
  <btn justified>Middle</btn>
  <dropdown>
    <btn class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
    <template slot="dropdown">
      <li><a role="button">Action</a></li>
      <li><a role="button">Another action</a></li>
      <li><a role="button">Something else here</a></li>
      <li role="separator" class="divider"></li>
      <li><a role="button">Separated link</a></li>
    </template>
  </dropdown>
</btn-group></div>`)
    const _$el = $(vm.$el)
    await vm.$nextTick()
    expect(_$el.find('.btn-group-justified').length).to.equal(2)
    expect(_$el.find('.btn-group-justified > .btn-group').length).to.equal(3)
    expect(
      _$el.find('.btn-group-justified > .btn-group > .btn').length
    ).to.equal(3)
  })
})
