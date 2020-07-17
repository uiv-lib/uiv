import $ from 'jquery'
import { createVm, destroyVm, triggerEvent, sleep, transitionDuration } from '../utils'

function baseVm () {
  return createVm(`<section>
    <btn type="primary" @click="open=true">Launch Demo Modal</btn>
    <modal v-model="open" title="Modal 1" @hide="callback" ref="modal" id="modal-demo">
      <h4>Text in a modal</h4>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <h4>Popover in a modal</h4>
      <p>
        This
        <btn v-popover:modal-demo="{title:'Title',content:'Some popover content...'}">button</btn>
        should trigger a popover on click.
      </p>
      <h4>Tooltips in a modal</h4>
      <p>
        <a role="button" v-tooltip:modal-demo="'Tooltip'">This link</a>
        <span>and</span>
        <a role="button" v-tooltip:modal-demo="'Tooltip'">that link</a>
        <span>should have tooltips on hover.</span>
      </p>
      <hr>
      <h4>Overflowing text to show scroll behavior</h4>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    </modal>
  </section>`, {
    open: false
  }, {
    methods: {
      callback (msg) {
        this.$notify(`Modal dismissed with msg '${msg}'.`)
      }
    }
  })
}

describe('Modal', () => {
  let vm

  afterEach(() => {
    destroyVm(vm)
    $('.alert').remove()
    $('.modal-backdrop').remove()
  })

  const getBackdropsNum = () => $('.modal-backdrop').length
  const expectBodyOverflow = (enable) => {
    if (enable) {
      expect(document.body.style.paddingRight).to.equal('')
      expect(document.body.className).not.contain('modal-open')
    } else {
      expect(document.body.style.paddingRight).to.contain(`px`)
      expect(document.body.className).to.contain('modal-open')
    }
  }

  it('should be able to use nested modals (logically)', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px'
    vm = createVm(`  <section>
    <btn type="primary" @click="open1=true">Open set of nested modals (logically)</btn>
    <modal v-model="open1" title="Modal 1" size="lg">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
    </modal>
    <modal v-model="open2" title="Modal 2">
      <p>This is a nested modal.</p>
      <btn type="info" @click="open3=true">Open Modal 3</btn>
    </modal>
    <modal v-model="open3" title="Modal 3" size="sm">
      <p>This is another nested modal.</p>
    </modal>
  </section>`, {
      open1: false,
      open2: false,
      open3: false
    })
    await vm.$nextTick()
    const _$el = $(vm.$el)
    const modal1 = _$el.find('.modal').get(0)
    const modal2 = _$el.find('.modal').get(1)
    const modal3 = _$el.find('.modal').get(2)
    const trigger = _$el.find('.btn').get(0)
    const trigger2 = _$el.find('.modal .modal-body .btn').get(0)
    const trigger3 = _$el.find('.modal .modal-body .btn').get(1)
    expect(getBackdropsNum()).to.equal(0)
    // open modal 1
    trigger.click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    expect(modal1.style.zIndex).to.equal('')
    expect($('.modal-backdrop').get(0).style.zIndex).to.equal('')
    expectBodyOverflow(false)
    // open modal 2
    trigger2.click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    expect(modal2.style.zIndex).to.equal('1070')
    expect($('.modal-backdrop').get(1).style.zIndex).to.equal('1060')
    expectBodyOverflow(false)
    // open modal 3
    trigger3.click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).to.contain('in')
    expect(getBackdropsNum()).to.equal(3)
    expect(modal3.style.zIndex).to.equal('1090')
    expect($('.modal-backdrop').get(2).style.zIndex).to.equal('1080')
    expectBodyOverflow(false)
    // dismiss modal 3
    modal3.querySelector('.btn-primary').click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false)
    // dismiss modal 2
    modal2.querySelector('.btn-primary').click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false)
    // dismiss modal 1
    modal1.querySelector('.btn-primary').click()
    await sleep(transitionDuration)
    expect(modal1.className).not.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(0)
    // body overflow should be enable now
    expectBodyOverflow(true)
    // reset body height
    document.body.style.height = ''
  })

  it('should be able to use nested modals', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px'
    vm = createVm(`  <section>
    <btn type="primary" @click="open1=true">Open set of nested modals</btn>
    <!-- \`append-to-body\` not required here -->
    <modal v-model="open1" title="Modal 1" size="lg" ref="modal1">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
      <!-- \`append-to-body\` required, because this is a nested modal -->
      <modal v-model="open2" title="Modal 2" append-to-body ref="modal2">
        <p>This is a nested modal.</p>
        <btn type="info" @click="open3=true">Open Modal 3</btn>
        <!-- \`append-to-body\` required, because this is a nested modal -->
        <modal v-model="open3" title="Modal 3" size="sm" append-to-body ref="modal3">
          <p>This is another nested modal.</p>
        </modal>
      </modal>
    </modal>
  </section>`, {
      open1: false,
      open2: false,
      open3: false
    })
    await vm.$nextTick()
    const _$el = $(vm.$el)
    const modal1 = _$el.find('.modal').get(0)
    const modal2 = _$el.find('.modal').get(1)
    const modal3 = _$el.find('.modal').get(2)
    const trigger = _$el.find('.btn').get(0)
    const trigger2 = _$el.find('.modal .modal-body .btn').get(0)
    const trigger3 = _$el.find('.modal .modal-body .btn').get(1)
    expect(getBackdropsNum()).to.equal(0)
    // open modal 1
    trigger.click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    expect(modal1.style.zIndex).to.equal('')
    expect($('.modal-backdrop').get(0).style.zIndex).to.equal('')
    expectBodyOverflow(false)
    // open modal 2
    trigger2.click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    expect(modal2.style.zIndex).to.equal('1070')
    expect($('.modal-backdrop').get(1).style.zIndex).to.equal('1060')
    expectBodyOverflow(false)
    // open modal 3
    trigger3.click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).to.contain('in')
    expect(getBackdropsNum()).to.equal(3)
    expect(modal3.style.zIndex).to.equal('1090')
    expect($('.modal-backdrop').get(2).style.zIndex).to.equal('1080')
    expectBodyOverflow(false)
    // dismiss modal 3
    modal3.querySelector('.btn-primary').click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false)
    // dismiss modal 2
    modal2.querySelector('.btn-primary').click()
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false)
    // dismiss modal 1
    modal1.querySelector('.btn-primary').click()
    await sleep(transitionDuration)
    expect(modal1.className).not.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(0)
    // body overflow should be enable now
    expectBodyOverflow(true)
    // reset body height
    document.body.style.height = ''
  })

  it('should be able to open modal 1', async () => {
    vm = baseVm()
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
  })

  it('should be able to close by esc key click', async () => {
    vm = baseVm()
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    vm.$refs.modal.onKeyPress({ keyCode: 28 }) // not a esc key
    await vm.$nextTick()
    expect(vm.open).to.equal(true)
    vm.$refs.modal.onKeyPress({ keyCode: 27 }) // esc key
    await vm.$nextTick()
    expect(vm.open).to.equal(false)
  })

  it('should be able to close modal 1 and fire callback', async () => {
    vm = baseVm()
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    triggerEvent(_$el.find('button.close').get(0), 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(_$el.find('.modal').get(0).className).not.contain('in')
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.contain('dismiss')
  })

  it('should be able to close modal 1 with ok option and fire callback', async () => {
    vm = baseVm()
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(_$el.find('.modal').get(0).className).to.contain('in')
    expect(_$el.find('.modal-title').get(0).textContent).to.equal('Modal 1')
    triggerEvent(_$el.find('.modal-footer button').get(1), 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(_$el.find('.modal').get(0).className).not.contain('in')
    expect(document.querySelector('.alert')).to.exist
    expect(document.querySelector('.alert .media-body > div').textContent).to.contain('ok')
  })

  it('should be able to render large modal', async () => {
    vm = createVm(` <section>
    <btn type="primary" @click="open1=true">Large Modal</btn>
    <modal v-model="open1" title="Modal Title" size="lg">
      <p>This is a large modal.</p>
    </modal>
  </section>`, {
      open1: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-lg').textContent).to.exist
  })

  it('should be able to render small modal', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open2=true">Small Modal</btn>
    <modal v-model="open2" title="Modal Title" size="sm">
      <p>This is a small modal.</p>
    </modal>
  </section>`, {
      open2: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-dialog.modal-sm').textContent).to.exist
  })

  it('should be able to render HTML title modal', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open1=true">HTML Title</btn>
    <modal v-model="open1">
      <span slot="title"><i class="glyphicon glyphicon-heart"></i> Modal Title</span>
      <p>This is a modal with HTML title.</p>
    </modal>
  </section>`, {
      open1: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-title i')).to.exist
  })

  it('should be able to render no header modal', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open2=true">No Header</btn>
    <modal v-model="open2" :header="false">
      <p>This is a modal with no header.</p>
    </modal>
  </section>`, {
      open2: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-header')).not.exist
  })

  it('should be able to render customize footer modal', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open1=true">Custom Footer</btn>
    <modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <div slot="footer">
        <btn @click="open1=false">Cancel</btn>
        <btn type="warning">Warning Action</btn>
        <btn type="danger">Danger Action</btn>
      </div>
    </modal>
  </section>`, {
      open1: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
  })

  it('should be able to render no footer modal', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open2=true">No Footer</btn>
    <modal v-model="open2" title="Modal Title" :footer="false">
      <p>This is a modal with no footer.</p>
    </modal>
  </section>`, {
      open2: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelector('.modal-footer')).not.exist
  })

  it('should be able to close customize footer modal', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open1=true">Custom Footer</btn>
    <modal v-model="open1" title="Modal Title">
      <p>This is a modal with custom footer.</p>
      <div slot="footer">
        <btn @click="open1=false">Cancel</btn>
        <btn type="warning">Warning Action</btn>
        <btn type="danger">Danger Action</btn>
      </div>
    </modal>
  </section>`, {
      open1: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    expect(modal.querySelectorAll('.modal-footer button').length).to.equal(3)
    triggerEvent(modal.querySelectorAll('.modal-footer button')[0], 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(modal.className).not.contain('in')
  })

  it('should be able to customize button texts and types', async () => {
    vm = createVm(`<section>
    <btn type="primary" @click="open=true">Custom Button Text and Type</btn>
    <modal v-model="open" title="Are you sure?"
           ok-text="Yes, please" cancel-text="No way!"
           ok-type="danger" cancel-type="warning">
      <p>Do you really want to destroy this item?</p>
    </modal>
  </section>`, {
      open: false,
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = _$el.find('.modal').get(0)
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    const [cancelBtn, okBtn] = modal.querySelectorAll('.modal-footer button')
    expect(cancelBtn.textContent).to.equal('No way!')
    expect(cancelBtn.className).to.contain('btn-warning')
    expect(okBtn.textContent).to.equal('Yes, please')
    expect(okBtn.className).to.contain('btn-danger')
  })

  it('should be able to auto-focus on ok btn', async () => {
    vm = createVm(`  <section>
    <btn type="primary" @click="open=true">Auto Focus</btn>
    <modal v-model="open" title="Modal Title" auto-focus>
      <p>Check this out! The OK button is focused now.</p>
    </modal>
  </section>`, {
      open: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration + 100)
    // expect(vm.$refs.modal9.$el.querySelector('[data-action="auto-focus"]')).to.equal(vm.$refs.modal9.$el.querySelector(':focus'))
    // have no idea how to get this focused element
  })

  it('should be able to close modal on backdrop click', async () => {
    vm = baseVm()
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    triggerEvent(modal, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(modal.className).not.contain('in')
  })

  it('should not be able to close backdrop-false modal', async () => {
    vm = createVm(`  <section>
    <btn type="primary" @click="open=true">Disable Backdrop</btn>
    <modal v-model="open" title="Modal Title" :backdrop="false">
      <p>This is a modal that can not close by backdrop click.</p>
    </modal>
  </section>`, {
      open: false
    })
    const _$el = $(vm.$el)
    const trigger = _$el.find('.btn').get(0)
    const modal = vm.$el.querySelectorAll('.modal')[0]
    expect(document.querySelector('.modal-backdrop')).not.exist
    triggerEvent(trigger, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
    triggerEvent(modal, 'click')
    await sleep(transitionDuration)
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(modal.className).to.contain('in')
  })

  it('should be able to open modal on init', async () => {
    vm = createVm('<modal v-model="open" title="Modal 1"><p>This is a simple modal.</p></modal>', {
      open: true
    })
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.className).to.contain('in')
    expect(vm.$el.querySelector('.close')).to.exist
  })

  it('should be able to hide dismiss btn', async () => {
    vm = createVm('<modal v-model="open" title="Modal 1" :dismiss-btn="false"><p>This is a simple modal.</p></modal>', {
      open: true
    })
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.$el.className).to.contain('in')
    expect(vm.$el.querySelector('.close')).not.exist
  })

  it('should be able to use `beforeClose`', async () => {
    vm = createVm('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>', {
      open: true,
      msg: 'ok'
    }, {
      methods: {
        beforeClose () {
          this.msg = 'test'
          return true
        }
      }
    })
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await sleep(transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(vm.msg).to.equal('test')
  })

  it('should be able to interrupt hide with `beforeClose`', async () => {
    vm = createVm('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>', {
      open: true,
      msg: 'ok',
      dismissible: false
    }, {
      methods: {
        beforeClose () {
          return this.dismissible
        }
      }
    })
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await sleep(transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    vm.dismissible = true
    await vm.$nextTick()
    vm.$el.querySelector('button.close').click()
    await sleep(transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
  })

  it('should be able to use `beforeClose` when result is promise', async () => {
    vm = createVm('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>', {
      open: true,
      msg: 'ok'
    }, {
      methods: {
        beforeClose () {
          this.msg = 'test'
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      }
    })
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await sleep(transitionDuration)
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).not.exist
    expect(vm.msg).to.equal('test')
  })

  it('should be able to interrupt hide with `beforeClose` when result is promise', async () => {
    vm = createVm('<modal v-model="open" title="Modal 1" :before-close="beforeClose"><p>{{msg}}</p></modal>', {
      open: true,
      msg: 'ok'
    }, {
      methods: {
        beforeClose () {
          this.msg = 'test'
          return new Promise((resolve) => {
            resolve(false)
          })
        }
      }
    })
    await vm.$nextTick()
    expect(document.querySelector('.modal-backdrop')).to.exist
    expect(vm.msg).to.equal('ok')
    vm.$el.querySelector('button.close').click()
    await sleep(transitionDuration)
    await vm.$nextTick()
    expect(vm.msg).to.equal('test')
    expect(document.querySelector('.modal-backdrop')).to.exist
  })

  it('should close the top most modal only when ESC pressed', async () => {
    // enable body with overflow-y
    document.body.style.height = '9999px'
    vm = createVm(`<section>
    <btn type="primary" @click="open1=true">Open set of nested modals</btn>
    <!-- \`append-to-body\` not required here -->
    <modal v-model="open1" title="Modal 1" size="lg" ref="modal1">
      <p>This is a simple large modal.</p>
      <p>Click on the button below to open a nested modal.</p>
      <btn type="info" @click="open2=true">Open Modal 2</btn>
      <!-- \`append-to-body\` required, because this is a nested modal -->
      <modal v-model="open2" title="Modal 2" append-to-body ref="modal2">
        <p>This is a nested modal.</p>
        <btn type="info" @click="open3=true">Open Modal 3</btn>
        <!-- \`append-to-body\` required, because this is a nested modal -->
        <modal v-model="open3" title="Modal 3" size="sm" append-to-body ref="modal3">
          <p>This is another nested modal.</p>
        </modal>
      </modal>
    </modal>
  </section>`, {
      open1: false,
      open2: false,
      open3: false
    })
    await vm.$nextTick()
    const _$el = $(vm.$el)
    const modal1 = _$el.find('.modal').get(0)
    const modal2 = _$el.find('.modal').get(1)
    const modal3 = _$el.find('.modal').get(2)
    const trigger = _$el.find('.btn').get(0)
    const trigger2 = _$el.find('.modal .modal-body .btn').get(0)
    const trigger3 = _$el.find('.modal .modal-body .btn').get(1)
    expect(getBackdropsNum()).to.equal(0)
    // open modal 1
    trigger.click()
    await sleep(transitionDuration)
    // open modal 2
    trigger2.click()
    await sleep(transitionDuration)
    // open modal 3
    trigger3.click()
    await sleep(transitionDuration)
    // dismiss modal 3
    vm.$refs.modal1.onKeyPress({ keyCode: 27 }) // esc key
    vm.$refs.modal2.onKeyPress({ keyCode: 27 }) // esc key
    vm.$refs.modal3.onKeyPress({ keyCode: 27 }) // esc key
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).to.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(2)
    // body overflow should be still disabled, because modal 1 & 2 is still open
    expectBodyOverflow(false)
    // dismiss modal 2
    vm.$refs.modal1.onKeyPress({ keyCode: 27 }) // esc key
    vm.$refs.modal2.onKeyPress({ keyCode: 27 }) // esc key
    vm.$refs.modal3.onKeyPress({ keyCode: 27 }) // esc key
    await sleep(transitionDuration)
    expect(modal1.className).to.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(1)
    // body overflow should be still disabled, because modal 1 is still open
    expectBodyOverflow(false)
    // dismiss modal 1
    vm.$refs.modal1.onKeyPress({ keyCode: 27 }) // esc key
    vm.$refs.modal2.onKeyPress({ keyCode: 27 }) // esc key
    vm.$refs.modal3.onKeyPress({ keyCode: 27 }) // esc key
    await sleep(transitionDuration)
    expect(modal1.className).not.contain('in')
    expect(modal2.className).not.contain('in')
    expect(modal3.className).not.contain('in')
    expect(getBackdropsNum()).to.equal(0)
    // body overflow should be enable now
    expectBodyOverflow(true)
    // reset body height
    document.body.style.height = ''
  })
})
