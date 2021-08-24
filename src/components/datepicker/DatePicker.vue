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
          type="info"
          size="sm"
          @click="selectToday"
          v-text="t('uiv.datePicker.today')"
        />
        <btn
          v-if="clearBtn"
          data-action="select"
          size="sm"
          @click="clearSelect"
          v-text="t('uiv.datePicker.clear')"
        />
      </div>
    </div>
  </div>
</template>

<script src="./DatePicker.js" />
