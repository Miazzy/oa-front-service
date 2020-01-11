import { MS, Y, D, W } from '../../constant';
export default (function (o, c, d) {
  var proto = c.prototype;

  proto.week = function (week) {
    if (week === void 0) {
      week = null;
    }

    if (week !== null) {
      return this.add((week - this.week()) * 7, 'day');
    } // d(this) clone is for badMutable plugin


    var endOfYear = d(this).endOf(Y);

    if (endOfYear.day() !== 6 && this.month() === 11 && 31 - this.date() <= endOfYear.day()) {
      return 1;
    }

    var startOfYear = d(this).startOf(Y);
    var compareDay = startOfYear.subtract(startOfYear.day(), D).subtract(1, MS);
    var diffInWeek = this.diff(compareDay, W, true);
    return Math.ceil(diffInWeek);
  };

  proto.weeks = function (week) {
    if (week === void 0) {
      week = null;
    }

    return this.week(week);
  };
});