import * as utils from './string.utils';

describe('string.utils', () => {
  describe('#pad ', () => {
    it('should be able to pad string', () => {
      expect(utils.pad('1', 2)).toEqual('01');
      expect(utils.pad('01', 2)).toEqual('01');
      expect(utils.pad('001', 2)).toEqual('001');
    });

    it('should be able to pad non string', () => {
      expect(utils.pad(100, 5)).toEqual('00100');
    });
  });
});
