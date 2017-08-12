import stringUtils from './stringUtils'

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

export default {
  daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate()
  },
  stringify (date, format) {
    try {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let monthName = monthNames[month - 1]
      return format
        .replace(/yyyy/g, year)
        .replace(/MMMM/g, monthName)
        .replace(/MMM/g, monthName.substring(0, 3))
        .replace(/MM/g, stringUtils.pad(month, 2))
        .replace(/dd/g, stringUtils.pad(day, 2))
        .replace(/yy/g, year)
        .replace(/M(?!a)/g, month)
        .replace(/d/g, day)
    } catch (e) {
      return ''
    }
  }
}
