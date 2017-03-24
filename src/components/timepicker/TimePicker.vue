<template>
  <section>
    <table>
      <tbody>
      <tr class="text-center">
        <td>
          <a role="button" @click="changeTime(1,1)">
            <i class="glyphicon glyphicon-chevron-up"></i>
          </a>
        </td>
        <td>&nbsp;</td>
        <td>
          <a role="button" @click="changeTime(0,1)">
            <i class="glyphicon glyphicon-chevron-up"></i>
          </a>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      <tr>
        <td class="form-group">
          <input class="form-control text-center" v-model="hoursText" size="2">
        </td>
        <td>:</td>
        <td class="form-group">
          <input class="form-control text-center" v-model="minutesText" size="2">
        </td>
        <td v-if="showMeridian">
          <button class="btn btn-default" v-text="meridian?'AM':'PM'" @click="meridian=!meridian"></button>
        </td>
      </tr>
      <tr class="text-center">
        <td>
          <a role="button" @click="changeTime(1,0)">
            <i class="glyphicon glyphicon-chevron-down"></i>
          </a>
        </td>
        <td>&nbsp;</td>
        <td>
          <a role="button" @click="changeTime(0,0)">
            <i class="glyphicon glyphicon-chevron-down"></i>
          </a>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    props: {
      value: {},
      showMeridian: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        hours: 0,
        minutes: 0,
        meridian: true
      }
    },
    watch: {
      value (value) {
        this.hours = value.getHours()
        this.minutes = value.getMinutes()
      }
    },
    computed: {
      hoursText () {
        return (this.hours > 9 ? '' : '0') + this.hours
      },
      minutesText () {
        return (this.minutes > 9 ? '' : '0') + this.minutes
      }
    },
    methods: {
      changeTime (isHour, isPlus) {
        if (isHour && isPlus) {
          if (this.showMeridian) {
            (this.hours >= 11) ? this.hours = 0 : this.hours += 1
          } else {
            (this.hours >= 23) ? this.hours = 0 : this.hours += 1
          }
        } else if (isHour && !isPlus) {
          if (this.showMeridian) {
            (this.hours <= 0) ? this.hours = 11 : this.hours -= 1
          } else {
            (this.hours <= 0) ? this.hours = 23 : this.hours -= 1
          }
        } else if (!isHour && isPlus) {
          (this.minutes >= 59) ? this.minutes = 0 : this.minutes += 1
        } else if (!isHour && !isPlus) {
          (this.minutes <= 0) ? this.minutes = 59 : this.minutes -= 1
        }
        var time = new Date()
        time.setHours(this.hours)
        time.setMinutes(this.minutes)
        this.$emit('input', time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
</style>
