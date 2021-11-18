<template>
  <table role="grid" style="width: 100%">
    <thead>
      <tr>
        <td>
          <btn
            class="uiv-datepicker-pager-prev"
            block
            size="sm"
            style="border: none"
            @click="goPrevMonth"
          >
            <i :class="iconControlLeft"></i>
          </btn>
        </td>
        <td :colspan="weekNumbers ? 6 : 5">
          <btn
            class="uiv-datepicker-title"
            block
            size="sm"
            style="border: none"
            @click="changeView"
          >
            <b>{{ yearMonthStr }}</b>
          </btn>
        </td>
        <td>
          <btn
            class="uiv-datepicker-pager-next"
            block
            size="sm"
            style="border: none"
            @click="goNextMonth"
          >
            <i :class="iconControlRight"></i>
          </btn>
        </td>
      </tr>
      <tr align="center">
        <td v-if="weekNumbers"></td>
        <td
          v-for="(day, index) in weekDays"
          :key="index"
          width="14.2857142857%"
        >
          <small class="uiv-datepicker-week">{{
            tWeekName(day === 0 ? 7 : day)
          }}</small>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in monthDayRows" :key="i">
        <td
          v-if="weekNumbers"
          class="text-center"
          style="border-right: 1px solid #eee"
        >
          <small class="text-muted">{{
            getWeekNumber(row[weekStartsWith])
          }}</small>
        </td>
        <td v-for="(d, j) in row" :key="`${i}_${j}`">
          <btn
            block
            size="sm"
            style="border: none"
            data-action="select"
            :class="d.classes"
            :type="getBtnType(d)"
            :disabled="d.disabled"
            @click="select(d)"
          >
            <span
              data-action="select"
              :class="{ 'text-muted': month !== d.month }"
              >{{ d.date }}</span
            >
          </btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Locale from '../../mixins/locale.mixin';
import Btn from './../button/Btn.vue';
import { daysInMonth, getWeekNumber } from '../../utils/date.utils';
import { isExist, isFunction } from '../../utils/object.utils';

export default {
  components: { Btn },
  mixins: [Locale],
  props: {
    month: { type: Number, default: undefined },
    year: { type: Number, default: undefined },
    date: { type: Date, default: undefined },
    today: { type: Date, default: undefined },
    limit: { type: Object, default: undefined },
    weekStartsWith: { type: Number, default: undefined },
    iconControlLeft: { type: String, default: undefined },
    iconControlRight: { type: String, default: undefined },
    dateClass: { type: Function, default: undefined },
    yearMonthFormatter: { type: Function, default: undefined },
    weekNumbers: Boolean,
  },
  emits: ['date-change', 'year-change', 'month-change', 'view-change'],
  computed: {
    weekDays() {
      const days = [];
      let firstDay = this.weekStartsWith;
      while (days.length < 7) {
        days.push(firstDay++);
        if (firstDay > 6) {
          firstDay = 0;
        }
      }
      return days;
    },
    yearMonthStr() {
      if (this.yearMonthFormatter) {
        return this.yearMonthFormatter(this.year, this.month);
      } else {
        return isExist(this.month)
          ? `${this.year} ${this.t(`uiv.datePicker.month${this.month + 1}`)}`
          : this.year;
      }
    },
    monthDayRows() {
      const rows = [];
      const firstDay = new Date(this.year, this.month, 1);
      const prevMonthLastDate = new Date(this.year, this.month, 0).getDate();
      const startIndex = firstDay.getDay();
      // console.log(startIndex)
      const daysNum = daysInMonth(this.month, this.year);
      let weekOffset = 0;
      if (this.weekStartsWith > startIndex) {
        weekOffset = 7 - this.weekStartsWith;
      } else {
        weekOffset = 0 - this.weekStartsWith;
      }
      // console.log(prevMonthLastDate, startIndex, daysNum)
      for (let i = 0; i < 6; i++) {
        rows.push([]);
        for (let j = 0 - weekOffset; j < 7 - weekOffset; j++) {
          const currentIndex = i * 7 + j;
          const date = { year: this.year, disabled: false };
          // date in and not in current month
          if (currentIndex < startIndex) {
            date.date = prevMonthLastDate - startIndex + currentIndex + 1;
            if (this.month > 0) {
              date.month = this.month - 1;
            } else {
              date.month = 11;
              date.year--;
            }
          } else if (currentIndex < startIndex + daysNum) {
            date.date = currentIndex - startIndex + 1;
            date.month = this.month;
          } else {
            date.date = currentIndex - startIndex - daysNum + 1;
            if (this.month < 11) {
              date.month = this.month + 1;
            } else {
              date.month = 0;
              date.year++;
            }
          }
          // process limit dates
          const dateObj = new Date(date.year, date.month, date.date);
          let afterFrom = true;
          let beforeTo = true;
          if (this.limit && this.limit.from) {
            afterFrom = dateObj >= this.limit.from;
          }
          if (this.limit && this.limit.to) {
            beforeTo = dateObj < this.limit.to;
          }
          date.disabled = !afterFrom || !beforeTo;
          if (isFunction(this.dateClass)) {
            date.classes = this.dateClass(dateObj, {
              currentMonth: this.month,
              currentYear: this.year,
            });
          } else {
            date.classes = '';
          }
          rows[i].push(date);
        }
      }
      return rows;
    },
  },
  methods: {
    getWeekNumber,
    tWeekName(index) {
      return this.t(`uiv.datePicker.week${index}`);
    },
    getBtnType(date) {
      if (
        this.date &&
        date.date === this.date.getDate() &&
        date.month === this.date.getMonth() &&
        date.year === this.date.getFullYear()
      ) {
        return 'primary';
      } else if (
        date.date === this.today.getDate() &&
        date.month === this.today.getMonth() &&
        date.year === this.today.getFullYear()
      ) {
        return 'info';
      } else {
        return 'default';
      }
    },
    select(date) {
      this.$emit('date-change', date);
    },
    goPrevMonth() {
      let month = this.month;
      let year = this.year;
      if (this.month > 0) {
        month--;
      } else {
        month = 11;
        year--;
        this.$emit('year-change', year);
      }
      this.$emit('month-change', month);
    },
    goNextMonth() {
      let month = this.month;
      let year = this.year;
      if (this.month < 11) {
        month++;
      } else {
        month = 0;
        year++;
        this.$emit('year-change', year);
      }
      this.$emit('month-change', month);
    },
    changeView() {
      this.$emit('view-change', 'm');
    },
  },
};
</script>
