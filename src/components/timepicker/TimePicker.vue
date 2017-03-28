<template>
  <section :class="{'invalid':hoursInvalid||minutesInvalid}">
    <table>
      <tbody>
      <tr class="text-center">
        <td>
          <a role="button" @click="changeTime(1,1)" id="hoursPlus">
            <i class="glyphicon glyphicon-chevron-up"></i>
          </a>
        </td>
        <td>&nbsp;</td>
        <td>
          <a role="button" @click="changeTime(0,1)" id="minutesPlus">
            <i class="glyphicon glyphicon-chevron-up"></i>
          </a>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      <tr>
        <td class="form-group">
          <input class="form-control text-center"
                 :class="{'invalid':hoursInvalid}"
                 @wheel.prevent="hoursWheel"
                 placeholder="HH"
                 v-model.lazy="hoursText"
                 size="2">
        </td>
        <td>:</td>
        <td class="form-group">
          <input class="form-control text-center"
                 :class="{'invalid':minutesInvalid}"
                 @wheel.prevent="minutesWheel"
                 placeholder="MM"
                 v-model.lazy="minutesText"
                 size="2">
        </td>
        <td v-if="showMeridian">
          <button class="btn btn-default" id="toggleMeridian" v-text="meridian?'AM':'PM'" @click="toggleMeridian"></button>
        </td>
      </tr>
      <tr class="text-center">
        <td>
          <a role="button" @click="changeTime(1,0)" id="hoursMinus">
            <i class="glyphicon glyphicon-chevron-down"></i>
          </a>
        </td>
        <td>&nbsp;</td>
        <td>
          <a role="button" @click="changeTime(0,0)" id="minutesMinus">
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
  const maxDigits = 9
  const maxHours = 23
  const zero = 0
  const maxMinutes = 59
  const cutPuAmAndPm = 12
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
        minutesText: '',
        hoursInvalid: false,
        minutesInvalid: false
      }
    },
    watch: {
      value (value) {
        try {
          this.hours = value.getHours()
          if (!this.showMeridian) {
            this.hoursText = (this.hours > maxDigits ? '' : '0') + this.hours
          } else {
            if (value.getHours() >= cutPuAmAndPm) {
              if (value.getHours() === cutPuAmAndPm) {
                this.hoursText = this.hours + ''
              } else {
                this.hoursText = (this.hours - cutPuAmAndPm > maxDigits ? '' : '0') + (this.hours - cutPuAmAndPm)
              }
              this.meridian = false
            } else {
              if (this.hours === zero) {
                this.hoursText = cutPuAmAndPm.toString()
              } else {
                this.hoursText = (this.hours > maxDigits ? '' : '0') + this.hours
              }
              this.meridian = true
            }
          }
          this.minutes = value.getMinutes()
          this.minutesText = (this.minutes > maxDigits ? '' : '0') + this.minutes
        } catch (e) {
          //
        }
      },
      showMeridian (value) {
        this.setTime()
      },
      hoursText (value) {
        let hoursStr = parseInt(value)
        if (this.showMeridian) {
          if (hoursStr >= 1 && hoursStr <= cutPuAmAndPm) {
            this.hoursInvalid = false
            this.hours = hoursStr + cutPuAmAndPm
            this.setTime()
          } else {
            this.hoursInvalid = true
          }
        } else {
          if (hoursStr >= zero && hoursStr <= maxHours) {
            this.hoursInvalid = false
            this.hours = hoursStr
            this.setTime()
          } else {
            this.hoursInvalid = true
          }
        }
      },
      minutesText (value) {
        let minutesStr = parseInt(value)
        if (minutesStr >= zero && minutesStr <= maxMinutes) {
          this.minutesInvalid = false
          this.minutes = minutesStr
          this.setTime()
        } else {
          this.minutesInvalid = true
        }
      }
    },
    methods: {
      changeTime (isHour, isPlus) {
        if (isHour && isPlus) {
          (this.hours >= maxHours) ? this.hours = zero : this.hours += 1
        } else if (isHour && !isPlus) {
          (this.hours <= zero) ? this.hours = maxHours : this.hours -= 1
        } else if (!isHour && isPlus) {
          if (this.minutes >= maxMinutes) {
            this.minutes = zero
            this.changeTime(true, true)
          } else {
            this.minutes += 1
          }
        } else if (!isHour && !isPlus) {
          if (this.minutes <= zero) {
            this.minutes = maxMinutes
            this.changeTime(true, false)
          } else {
            this.minutes -= 1
          }
        }
        this.setTime()
      },
      toggleMeridian () {
        this.meridian = !this.meridian
        if (this.meridian) {
          this.hours -= cutPuAmAndPm
        } else {
          this.hours += cutPuAmAndPm
        }
        this.setTime()
      },
      minutesWheel (e) {
        if (e.deltaY > 0) {
          this.changeTime(false, false)
        } else {
          this.changeTime(false, true)
        }
      },
      hoursWheel (e) {
        if (e.deltaY > 0) {
          this.changeTime(true, false)
        } else {
          this.changeTime(true, true)
        }
      },
      setTime () {
        let time = new Date()
        time.setHours(this.hours)
        time.setMinutes(this.minutes)
        this.$emit('input', time)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .invalid {
    border: 1px solid red !important;
  }
</style>
