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
        <td colspan="4">
          <btn
            class="uiv-datepicker-title"
            block
            size="sm"
            style="border: none"
            @click="changeView()"
          >
            <b>{{ year }}</b>
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
        <td
          v-for="(m, j) in row"
          :key="`${i}_${j}`"
          colspan="2"
          width="33.333333%"
        >
          <btn
            block
            size="sm"
            style="border: none"
            :type="getBtnClass(i * 3 + j)"
            @click="changeView(i * 3 + j)"
          >
            <span>{{ tCell(m) }}</span>
          </btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Btn from './../button/Btn.vue';
import { isExist } from '../../utils/object.utils';
import { t } from '../../locale';
import { onMounted, reactive } from 'vue';

const props = defineProps({
  month: { type: Number, default: undefined },
  year: { type: Number, default: undefined },
  iconControlLeft: { type: String, default: undefined },
  iconControlRight: { type: String, default: undefined },
});

const emit = defineEmits(['year-change', 'month-change', 'view-change']);

const rows = reactive([]);

onMounted(() => {
  for (let i = 0; i < 4; i++) {
    rows.push([]);
    for (let j = 0; j < 3; j++) {
      rows[i].push(i * 3 + j + 1);
    }
  }
});

function tCell(cell) {
  return t(`uiv.datePicker.month${cell}`);
}

function getBtnClass(month) {
  if (month === props.month) {
    return 'primary';
  } else {
    return 'default';
  }
}

function goPrevYear() {
  emit('year-change', props.year - 1);
}

function goNextYear() {
  emit('year-change', props.year + 1);
}

function changeView(monthIndex) {
  if (isExist(monthIndex)) {
    emit('month-change', monthIndex);
    emit('view-change', 'd');
  } else {
    emit('view-change', 'y');
  }
}
</script>
