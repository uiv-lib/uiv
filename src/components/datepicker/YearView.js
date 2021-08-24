import Btn from './../button/Btn'

export default {
  components: { Btn },
  props: {
    year: Number,
    iconControlLeft: String,
    iconControlRight: String,
  },
  computed: {
    rows() {
      const rows = []
      const yearGroupStart = this.year - (this.year % 20)
      for (let i = 0; i < 4; i++) {
        rows.push([])
        for (let j = 0; j < 5; j++) {
          rows[i].push(yearGroupStart + i * 5 + j)
        }
      }
      return rows
    },
    yearStr() {
      const start = this.year - (this.year % 20)
      return `${start} ~ ${start + 19}`
    },
  },
  methods: {
    getBtnClass(year) {
      if (year === this.year) {
        return 'primary'
      } else {
        return 'default'
      }
    },
    goPrevYear() {
      this.$emit('year-change', this.year - 20)
    },
    goNextYear() {
      this.$emit('year-change', this.year + 20)
    },
    changeView(year) {
      this.$emit('year-change', year)
      this.$emit('view-change', 'm')
    },
  },
}
