import { createWrapper, nextTick, sleep } from '../../__test__/utils'
import { RouterLinkStub } from '@vue/test-utils'
import Btn from './Btn'
import BtnGroup from './BtnGroup'

describe('BtnGroup', () => {
  it('should be able to render btn group', () => {
    const wrapper = createWrapper(`<div><btn-group>
  <btn>Left</btn>
  <btn>Middle</btn>
  <btn>Right</btn>
</btn-group></div>`)
    expect(wrapper.findAll('.btn-group').length).toEqual(1)
    expect(wrapper.findAll('.btn-group > .btn').length).toEqual(3)
  })

  it('should be able to render btn toolbar', () => {
    const wrapper = createWrapper(`<div><btn-toolbar>
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
    expect(wrapper.findAll('.btn-toolbar').length).toEqual(1)
    expect(wrapper.findAll('.btn-toolbar > .btn-group').length).toEqual(3)
  })

  it('should be able to render different sizes', () => {
    const wrapper = createWrapper(`<div>
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
    expect(wrapper.findAll('.btn-group').length).toEqual(4)
    expect(wrapper.findAll('.btn-group').at(0).classes()).toContain(
      'btn-group-lg'
    )
    expect(wrapper.findAll('.btn-group').at(2).classes()).toContain(
      'btn-group-sm'
    )
    expect(wrapper.findAll('.btn-group').at(3).classes()).toContain(
      'btn-group-xs'
    )
  })

  it('should be able to render nesting btn group', () => {
    const wrapper = createWrapper(`<div><btn-group>
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
    expect(wrapper.findAll('.btn-group > .btn').length).toEqual(4)
    expect(wrapper.findAll('.btn-group > .btn-group').length).toEqual(1)
  })

  it('should be able to render vertical btn group', () => {
    const wrapper = createWrapper(`<div><btn-group vertical>
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
    expect(wrapper.findAll('.btn-group-vertical').length).toEqual(1)
  })

  it('should be able to render justified btn group', async () => {
    const wrapper = createWrapper(`<div><btn-group justified>
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
    expect(wrapper.findAll('.btn-group-justified').length).toEqual(2)
    expect(wrapper.findAll('.btn-group-justified > .btn-group').length).toEqual(
      3
    )
    expect(
      wrapper.findAll('.btn-group-justified > .btn-group > .btn').length
    ).toEqual(3)
  })
})
