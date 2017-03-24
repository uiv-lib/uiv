<template>
  <div class="date-picker" :style="pickerStyle" @click="onPickerClick">
    <date-view v-show="view==='d'"
               :month="currentMonth"
               :year="currentYear"
               :date="value"
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
          Today
        </button>
        <button type="button" data-action="select" class="btn btn-default btn-sm" v-if="clearBtn" @click="clearSelect">
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import DateView from './DateView.vue'
  import MonthView from './MonthView.vue'
  import YearView from './YearView.vue'
  export default {
    components: {DateView, MonthView, YearView},
    props: {
      value: {
        type: Date
      },
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
      limitTo: {}
    },
    data () {
      return {
        show: false,
        showByTrigger: false,
        now: new Date(),
        currentMonth: {},
        currentYear: 0,
        view: 'd'
      }
    },
    computed: {
      pickerStyle () {
        return {
          width: this.width + 'px'
        }
      },
      limit () {
        let limit = {}
        if (this.limitFrom) {
          let from = new Date(this.limitFrom)
          if (!isNaN(from.getTime())) {
            from.setHours(0, 0, 0, 0)
            limit.from = from
          }
        }
        if (this.limitTo) {
          let to = new Date(this.limitTo)
          if (!isNaN(to.getTime())) {
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
    },
    watch: {
      value: {
        handler: function (val, oldVal) {
          this.currentMonth = val.getMonth()
          this.currentYear = val.getFullYear()
        },
        deep: true
      }
    },
    methods: {
      onMonthChange (month) {
        this.currentMonth = month
      },
      onYearChange (year) {
        this.currentYear = year
      },
      onDateChange (date) {
        if (date &&
          typeof date.date === 'number' &&
          typeof date.month === 'number' &&
          typeof date.year === 'number') {
          this.$emit('input', new Date(date.year, date.month, date.date))
        } else {
          this.$emit('input', null)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .date-picker {
    .btn-date {
      border-radius: 0;
      border: none;
      user-select: none;
    }
  }
</style>
