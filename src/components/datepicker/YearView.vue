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

<script>
import Btn from './../button/Btn.vue';

export default {
  components: { Btn },
  props: {
    year: { type: Number, default: undefined },
    iconControlLeft: { type: String, default: undefined },
    iconControlRight: { type: String, default: undefined },
  },
  emits: ['year-change', 'view-change'],
  computed: {
    rows() {
      const rows = [];
      const yearGroupStart = this.year - (this.year % 20);
      for (let i = 0; i < 4; i++) {
        rows.push([]);
        for (let j = 0; j < 5; j++) {
          rows[i].push(yearGroupStart + i * 5 + j);
        }
      }
      return rows;
    },
    yearStr() {
      const start = this.year - (this.year % 20);
      return `${start} ~ ${start + 19}`;
    },
  },
  methods: {
    getBtnClass(year) {
      if (year === this.year) {
        return 'primary';
      } else {
        return 'default';
      }
    },
    goPrevYear() {
      this.$emit('year-change', this.year - 20);
    },
    goNextYear() {
      this.$emit('year-change', this.year + 20);
    },
    changeView(year) {
      this.$emit('year-change', year);
      this.$emit('view-change', 'm');
    },
  },
};
</script>
