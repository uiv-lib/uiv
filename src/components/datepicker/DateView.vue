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

<script setup>
import { t } from '../../locale';
import Btn from './../button/Btn.vue';
import { daysInMonth, getWeekNumber } from '../../utils/date.utils';
import { isExist, isFunction } from '../../utils/object.utils';
import { computed } from 'vue';

const props = defineProps({
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
});
const emit = defineEmits([
  'date-change',
  'year-change',
  'month-change',
  'view-change',
]);

const weekDays = computed(() => {
  const days = [];
  let firstDay = props.weekStartsWith;
  while (days.length < 7) {
    days.push(firstDay++);
    if (firstDay > 6) {
      firstDay = 0;
    }
  }
  return days;
});
const yearMonthStr = computed(() => {
  if (props.yearMonthFormatter) {
    return props.yearMonthFormatter(props.year, props.month);
  } else {
    return isExist(props.month)
      ? `${props.year} ${t(`uiv.datePicker.month${props.month + 1}`)}`
      : props.year;
  }
});
const monthDayRows = computed(() => {
  const rows = [];
  const firstDay = new Date(props.year, props.month, 1);
  const prevMonthLastDate = new Date(props.year, props.month, 0).getDate();
  const startIndex = firstDay.getDay();
  // console.log(startIndex)
  const daysNum = daysInMonth(props.month, props.year);
  let weekOffset = 0;
  if (props.weekStartsWith > startIndex) {
    weekOffset = 7 - props.weekStartsWith;
  } else {
    weekOffset = 0 - props.weekStartsWith;
  }
  // console.log(prevMonthLastDate, startIndex, daysNum)
  for (let i = 0; i < 6; i++) {
    rows.push([]);
    for (let j = 0 - weekOffset; j < 7 - weekOffset; j++) {
      const currentIndex = i * 7 + j;
      const date = { year: props.year, disabled: false };
      // date in and not in current month
      if (currentIndex < startIndex) {
        date.date = prevMonthLastDate - startIndex + currentIndex + 1;
        if (props.month > 0) {
          date.month = props.month - 1;
        } else {
          date.month = 11;
          date.year--;
        }
      } else if (currentIndex < startIndex + daysNum) {
        date.date = currentIndex - startIndex + 1;
        date.month = props.month;
      } else {
        date.date = currentIndex - startIndex - daysNum + 1;
        if (props.month < 11) {
          date.month = props.month + 1;
        } else {
          date.month = 0;
          date.year++;
        }
      }
      // process limit dates
      const dateObj = new Date(date.year, date.month, date.date);
      let afterFrom = true;
      let beforeTo = true;
      if (props.limit?.from) {
        afterFrom = dateObj >= props.limit.from;
      }
      if (props.limit?.to) {
        beforeTo = dateObj < props.limit.to;
      }
      date.disabled = !afterFrom || !beforeTo;
      if (isFunction(props.dateClass)) {
        date.classes = props.dateClass(dateObj, {
          currentMonth: props.month,
          currentYear: props.year,
        });
      } else {
        date.classes = '';
      }
      rows[i].push(date);
    }
  }
  return rows;
});

function tWeekName(index) {
  return t(`uiv.datePicker.week${index}`);
}

function getBtnType(date) {
  if (
    props.date &&
    date.date === props.date.getDate() &&
    date.month === props.date.getMonth() &&
    date.year === props.date.getFullYear()
  ) {
    return 'primary';
  } else if (
    date.date === props.today.getDate() &&
    date.month === props.today.getMonth() &&
    date.year === props.today.getFullYear()
  ) {
    return 'info';
  } else {
    return 'default';
  }
}
function select(date) {
  emit('date-change', date);
}

function goPrevMonth() {
  let month = props.month;
  let year = props.year;
  if (props.month > 0) {
    month--;
  } else {
    month = 11;
    year--;
    emit('year-change', year);
  }
  emit('month-change', month);
}

function goNextMonth() {
  let month = props.month;
  let year = props.year;
  if (props.month < 11) {
    month++;
  } else {
    month = 0;
    year++;
    emit('year-change', year);
  }
  emit('month-change', month);
}

function changeView() {
  emit('view-change', 'm');
}
</script>
