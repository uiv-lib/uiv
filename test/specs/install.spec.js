import * as uiv from '@src/install'

describe('install', () => {
  function Vue () {
    // nothing
  }

  Vue.component = (key) => {
    // console.log(key)
  }
  Vue.directive = (key) => {
    // console.log(key)
  }

  let cSpy, dSpy

  beforeEach(() => {
    cSpy = sinon.spy(Vue, 'component')
    dSpy = sinon.spy(Vue, 'directive')
  })

  afterEach(() => {
    Vue.component.restore()
    Vue.directive.restore()
  })

  it('should be able to install with prefix', () => {
    // simulate a Vue.use
    uiv.install(Vue, {prefix: 'uiv'})
    // components
    sinon.assert.calledWith(cSpy, 'uivAlert')
    sinon.assert.calledWith(cSpy, 'uivModal')
    // directives
    sinon.assert.calledWith(dSpy, 'uiv-tooltip')
    sinon.assert.calledWith(dSpy, 'uiv-popover')
    sinon.assert.calledWith(dSpy, 'uiv-scrollspy')
    // methods
    expect(Vue.prototype.$uiv_alert).to.exist
    expect(Vue.prototype.$uiv_notify).to.exist
  })
})
