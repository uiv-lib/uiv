import Locale from '../../mixins/locale.mixin'
import Btn from './../button/Btn'
import { isExist } from '../../utils/object.utils'

export default {
  components: { Btn },
  mixins: [Locale],
  props: {
    month: Number,
    year: Number,
    iconControlLeft: String,
    iconControlRight: String,
  },
  data() {
    return {
      rows: [],
    }
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      this.rows.push([])
      for (let j = 0; j < 3; j++) {
        this.rows[i].push(i * 3 + j + 1)
      }
    }
  },
  methods: {
    tCell(cell) {
      return this.t(`uiv.datePicker.month${cell}`)
    },
    getBtnClass(month) {
      if (month === this.month) {
        return 'primary'
      } else {
        return 'default'
      }
    },
    goPrevYear() {
      this.$emit('year-change', this.year - 1)
    },
    goNextYear() {
      this.$emit('year-change', this.year + 1)
    },
    changeView(monthIndex) {
      if (isExist(monthIndex)) {
        this.$emit('month-change', monthIndex)
        this.$emit('view-change', 'd')
      } else {
        this.$emit('view-change', 'y')
      }
    },
  },
}
