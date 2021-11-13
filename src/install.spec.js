import * as uiv from './install'

describe('install', () => {
  function Vue() {
    // nothing
  }

  Vue.component = (key) => {
    // console.log(key)
  }
  Vue.directive = (key) => {
    // console.log(key)
  }

  Vue.config.globalProperties = {}

  let cSpy, dSpy

  beforeEach(() => {
    cSpy = jest.spyOn(Vue, 'component')
    dSpy = jest.spyOn(Vue, 'directive')
  })

  it('should be able to install with prefix', () => {
    // simulate a Vue.use
    uiv.install(Vue, { prefix: 'uiv' })
    // components
    expect(cSpy).toBeCalledWith('uivAlert', expect.any(Object))
    expect(cSpy).toBeCalledWith('uivModal', expect.any(Object))
    // directives
    expect(dSpy).toBeCalledWith('uiv-tooltip', expect.any(Object))
    expect(dSpy).toBeCalledWith('uiv-scrollspy', expect.any(Object))
    // methods
    expect(Vue.config.globalProperties.$uiv_alert).toEqual(expect.any(Function))
    expect(Vue.config.globalProperties.$uiv_notify).toEqual(
      expect.any(Function)
    )
  })
})
