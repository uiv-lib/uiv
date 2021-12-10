import * as uiv from './index';
import { createApp } from 'vue';

describe('install', () => {
  let cSpy, dSpy, app;

  beforeEach(() => {
    app = createApp({});

    cSpy = jest.spyOn(app, 'component');
    dSpy = jest.spyOn(app, 'directive');
  });

  it('should have install function', async () => {
    expect(uiv.install).toEqual(expect.any(Function));
  });

  it('should be able to install with prefix', () => {
    // simulate a Vue.use
    app.use(uiv, { prefix: 'uiv' });
    // components
    expect(cSpy).toBeCalledWith('uivAlert', expect.any(Object));
    expect(cSpy).toBeCalledWith('uivModal', expect.any(Object));
    // directives
    expect(dSpy).toBeCalledWith('uiv-tooltip', expect.any(Object));
    expect(dSpy).toBeCalledWith('uiv-scrollspy', expect.any(Object));
    // methods
    expect(app.config.globalProperties.$uiv_alert).toEqual(
      expect.any(Function)
    );
    expect(app.config.globalProperties.$uiv_notify).toEqual(
      expect.any(Function)
    );
  });
});
