import Vue from 'vue'
import $ from 'jquery'
import Affix from '@src/components/affix/Affix.vue'
import utils from './../utils'

describe('Affix', () => {
  let vm
  let $el

  beforeEach(() => {
    let res = Vue.compile(`
<div style="height: 2000px">
  <affix :offset="offset">
    <ul>
      <li>Test1</li>
      <li>Test2</li>
      <li>Test3</li>
    </ul>
  </affix>
</div>`)
    vm = new Vue({
      components: {Affix},
      data () {
        return {
          offset: 0
        }
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    }).$mount()
    $el = $(vm.$el).appendTo('body')
  })

  afterEach(() => {
    vm.$destroy()
    $el.remove()
    window.scrollTo(0, 0)
  })

  it('should be able to toggle affix class', async () => {
    expect($el.find('.affix').length).to.equal(0)
    window.scrollTo(0, 500)
    await utils.sleep(200)
    expect($el.find('.affix').length).to.equal(1)
    window.scrollTo(0, 0)
    await utils.sleep(200)
    expect($el.find('.affix').length).to.equal(0)
  })

  it('should not toggle affix class if element is hidden', async () => {
    $el.css('display', 'none')
    expect($el.find('.affix').length).to.equal(0)
    window.scrollTo(0, 500)
    await utils.sleep(200)
    expect($el.find('.affix').length).to.equal(0)
  })

  it('should be able to use offset', async () => {
    vm.offset = 50
    await vm.$nextTick()
    window.scrollTo(0, 500)
    await utils.sleep(200)
    expect($el.find('.affix').css('margin-top')).to.equal('50px')
  })
})
