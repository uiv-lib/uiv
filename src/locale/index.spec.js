import * as locale from './index';

describe('locale', () => {
  it('should fetch correct value for given key', () => {
    locale.i18n();
    locale.use();
    expect(locale.t('uiv.datePicker.month1')).toEqual('January');
  });

  it('should fetch empty value for not exist given key', () => {
    expect(locale.t('uiv.datePicker.month13')).not.toBeDefined();
    expect(locale.t('312.123')).toEqual('');
  });
});
