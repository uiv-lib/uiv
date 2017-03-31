<template>
  <table role="grid" style="width: 100%">
    <thead>
    <tr>
      <td>
        <button type="button" class="btn btn-default btn-sm btn-block btn-date" @click="goPrevYear">
          <i class="glyphicon glyphicon-chevron-left"></i>
        </button>
      </td>
      <td colspan="4">
        <button type="button" class="btn btn-default btn-sm btn-block btn-date" @click="changeView()">
          <b>{{year}}</b>
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-default btn-sm btn-block btn-date" @click="goNextYear">
          <i class="glyphicon glyphicon-chevron-right"></i>
        </button>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row,i) in rows">
      <td colspan="2" v-for="(month,j) in row" width="33.333333%">
        <button type="button" class="btn btn-sm btn-block btn-date"
                :class="getBtnClass(i*3+j)"
                @click="changeView(i*3+j)">
          <span>{{month}}</span>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import util from '../../utils/dateUtils'
  export default {
    props: ['month', 'year'],
    data () {
      return {
        rows: []
      }
    },
    mounted () {
      for (let i = 0; i < 4; i++) {
        this.rows.push([])
        for (let j = 0; j < 3; j++) {
          this.rows[i].push(util.getMonthNames()[i * 3 + j])
        }
      }
    },
    methods: {
      getBtnClass (month) {
        if (month === this.month) {
          return {'btn-primary': true}
        } else {
          return {'btn-default': true}
        }
      },
      goPrevYear () {
        this.$emit('year-change', this.year - 1)
      },
      goNextYear () {
        this.$emit('year-change', this.year + 1)
      },
      changeView (monthIndex) {
        if (typeof monthIndex === 'undefined') {
          this.$emit('view-change', 'y')
        } else {
          this.$emit('month-change', monthIndex)
          this.$emit('view-change', 'd')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
