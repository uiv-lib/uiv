import Locale from '../../mixins/locale.mixin'
import DateView from './DateView.vue'
import MonthView from './MonthView.vue'
import YearView from './YearView.vue'
import Btn from './../button/Btn'
import { stringify, convertDateToUTC } from '../../utils/date.utils'
import { isNumber } from '../../utils/object.utils'

export default {
  mixins: [Locale],
  components: { DateView, MonthView, YearView, Btn },
  props: {
    value: null,
    width: {
      type: Number,
      default: 270
    },
    todayBtn: {
      type: Boolean,
      default: true
    },
    clearBtn: {
      type: Boolean,
      default: true
    },
    closeOnSelected: {
      type: Boolean,
      default: true
    },
    limitFrom: null,
    limitTo: null,
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    initialView: {
      type: String,
      default: 'd'
    },
    dateParser: {
      type: Function,
      default: Date.parse
    },
    dateClass: Function,
    yearMonthFormatter: Function,
    weekStartsWith: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 6
      }
    },
    weekNumbers: Boolean,
    iconControlLeft: {
      type: String,
      default: 'glyphicon glyphicon-chevron-left'
    },
    iconControlRight: {
      type: String,
      default: 'glyphicon glyphicon-chevron-right'
    }
  },
  data () {
    return {
      show: false,
      now: new Date(),
      currentMonth: 0,
      currentYear: 0,
      view: 'd'
    }
  },
  computed: {
    valueDateObj () {
      let ts = this.dateParser(this.value)
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
    pickerStyle () {
      return {
        width: this.width + 'px'
      }
    },
    pickerClass () {
      return {
        'uiv-datepicker': true,
        'uiv-datepicker-date': this.view === 'd',
        'uiv-datepicker-month': this.view === 'm',
        'uiv-datepicker-year': this.view === 'y'
      }
    },
    limit () {
      let limit = {}
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
    }
  },
  mounted () {
    if (this.value) {
      this.setMonthAndYearByValue(this.value)
    } else {
      this.currentMonth = this.now.getMonth()
      this.currentYear = this.now.getFullYear()
      this.view = this.initialView
    }
  },
  watch: {
    value (val, oldVal) {
      this.setMonthAndYearByValue(val, oldVal)
    }
  },
  methods: {
    setMonthAndYearByValue (val, oldVal) {
      let ts = this.dateParser(val)
      if (!isNaN(ts)) {
        let date = new Date(ts)
        if (date.getHours() !== 0) {
          date = new Date(ts + date.getTimezoneOffset() * 60 * 1000)
        }
        if (this.limit && ((this.limit.from && date < this.limit.from) || (this.limit.to && date >= this.limit.to))) {
          this.$emit('input', oldVal || '')
        } else {
          this.currentMonth = date.getMonth()
          this.currentYear = date.getFullYear()
        }
      }
    },
    onMonthChange (month) {
      this.currentMonth = month
    },
    onYearChange (year) {
      this.currentYear = year
      this.currentMonth = undefined
    },
    onDateChange (date) {
      if (date && isNumber(date.date) && isNumber(date.month) && isNumber(date.year)) {
        let _date = new Date(date.year, date.month, date.date)
        this.$emit('input', this.format ? stringify(_date, this.format) : _date)
        // if the input event trigger nothing (same value)
        // manually correct
        this.currentMonth = date.month
        this.currentYear = date.year
      } else {
        this.$emit('input', '')
      }
    },
    onViewChange (view) {
      this.view = view
    },
    selectToday () {
      this.view = 'd'
      this.onDateChange({
        date: this.now.getDate(),
        month: this.now.getMonth(),
        year: this.now.getFullYear()
      })
    },
    clearSelect () {
      this.currentMonth = this.now.getMonth()
      this.currentYear = this.now.getFullYear()
      this.view = this.initialView
      this.onDateChange()
    },
    onPickerClick (event) {
      if (event.target.getAttribute('data-action') !== 'select' || !this.closeOnSelected) {
        event.stopPropagation()
      }
    }
  }
}
