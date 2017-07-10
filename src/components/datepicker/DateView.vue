<template>
  <table role="grid" style="width: 100%">
    <thead>
    <tr>
      <td>
        <button type="button" class="btn btn-default btn-sm btn-block" style="border: none" @click="goPrevMonth">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button>
      </td>
      <td colspan="5">
        <button type="button" class="btn btn-default btn-sm btn-block" style="border: none" @click="changeView">
          <b>{{yearMonthStr}}</b>
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-default btn-sm btn-block" style="border: none" @click="goNextMonth">
          <i class="glyphicon glyphicon-chevron-right"></i>
        </button>
      </td>
    </tr>
    <tr align="center">
      <td v-for="day in weekDays" width="14.2857142857%">
        <small>{{tWeekName(day)}}</small>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in monthDayRows">
      <td v-for="date in row">
        <button type="button"
                class="btn btn-sm btn-block"
                style="border: none"
                data-action="select"
                :class="getBtnClass(date)"
                :disabled="date.disabled"
                @click="select(date)">
          <span data-action="select" :class="{'text-muted':month!==date.month}">{{date.date}}</span>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Locale from '../../mixins/locale'
  import util from '../../utils/dateUtils'

  export default {
    mixins: [Locale],
    props: ['month', 'year', 'date', 'today', 'limit'],
    data () {
      return {
        weekDays: [7, 1, 2, 3, 4, 5, 6]
      }
    },
    computed: {
      yearMonthStr () {
        return this.month ? `${this.year} ${this.t(`uiv.datePicker.month${this.month + 1}`)}` : this.year
      },
      monthDayRows () {
        let rows = []
        let firstDay = new Date(this.year, this.month, 1)
        let prevMonthLastDate = new Date(this.year, this.month, 0).getUTCDate()
        let startIndex = firstDay.getDay()
        let daysNum = util.daysInMonth(this.month, this.year)

        for (let i = 0; i < 6; i++) {
          rows.push([])
          for (let j = 0; j < 7; j++) {
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
      getBtnClass (date) {
        if (this.date &&
          date.date === this.date.getUTCDate() &&
          date.month === this.date.getUTCMonth() &&
          date.year === this.date.getFullYear()) {
          return {'btn-primary': true}
        } else if (date.date === this.today.getUTCDate() &&
          date.month === this.today.getUTCMonth() &&
          date.year === this.today.getFullYear()) {
          return {'btn-info': true}
        } else {
          return {'btn-default': true}
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
