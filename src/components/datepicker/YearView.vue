<template>
  <table role="grid" style="width: 100%">
    <thead>
    <tr>
      <td>
        <btn block size="sm" style="border: none" @click="goPrevYear">
          <i :class="iconControlLeft"></i>
        </btn>
      </td>
      <td colspan="3">
        <btn block size="sm" style="border: none">
          <b>{{yearStr}}</b>
        </btn>
      </td>
      <td>
        <btn block size="sm" style="border: none" @click="goNextYear">
          <i :class="iconControlRight"></i>
        </btn>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in rows">
      <td v-for="year in row" width="20%">
        <btn
          block
          size="sm"
          style="border: none"
          :type="getBtnClass(year)"
          @click="changeView(year)">
          <span>{{year}}</span>
        </btn>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Btn from './../button/Btn'

  export default {
    components: {Btn},
    props: {
      year: Number,
      iconControlLeft: String,
      iconControlRight: String
    },
    computed: {
      rows () {
        let rows = []
        let yearGroupStart = this.year - this.year % 20
        for (let i = 0; i < 4; i++) {
          rows.push([])
          for (let j = 0; j < 5; j++) {
            rows[i].push(yearGroupStart + i * 5 + j)
          }
        }
        return rows
      },
      yearStr () {
        let start = this.year - this.year % 20
        return `${start} ~ ${start + 19}`
      }
    },
    methods: {
      getBtnClass (year) {
        if (year === this.year) {
          return 'primary'
        } else {
          return 'default'
        }
      },
      goPrevYear () {
        this.$emit('year-change', this.year - 20)
      },
      goNextYear () {
        this.$emit('year-change', this.year + 20)
      },
      changeView (year) {
        this.$emit('year-change', year)
        this.$emit('view-change', 'm')
      }
    }
  }
</script>
