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
          >{{ t('uiv.datePicker.today') }}</btn
        >
        <btn
          v-if="clearBtn"
          data-action="select"
          data-type="clear"
          size="sm"
          @click="clearSelect"
          >{{ t('uiv.datePicker.clear') }}</btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { t } from '../../locale';
import DateView from './DateView.vue';
import MonthView from './MonthView.vue';
import YearView from './YearView.vue';
import Btn from './../button/Btn.vue';
import { stringify, convertDateToUTC } from '../../utils/date.utils';
import { isNumber } from '../../utils/object.utils';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: null, required: true },
  width: { type: Number, default: 270 },
  todayBtn: { type: Boolean, default: true },
  clearBtn: { type: Boolean, default: true },
  closeOnSelected: { type: Boolean, default: true },
  limitFrom: { type: null, default: undefined },
  limitTo: { type: null, default: undefined },
  format: { type: String, default: 'yyyy-MM-dd' },
  initialView: { type: String, default: 'd' },
  dateParser: { type: Function, default: Date.parse },
  dateClass: { type: Function, default: undefined },
  yearMonthFormatter: { type: Function, default: undefined },
  weekStartsWith: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0 && value <= 6;
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
});

const emit = defineEmits(['update:modelValue']);

const show = ref(false);
const now = ref(new Date());
const currentMonth = ref(0);
const currentYear = ref(0);
const view = ref('d');

const valueDateObj = computed(() => {
  const ts = props.dateParser(props.modelValue);
  if (isNaN(ts)) {
    return null;
  } else {
    let date = new Date(ts);
    if (date.getHours() !== 0) {
      date = new Date(ts + date.getTimezoneOffset() * 60 * 1000);
    }
    return date;
  }
});

const pickerStyle = computed(() => {
  return {
    width: props.width + 'px',
  };
});

const pickerClass = computed(() => {
  return {
    'uiv-datepicker': true,
    'uiv-datepicker-date': view.value === 'd',
    'uiv-datepicker-month': view.value === 'm',
    'uiv-datepicker-year': view.value === 'y',
  };
});

const limit = computed(() => {
  const limit = {};
  if (props.limitFrom) {
    let limitFrom = props.dateParser(props.limitFrom);
    if (!isNaN(limitFrom)) {
      limitFrom = convertDateToUTC(new Date(limitFrom));
      limitFrom.setHours(0, 0, 0, 0);
      limit.from = limitFrom;
    }
  }
  if (props.limitTo) {
    let limitTo = props.dateParser(props.limitTo);
    if (!isNaN(limitTo)) {
      limitTo = convertDateToUTC(new Date(limitTo));
      limitTo.setHours(0, 0, 0, 0);
      limit.to = limitTo;
    }
  }
  return limit;
});

watch(
  () => props.modelValue,
  (val, oldVal) => {
    setMonthAndYearByValue(val, oldVal);
  }
);

onMounted(() => {
  if (props.modelValue) {
    setMonthAndYearByValue(props.modelValue);
  } else {
    currentMonth.value = now.value.getMonth();
    currentYear.value = now.value.getFullYear();
    view.value = props.initialView;
  }
});

function setMonthAndYearByValue(val, oldVal) {
  const ts = props.dateParser(val);
  if (!isNaN(ts)) {
    let date = new Date(ts);
    if (date.getHours() !== 0) {
      date = new Date(ts + date.getTimezoneOffset() * 60 * 1000);
    }
    if (
      limit.value &&
      ((limit.value.from && date < limit.value.from) ||
        (limit.value.to && date >= limit.value.to))
    ) {
      emit('update:modelValue', oldVal || '');
    } else {
      currentMonth.value = date.getMonth();
      currentYear.value = date.getFullYear();
    }
  }
}

function onMonthChange(month) {
  currentMonth.value = month;
}

function onYearChange(year) {
  currentYear.value = year;
  currentMonth.value = undefined;
}

function onDateChange(date) {
  if (
    date &&
    isNumber(date.date) &&
    isNumber(date.month) &&
    isNumber(date.year)
  ) {
    const _date = new Date(date.year, date.month, date.date);
    emit(
      'update:modelValue',
      props.format ? stringify(_date, props.format) : _date
    );
    // if the input event trigger nothing (same value)
    // manually correct
    currentMonth.value = date.month;
    currentYear.value = date.year;
  } else {
    emit('update:modelValue', '');
  }
}

function onViewChange(v) {
  view.value = v;
}

function selectToday() {
  view.value = 'd';
  onDateChange({
    date: now.value.getDate(),
    month: now.value.getMonth(),
    year: now.value.getFullYear(),
  });
}

function clearSelect() {
  currentMonth.value = now.value.getMonth();
  currentYear.value = now.value.getFullYear();
  view.value = props.initialView;
  onDateChange();
}

function onPickerClick(event) {
  if (
    event.target.getAttribute('data-action') !== 'select' ||
    !props.closeOnSelected
  ) {
    event.stopPropagation();
  }
}
</script>
