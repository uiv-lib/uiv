'use strict'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate()
  },
  getMonthNames () {
    return monthNames
  },
  getWeekDayNames () {
    return weekDayNames
  }
}
