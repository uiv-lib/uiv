<template>
  <div class="date-picker" v-show="inline || (!inline && show)" :style="pickerStyle">
    <ul class="dropdown-menu">
      <li>
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
            <button type="button" class="btn btn-info btn-sm" v-if="todayBtn" @click="selectToday">Today</button>
            <button type="button" class="btn btn-default btn-sm" v-if="clearBtn" @click="clearSelect">Clear</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import DateView from './DateView.vue'
  import MonthView from './MonthView.vue'
  import YearView from './YearView.vue'
  export default {
    components: {DateView, MonthView, YearView},
    props: {
      value: {}, // This is the v-model value
      width: {
        'default': 270
      },
      inline: {
        type: Boolean,
        'default': false
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
        let style = {
          width: this.width + 'px'
        }
        if (!this.inline) {
          style.position = 'absolute'
        }
        return style
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
      window.addEventListener('click', this.windowClicked)
    },
    beforeDestroy () {
      window.removeEventListener('click', this.windowClicked)
    },
    watch: {
      value (value) {
        try {
          this.currentMonth = value.getMonth()
          this.currentYear = value.getFullYear()
        } catch (e) {
          // Silent
        }
      }
    },
    methods: {
      toggle (show) {
        if (typeof show !== 'undefined') {
          this.show = !!show
        } else {
          this.show = !this.show
        }
        this.showByTrigger = this.show
      },
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
        if (!this.inline && this.closeOnSelected) {
          this.toggle(false)
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
      windowClicked (event) {
        if (this.show && this.showByTrigger) {
          this.showByTrigger = false
          return
        }
        if (this.show && !this.$el.contains(event.target)) {
          this.show = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .date-picker {
    position: relative;

    > .dropdown-menu {
      display: block;
      position: relative;
      width: 100%;
    }

    .btn-date {
      border-radius: 0;
      border: none;
      user-select: none;
    }
  }
</style>
