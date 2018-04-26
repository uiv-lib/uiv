<template>
  <table role="grid" style="width: 100%">
    <thead>
    <tr>
      <td>
        <btn block size="sm" style="border: none" @click="goPrevMonth">
          <i :class="iconControlLeft"></i>
        </btn>
      </td>
      <td colspan="5">
        <btn block size="sm" style="border: none" @click="changeView">
          <b>{{yearMonthStr}}</b>
        </btn>
      </td>
      <td>
        <btn block size="sm" style="border: none" @click="goNextMonth">
          <i :class="iconControlRight"></i>
        </btn>
      </td>
    </tr>
    <tr align="center">
      <td v-for="day in weekDays" width="14.2857142857%">
        <small>{{tWeekName(day === 0 ? 7 : day)}}</small>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in monthDayRows">
      <td v-for="date in row">
        <btn
          block
          size="sm"
          style="border: none"
          data-action="select"
          :class="date.classes"
          :type="getBtnType(date)"
          :disabled="date.disabled"
          @click="select(date)">
          <span data-action="select" :class="{'text-muted':month!==date.month}">{{date.date}}</span>
        </btn>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Locale from '../../mixins/localeMixin'
  import Btn from './../button/Btn'
  import {daysInMonth} from '../../utils/dateUtils'
  import {isExist, isFunction} from '../../utils/objectUtils'

  export default {
    mixins: [Locale],
    props: {
      month: Number,
      year: Number,
      date: Date,
      today: Date,
      limit: Object,
      weekStartsWith: Number,
      iconControlLeft: String,
      iconControlRight: String,
      dateClass: Function,
      yearMonthFormatter: Function
    },
    components: {Btn},
    computed: {
      weekDays () {
        let days = []
        let firstDay = this.weekStartsWith
        while (days.length < 7) {
          days.push(firstDay++)
          if (firstDay > 6) {
            firstDay = 0
          }
        }
        return days
      },
      yearMonthStr () {
        if (this.yearMonthFormatter) {
          return this.yearMonthFormatter(this.year, this.month)
        } else {
          return isExist(this.month) ? `${this.year} ${this.t(`uiv.datePicker.month${this.month + 1}`)}` : this.year
        }
      },
      monthDayRows () {
        let rows = []
        let firstDay = new Date(this.year, this.month, 1)
        let prevMonthLastDate = new Date(this.year, this.month, 0).getDate()
        let startIndex = firstDay.getDay()
        // console.log(startIndex)
        let daysNum = daysInMonth(this.month, this.year)
        let weekOffset = 0
        if (this.weekStartsWith > startIndex) {
          weekOffset = 7 - this.weekStartsWith
        } else {
          weekOffset = 0 - this.weekStartsWith
        }
        // console.log(prevMonthLastDate, startIndex, daysNum)
        for (let i = 0; i < 6; i++) {
          rows.push([])
          for (let j = 0 - weekOffset; j < 7 - weekOffset; j++) {
            let currentIndex = i * 7 + j
            let date = {year: this.year, disabled: false}
            // date in and not in current month
            if (currentIndex < startIndex) {
              date.date = prevMonthLastDate - startIndex + currentIndex + 1
              if (this.month > 0) {
                date.month = this.month - 1
              } else {
                date.month = 11
                date.year--
              }
            } else if (currentIndex < startIndex + daysNum) {
              date.date = currentIndex - startIndex + 1
              date.month = this.month
            } else {
              date.date = currentIndex - startIndex - daysNum + 1
              if (this.month < 11) {
                date.month = this.month + 1
              } else {
                date.month = 0
                date.year++
              }
            }
            // process limit dates
            let dateObj = new Date(date.year, date.month, date.date)
            let afterFrom = true
            let beforeTo = true
            if (this.limit && this.limit.from) {
              afterFrom = dateObj >= this.limit.from
            }
            if (this.limit && this.limit.to) {
              beforeTo = dateObj < this.limit.to
            }
            date.disabled = !afterFrom || !beforeTo
            date.classes = isFunction(this.dateClass) ? this.dateClass(dateObj) : ''
            rows[i].push(date)
          }
        }
        return rows
      }
    },
    methods: {
      tWeekName (index) {
        return this.t(`uiv.datePicker.week${index}`)
      },
      getBtnType (date) {
        if (this.date &&
          date.date === this.date.getDate() &&
          date.month === this.date.getMonth() &&
          date.year === this.date.getFullYear()) {
          return 'primary'
        } else if (date.date === this.today.getDate() &&
          date.month === this.today.getMonth() &&
          date.year === this.today.getFullYear()) {
          return 'info'
        } else {
          return 'default'
        }
      },
      select (date) {
        this.$emit('date-change', date)
      },
      goPrevMonth () {
        let month = this.month
        let year = this.year
        if (this.month > 0) {
          month--
        } else {
          month = 11
          year--
          this.$emit('year-change', year)
        }
        this.$emit('month-change', month)
      },
      goNextMonth () {
        let month = this.month
        let year = this.year
        if (this.month < 11) {
          month++
        } else {
          month = 0
          year++
          this.$emit('year-change', year)
        }
        this.$emit('month-change', month)
      },
      changeView () {
        this.$emit('view-change', 'm')
      }
    }
  }
</script>
