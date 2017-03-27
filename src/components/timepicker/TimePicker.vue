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
          <button class="btn btn-default" v-text="meridian?'AM':'PM'" @click="toggleMeridian"></button>
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
      value: {
        type: Date
      },
      showMeridian: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        hours: 0,
        minutes: 0,
        meridian: true,
        hoursText: '',
        minutesText: ''
      }
    },
    watch: {
      value (value) {
        try {
          this.hours = value.getHours()
          if (!this.showMeridian) {
            this.hoursText = (this.hours > 9 ? '' : '0') + this.hours
          } else {
            if (value.getHours() > 12) {
              this.hoursText = (this.hours - 12 > 9 ? '' : '0') + (this.hours - 12)
              this.meridian = false
            } else {
              this.hoursText = (this.hours > 9 ? '' : '0') + this.hours
              this.meridian = true
            }
          }
          this.minutes = value.getMinutes()
          this.minutesText = (this.minutes > 9 ? '' : '0') + this.minutes
        } catch (e) {
          //
        }
      },
      showMeridian (value) {
        this.setTime()
      }
    },
    methods: {
      changeTime (isHour, isPlus) {
        if (isHour && isPlus) {
          (this.hours >= 24) ? this.hours = 1 : this.hours += 1
        } else if (isHour && !isPlus) {
          (this.hours <= 1) ? this.hours = 23 : this.hours -= 1
        } else if (!isHour && isPlus) {
          (this.minutes >= 59) ? this.minutes = 0 : this.minutes += 1
        } else if (!isHour && !isPlus) {
          (this.minutes <= 0) ? this.minutes = 59 : this.minutes -= 1
        }
        this.setTime()
      },
      toggleMeridian () {
        this.meridian = !this.meridian
        if (this.meridian) {
          if (this.hours > 12) {
            this.hours -= 12
            this.hoursText = this.hours + ''
          }
        } else {
          this.hours += 12
          this.hoursText = this.hours + ''
        }
        this.setTime()
      },
      setTime () {
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
