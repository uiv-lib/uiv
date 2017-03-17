<template>
  <div class="panel panel-default date-pick-panel"
       :class="{'date-pick-panel-inline':inline,'show':show}"
       :style="{width:width+'px'}">
    <div class="panel-body">
      <date-view v-show="view==='d'"
                 :month="currentMonth"
                 :year="currentYear"
                 :date="value"
                 :today="now"
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
      width: {
        'default': 270
      },
      inline: {
        type: Boolean,
        'default': false
      },
      value: {}
    },
    data () {
      return {
        show: false,
        showByTrigger: false,
        locale: 'en-us',
        now: new Date(),
        currentMonth: {},
        currentYear: 0,
        view: 'd'
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
    methods: {
      toggle (show) {
        if (show) {
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
        this.currentMonth = date.month
        this.currentYear = date.year
        this.$emit('input', new Date(date.year, date.month, date.date))
        if (this.inline) {
          this.toggle(false)
        }
      },
      onViewChange (view) {
        this.view = view
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
  .date-pick-panel {
    background: #fff;
    z-index: 2;

    &.date-pick-panel-inline {
      display: none;
      position: absolute;

      &.show {
        display: block;
      }
    }

    .btn {
      border-radius: 0;
      border: none;
      user-select: none;
    }
  }
</style>
