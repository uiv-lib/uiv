<template>
  <table role="grid" style="width: 100%">
    <thead>
    <tr>
      <td>
        <button type="button" class="btn btn-default btn-sm btn-block" @click="goPrevMonth">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button>
      </td>
      <td colspan="5">
        <button type="button" class="btn btn-default btn-sm btn-block" @click="changeView">
          <b>{{yearMonthStr}}</b>
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-default btn-sm btn-block" @click="goNextMonth">
          <i class="glyphicon glyphicon-chevron-right"></i>
        </button>
      </td>
    </tr>
    <tr align="center">
      <td v-for="day in weekDayNames" width="14.2857142857%">
        <b>{{day}}</b>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in monthDayRows">
      <td v-for="date in row">
        <button type="button"
                class="btn btn-sm btn-block"
                :class="getBtnClass(date)"
                @click="select(date)">
          <span :class="{'text-muted':month!==date.month}">{{date.date}}</span>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import util from './dateUtils'
  export default {
    props: ['month', 'year', 'date', 'today'],
    computed: {
      yearMonthStr () {
        return `${this.year} ${util.getMonthNames()[this.month]}`
      },
      weekDayNames () {
        return util.getWeekDayNames()
      },
      monthDayRows () {
        let rows = []
        let firstDay = new Date(this.year, this.month, 1)
        let lastDayOfPrevMonth = new Date(this.year, this.month, 0)
        let prevMonthLastDate = lastDayOfPrevMonth.getDate()
        let startIndex = firstDay.getDay()
        let daysNum = util.daysInMonth(this.month, this.year)
        for (let i = 0; i < 6; i++) {
          rows.push([])
          for (let j = 0; j < 7; j++) {
            let currentIndex = i * 7 + j
            let date = {year: this.year}
            if (currentIndex < startIndex) {
              date.date = prevMonthLastDate - startIndex + currentIndex + 1
              date.month = this.month - 1
            } else if (currentIndex < startIndex + daysNum) {
              date.date = currentIndex - startIndex + 1
              date.month = this.month
            } else {
              date.date = currentIndex - startIndex - daysNum + 1
              date.month = this.month + 1
            }
            rows[i].push(date)
          }
        }
        return rows
      }
    },
    methods: {
      getBtnClass (date) {
        if (this.date &&
          date.date === this.date.getDate() &&
          date.month === this.date.getMonth() &&
          date.year === this.date.getFullYear()) {
          return {'btn-primary': true}
        } else if (date.date === this.today.getDate() &&
          date.month === this.today.getMonth() &&
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
