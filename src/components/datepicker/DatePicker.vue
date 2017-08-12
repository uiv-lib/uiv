<template>
  <div :style="pickerStyle" @click="onPickerClick">
    <date-view v-show="view==='d'"
               :month="currentMonth"
               :year="currentYear"
               :date="valueDateObj"
               :today="now"
               :limit="limit"
               @month-change="onMonthChange"
               @year-change="onYearChange"
               @date-change="onDateChange"
               @view-change="onViewChange">
    </date-view>
    <month-view v-show="view==='m'"
                :month="currentMonth"
                :year="currentYear"
                @month-change="onMonthChange"
                @year-change="onYearChange"
                @view-change="onViewChange">
    </month-view>
    <year-view v-show="view==='y'"
               :year="currentYear"
               @year-change="onYearChange"
               @view-change="onViewChange">
    </year-view>
    <div v-if="todayBtn||clearBtn">
      <br/>
      <div class="text-center">
        <button type="button" data-action="select" class="btn btn-info btn-sm" v-if="todayBtn" @click="selectToday">
          {{t('uiv.datePicker.today')}}
        </button>
        <button type="button" data-action="select" class="btn btn-default btn-sm" v-if="clearBtn" @click="clearSelect">
          {{t('uiv.datePicker.clear')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Locale from '../../mixins/locale'
  import DateView from './DateView.vue'
  import MonthView from './MonthView.vue'
  import YearView from './YearView.vue'
  import dateUtils from '../../utils/dateUtils'

  export default {
    mixins: [Locale],
    components: {DateView, MonthView, YearView},
    props: {
      value: {},
      width: {
        'default': 270
      },
      todayBtn: {
        type: Boolean,
        'default': true
      },
      clearBtn: {
        type: Boolean,
        'default': true
      },
      closeOnSelected: {
        type: Boolean,
        'default': true
      },
      limitFrom: {},
      limitTo: {},
      format: {
        type: String,
        'default': 'yyyy-MM-dd'
      },
      initialView: {
        type: String,
        'default': 'd'
      },
      dateParser: {
        type: Function,
        'default': Date.parse
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
      limit () {
        let limit = {}
        if (this.limitFrom) {
          let from = this.dateParser(this.limitFrom)
          if (!isNaN(from)) {
            from = new Date(from)
            from.setHours(0, 0, 0, 0)
            limit.from = from
          }
        }
        if (this.limitTo) {
          let to = this.dateParser(this.limitTo)
          if (!isNaN(to)) {
            to = new Date(to)
            to.setHours(0, 0, 0, 0)
            limit.to = to
          }
        }
        return limit
      }
    },
    mounted () {
      this.currentMonth = this.now.getMonth()
      this.currentYear = this.now.getFullYear()
      if (!this.value) {
        this.view = this.initialView
      }
    },
    watch: {
      value (val, oldVal) {
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
      }
    },
    methods: {
      onMonthChange (month) {
        this.currentMonth = month
      },
      onYearChange (year) {
        this.currentYear = year
        this.currentMonth = undefined
      },
      onDateChange (date) {
        if (date &&
          typeof date.date === 'number' &&
          typeof date.month === 'number' &&
          typeof date.year === 'number') {
          let _date = new Date(date.year, date.month, date.date)
          this.$emit('input', dateUtils.stringify(_date, this.format))
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
        this.view = 'd'
        this.onDateChange()
      },
      onPickerClick (event) {
        if (event.target.getAttribute('data-action') !== 'select' || !this.closeOnSelected) {
          event.stopPropagation()
        }
      }
    }
  }
</script>
