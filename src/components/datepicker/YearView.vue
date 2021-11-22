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
            @click="goPrevYear"
          >
            <i :class="iconControlLeft"></i>
          </btn>
        </td>
        <td colspan="3">
          <btn
            class="uiv-datepicker-title"
            block
            size="sm"
            style="border: none"
          >
            <b>{{ yearStr }}</b>
          </btn>
        </td>
        <td>
          <btn
            class="uiv-datepicker-pager-next"
            block
            size="sm"
            style="border: none"
            @click="goNextYear"
          >
            <i :class="iconControlRight"></i>
          </btn>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(y, j) in row" :key="`${i}_${j}`" width="20%">
          <btn
            block
            size="sm"
            style="border: none"
            :type="getBtnClass(y)"
            @click="changeView(y)"
          >
            <span>{{ y }}</span>
          </btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Btn from './../button/Btn.vue';
import { computed } from 'vue';

const props = defineProps({
  year: { type: Number, default: undefined },
  iconControlLeft: { type: String, default: undefined },
  iconControlRight: { type: String, default: undefined },
});

const emit = defineEmits(['year-change', 'view-change']);

function getBtnClass(year) {
  if (year === props.year) {
    return 'primary';
  } else {
    return 'default';
  }
}

function goPrevYear() {
  emit('year-change', props.year - 20);
}

function goNextYear() {
  emit('year-change', props.year + 20);
}

function changeView(year) {
  emit('year-change', year);
  emit('view-change', 'm');
}

const rows = computed(() => {
  const rows = [];
  const yearGroupStart = props.year - (props.year % 20);
  for (let i = 0; i < 4; i++) {
    rows.push([]);
    for (let j = 0; j < 5; j++) {
      rows[i].push(yearGroupStart + i * 5 + j);
    }
  }
  return rows;
});

const yearStr = computed(() => {
  const start = props.year - (props.year % 20);
  return `${start} ~ ${start + 19}`;
});
</script>
