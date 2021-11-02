describe('install', () => {
  function Vue() {
    // nothing
  }

  let cSpy, dSpy

  beforeEach(() => {
    Vue.component = (key) => {
      // console.log(key)
    }
    Vue.directive = (key) => {
      // console.log(key)
    }
    window.Vue = Vue

    cSpy = jest.spyOn(Vue, 'component')
    dSpy = jest.spyOn(Vue, 'directive')
  })

  it('should be able to auto install with prefix', () => {
    window.__uiv_options = {
      prefix: 'uiv',
    }
    require('./index.browser')
    // components
    expect(cSpy).toBeCalledWith('uivAlert', expect.any(Object))
    expect(cSpy).toBeCalledWith('uivModal', expect.any(Object))
    // directives
    expect(dSpy).toBeCalledWith('uiv-tooltip', expect.any(Object))
    expect(dSpy).toBeCalledWith('uiv-scrollspy', expect.any(Object))
    // methods
    expect(Vue.prototype.$uiv_alert).toEqual(expect.any(Function))
    expect(Vue.prototype.$uiv_notify).toEqual(expect.any(Function))
  })
})
