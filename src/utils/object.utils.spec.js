import * as utils from './object.utils';

describe('object.utils', () => {
  describe('#isExist ', () => {
    it('should be able return false if null', () => {
      expect(utils.isExist(null)).toBeFalsy();
    });

    it('should be able return false if undefined', () => {
      expect(utils.isExist(undefined)).toBeFalsy();
    });

    it('should be able return true if others', () => {
      expect(utils.isExist(0)).toBeTruthy();
      expect(utils.isExist(false)).toBeTruthy();
      expect(utils.isExist([])).toBeTruthy();
      expect(utils.isExist({})).toBeTruthy();
      expect(utils.isExist('')).toBeTruthy();
    });
  });

  describe('#isFunction ', () => {
    it('should be able return false if not function', () => {
      expect(utils.isFunction(null)).toBeFalsy();
    });

    it('should be able return true if function', () => {
      expect(utils.isFunction(() => 0)).toBeTruthy();
    });
  });

  describe('#isNumber  ', () => {
    it('should be able return false if not number', () => {
      expect(utils.isNumber(null)).toBeFalsy();
    });

    it('should be able return true if number', () => {
      expect(utils.isNumber(0)).toBeTruthy();
    });
  });

  describe('#isString', () => {
    it('should be able return false if not string', () => {
      expect(utils.isString(null)).toBeFalsy();
    });

    it('should be able return true if string', () => {
      expect(utils.isString('')).toBeTruthy();
    });
  });

  describe('#isBoolean', () => {
    it('should be able return false if not boolean', () => {
      expect(utils.isBoolean(null)).toBeFalsy();
    });

    it('should be able return true if boolean', () => {
      expect(utils.isBoolean(false)).toBeTruthy();
    });
  });
});
