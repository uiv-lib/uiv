import * as locale from '../../src/locale/index'

describe('locale', () => {
  it('should fetch correct value for given key', () => {
    locale.i18n()
    locale.use()
    expect(locale.t('uiv.datePicker.month1')).to.equal('January')
  })

  it('should fetch empty value for not exist given key', () => {
    expect(locale.t('uiv.datePicker.month13')).not.exist
    expect(locale.t('312.123')).to.equal('')
  })
})
