import * as utils from './date.utils';

describe('date.utils', () => {
  describe('#daysInMonth', () => {
    it('should return correct days in January 2020', () => {
      const days = utils.daysInMonth(0, 2020);
      expect(days).toEqual(31);
    });

    it('should return correct days in February 2020', () => {
      const days = utils.daysInMonth(1, 2020);
      expect(days).toEqual(29);
    });

    it('should return correct days in February 2019', () => {
      const days = utils.daysInMonth(1, 2019);
      expect(days).toEqual(28);
    });

    it('should return correct days in March 2020', () => {
      const days = utils.daysInMonth(2, 2020);
      expect(days).toEqual(31);
    });

    it('should return correct days in April 2020', () => {
      const days = utils.daysInMonth(3, 2020);
      expect(days).toEqual(30);
    });
  });

  describe('#stringify', () => {
    it('should format correctly with yyyy-MM-dd', () => {
      const date = new Date('2020-01-02');
      const str = utils.stringify(date, 'yyyy-MM-dd');
      expect(str).toEqual('2020-01-02');
    });

    it('should format correctly with yyyy-dd-MM', () => {
      const date = new Date('2020-01-02');
      const str = utils.stringify(date, 'yyyy-dd-MM');
      expect(str).toEqual('2020-02-01');
    });

    it('should format correctly with yyyy-MM-d', () => {
      const date = new Date('2020-01-02');
      const str = utils.stringify(date, 'yyyy-MM-d');
      expect(str).toEqual('2020-01-2');
    });

    it('should format correctly with yyyy-M-d', () => {
      const date = new Date('2020-01-02');
      const str = utils.stringify(date, 'yyyy-M-d');
      expect(str).toEqual('2020-1-2');
    });

    it('should format correctly with yyyy-MMM-dd', () => {
      const date = new Date('2020-01-02');
      const str = utils.stringify(date, 'yyyy-MMM-dd');
      expect(str).toEqual('2020-Jan-02');
      expect(utils.stringify(new Date('2020-02-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Feb-02'
      );
      expect(utils.stringify(new Date('2020-03-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Mar-02'
      );
      expect(utils.stringify(new Date('2020-04-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Apr-02'
      );
      expect(utils.stringify(new Date('2020-05-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-May-02'
      );
      expect(utils.stringify(new Date('2020-06-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Jun-02'
      );
      expect(utils.stringify(new Date('2020-07-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Jul-02'
      );
      expect(utils.stringify(new Date('2020-08-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Aug-02'
      );
      expect(utils.stringify(new Date('2020-09-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Sep-02'
      );
      expect(utils.stringify(new Date('2020-10-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Oct-02'
      );
      expect(utils.stringify(new Date('2020-11-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Nov-02'
      );
      expect(utils.stringify(new Date('2020-12-02'), 'yyyy-MMM-dd')).toEqual(
        '2020-Dec-02'
      );
    });

    it('should format correctly with yyyy-MMMM-dd', () => {
      const date = new Date('2020-01-02');
      const str = utils.stringify(date, 'yyyy-MMMM-dd');
      expect(str).toEqual('2020-January-02');
      expect(utils.stringify(new Date('2020-02-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-February-02'
      );
      expect(utils.stringify(new Date('2020-03-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-March-02'
      );
      expect(utils.stringify(new Date('2020-04-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-April-02'
      );
      expect(utils.stringify(new Date('2020-05-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-May-02'
      );
      expect(utils.stringify(new Date('2020-06-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-June-02'
      );
      expect(utils.stringify(new Date('2020-07-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-July-02'
      );
      expect(utils.stringify(new Date('2020-08-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-August-02'
      );
      expect(utils.stringify(new Date('2020-09-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-September-02'
      );
      expect(utils.stringify(new Date('2020-10-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-October-02'
      );
      expect(utils.stringify(new Date('2020-11-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-November-02'
      );
      expect(utils.stringify(new Date('2020-12-02'), 'yyyy-MMMM-dd')).toEqual(
        '2020-December-02'
      );
    });

    it('should be ok if date parse fail', () => {
      const date = new Date('asd');
      const str = utils.stringify(date, 'yyyy-MM-dd');
      expect(str).toEqual('');
    });
  });

  describe('#convertDateToUTC', () => {
    it('should work', () => {
      const date = new Date('Fri, 1 Jan 2020 08:01:02 GMT');
      const utc = utils.convertDateToUTC(date);
      expect(utc.getFullYear()).toEqual(2020);
      expect(utc.getMonth()).toEqual(0);
      expect(utc.getDate()).toEqual(1);
      expect(utc.getHours()).toEqual(8);
      expect(utc.getMinutes()).toEqual(1);
      expect(utc.getSeconds()).toEqual(2);
    });
  });

  describe('#getWeekNumber', () => {
    it('should work on weekdays', () => {
      const date = new Date('2020-01-01');
      const weekNum = utils.getWeekNumber({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      expect(weekNum).toEqual(1);
      const date2 = new Date('2020-02-01');
      const weekNum2 = utils.getWeekNumber({
        year: date2.getFullYear(),
        month: date2.getMonth(),
        date: date2.getDate(),
      });
      expect(weekNum2).toEqual(5);
    });

    it('should work on sunday', () => {
      const date = new Date('2020-01-05');
      const weekNum = utils.getWeekNumber({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });
      expect(weekNum).toEqual(1);
    });
  });
});
