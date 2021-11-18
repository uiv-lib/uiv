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

<script>
import Locale from '../../mixins/locale.mixin';
import Btn from './../button/Btn.vue';
import { isExist } from '../../utils/object.utils';

export default {
  components: { Btn },
  mixins: [Locale],
  props: {
    month: { type: Number, default: undefined },
    year: { type: Number, default: undefined },
    iconControlLeft: { type: String, default: undefined },
    iconControlRight: { type: String, default: undefined },
  },
  emits: ['year-change', 'month-change', 'view-change'],
  data() {
    return {
      rows: [],
    };
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      this.rows.push([]);
      for (let j = 0; j < 3; j++) {
        this.rows[i].push(i * 3 + j + 1);
      }
    }
  },
  methods: {
    tCell(cell) {
      return this.t(`uiv.datePicker.month${cell}`);
    },
    getBtnClass(month) {
      if (month === this.month) {
        return 'primary';
      } else {
        return 'default';
      }
    },
    goPrevYear() {
      this.$emit('year-change', this.year - 1);
    },
    goNextYear() {
      this.$emit('year-change', this.year + 1);
    },
    changeView(monthIndex) {
      if (isExist(monthIndex)) {
        this.$emit('month-change', monthIndex);
        this.$emit('view-change', 'd');
      } else {
        this.$emit('view-change', 'y');
      }
    },
  },
};
</script>
