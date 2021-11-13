<template>
  <div
    :class="pickerClass"
    :style="pickerStyle"
    data-role="date-picker"
    @click="onPickerClick"
  >
    <date-view
      v-show="view === 'd'"
      :month="currentMonth"
      :year="currentYear"
      :date="valueDateObj"
      :today="now"
      :limit="limit"
      :week-starts-with="weekStartsWith"
      :icon-control-left="iconControlLeft"
      :icon-control-right="iconControlRight"
      :date-class="dateClass"
      :year-month-formatter="yearMonthFormatter"
      :week-numbers="weekNumbers"
      :locale="locale"
      @month-change="onMonthChange"
      @year-change="onYearChange"
      @date-change="onDateChange"
      @view-change="onViewChange"
    />
    <month-view
      v-show="view === 'm'"
      :month="currentMonth"
      :year="currentYear"
      :icon-control-left="iconControlLeft"
      :icon-control-right="iconControlRight"
      :locale="locale"
      @month-change="onMonthChange"
      @year-change="onYearChange"
      @view-change="onViewChange"
    />
    <year-view
      v-show="view === 'y'"
      :year="currentYear"
      :icon-control-left="iconControlLeft"
      :icon-control-right="iconControlRight"
      @year-change="onYearChange"
      @view-change="onViewChange"
    />
    <div v-if="todayBtn || clearBtn">
      <br />
      <div class="text-center">
        <btn
          v-if="todayBtn"
          data-action="select"
          data-type="today"
          type="info"
          size="sm"
          @click="selectToday"
          v-text="t('uiv.datePicker.today')"
        />
        <btn
          v-if="clearBtn"
          data-action="select"
          data-type="clear"
          size="sm"
          @click="clearSelect"
          v-text="t('uiv.datePicker.clear')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Locale from '../../mixins/locale.mixin'
import DateView from './DateView.vue'
import MonthView from './MonthView.vue'
import YearView from './YearView.vue'
import Btn from './../button/Btn.vue'
import { stringify, convertDateToUTC } from '../../utils/date.utils'
import { isNumber } from '../../utils/object.utils'

export default {
  components: { DateView, MonthView, YearView, Btn },
  mixins: [Locale],
  props: {
    modelValue: { type: null, required: true },
    width: {
      type: Number,
      default: 270,
    },
    todayBtn: {
      type: Boolean,
      default: true,
    },
    clearBtn: {
      type: Boolean,
      default: true,
    },
    closeOnSelected: {
      type: Boolean,
      default: true,
    },
    limitFrom: { type: null, default: undefined },
    limitTo: { type: null, default: undefined },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    initialView: {
      type: String,
      default: 'd',
    },
    dateParser: {
      type: Function,
      default: Date.parse,
    },
    dateClass: { type: Function, default: undefined },
    yearMonthFormatter: { type: Function, default: undefined },
    weekStartsWith: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 6
      },
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left',
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      show: false,
      now: new Date(),
      currentMonth: 0,
      currentYear: 0,
      view: 'd',
    }
  },
  computed: {
    valueDateObj() {
      const ts = this.dateParser(this.modelValue)
      if (isNaN(ts)) {
        return null
      } else {
        let date = new Date(ts)
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000)
        }
        return date
      }
    },
    pickerStyle() {
      return {
        width: this.width + 'px',
      }
    },
    pickerClass() {
      return {
        'uiv-datepicker': true,
        'uiv-datepicker-date': this.view === 'd',
        'uiv-datepicker-month': this.view === 'm',
        'uiv-datepicker-year': this.view === 'y',
      }
    },
    limit() {
      const limit = {}
      if (this.limitFrom) {
        let limitFrom = this.dateParser(this.limitFrom)
        if (!isNaN(limitFrom)) {
          limitFrom = convertDateToUTC(new Date(limitFrom))
          limitFrom.setHours(0, 0, 0, 0)
          limit.from = limitFrom
        }
      }
      if (this.limitTo) {
        let limitTo = this.dateParser(this.limitTo)
        if (!isNaN(limitTo)) {
          limitTo = convertDateToUTC(new Date(limitTo))
          limitTo.setHours(0, 0, 0, 0)
          limit.to = limitTo
        }
      }
      return limit
    },
  },
  watch: {
    modelValue(val, oldVal) {
      this.setMonthAndYearByValue(val, oldVal)
    },
  },
  mounted() {
    if (this.modelValue) {
      this.setMonthAndYearByValue(this.modelValue)
    } else {
      this.currentMonth = this.now.getMonth()
      this.currentYear = this.now.getFullYear()
      this.view = this.initialView
    }
  },
  methods: {
    setMonthAndYearByValue(val, oldVal) {
      const ts = this.dateParser(val)
      if (!isNaN(ts)) {
        let date = new Date(ts)
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000)
        }
        if (
          this.limit &&
          ((this.limit.from && date < this.limit.from) ||
            (this.limit.to && date >= this.limit.to))
        ) {
          this.$emit('update:modelValue', oldVal || '')
        } else {
          this.currentMonth = date.getMonth()
          this.currentYear = date.getFullYear()
        }
      }
    },
    onMonthChange(month) {
      this.currentMonth = month
    },
    onYearChange(year) {
      this.currentYear = year
      this.currentMonth = undefined
    },
    onDateChange(date) {
      if (
        date &&
        isNumber(date.date) &&
        isNumber(date.month) &&
        isNumber(date.year)
      ) {
        const _date = new Date(date.year, date.month, date.date)
        this.$emit(
          'update:modelValue',
          this.format ? stringify(_date, this.format) : _date
        )
        // if the input event trigger nothing (same value)
        // manually correct
        this.currentMonth = date.month
        this.currentYear = date.year
      } else {
        this.$emit('update:modelValue', '')
      }
    },
    onViewChange(view) {
      this.view = view
    },
    selectToday() {
      this.view = 'd'
      this.onDateChange({
        date: this.now.getDate(),
        month: this.now.getMonth(),
        year: this.now.getFullYear(),
      })
    },
    clearSelect() {
      this.currentMonth = this.now.getMonth()
      this.currentYear = this.now.getFullYear()
      this.view = this.initialView
      this.onDateChange()
    },
    onPickerClick(event) {
      if (
        event.target.getAttribute('data-action') !== 'select' ||
        !this.closeOnSelected
      ) {
        event.stopPropagation()
      }
    },
  },
}
</script>
