import { pad } from './string.utils'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/**
 * Get total days number in a month.
 * because we're using 0 as the day so that it returns the last day
 * of the last month, so you have to add 1 to the month number
 * so it returns the correct amount of days.
 * https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
 * @param month 0-based
 * @param year
 * @returns {number}
 */
export function daysInMonth (month, year) {
  return new Date(year, month + 1, 0).getDate()
}

export function stringify (date, format) {
  try {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let monthName = monthNames[month - 1]
    return format
      .replace(/yyyy/g, year)
      .replace(/MMMM/g, monthName)
      .replace(/MMM/g, monthName.substring(0, 3))
      .replace(/MM/g, pad(month, 2))
      .replace(/dd/g, pad(day, 2))
      .replace(/yy/g, year)
      .replace(/M(?!a)/g, month)
      .replace(/d/g, day)
  } catch (e) {
    return ''
  }
}

export function convertDateToUTC (date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
}

/**
 * https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 * For a given date, get the ISO week number
 * Based on information at:
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 *
 * @param {number} d.year year of date
 * @param {number} d.month month of date
 * @param {number} d.date date of date
 * @returns {number}
 */
export function getWeekNumber (d) {
  // Copy date so don't modify original
  const _d = new Date(Date.UTC(d.year, d.month, d.date))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  _d.setUTCDate(_d.getUTCDate() + 4 - (_d.getUTCDay() || 7))
  // Get first day of year
  const yearStart = new Date(Date.UTC(_d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  return Math.ceil((((_d - yearStart) / 86400000) + 1) / 7)
}
