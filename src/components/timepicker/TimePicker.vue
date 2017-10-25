<template>
  <section @click.stop>
    <table>
      <tbody>
      <tr class="text-center">
        <td>
          <button class="btn btn-link btn-sm" type="button" @click="changeTime(1,1)" :disabled="readonly">
            <i class="glyphicon glyphicon-chevron-up"></i>
          </button>
        </td>
        <td>&nbsp;</td>
        <td>
          <button class="btn btn-link btn-sm" type="button" @click="changeTime(0,1)" :disabled="readonly">
            <i class="glyphicon glyphicon-chevron-up"></i>
          </button>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      <tr>
        <td class="form-group">
          <input class="form-control text-center"
                 style="width: 50px"
                 @wheel="hoursWheel"
                 placeholder="HH"
                 v-model="hoursText"
                 :readonly="readonly"
                 size="2">
        </td>
        <td>&nbsp;<b>:</b>&nbsp;</td>
        <td class="form-group">
          <input class="form-control text-center"
                 style="width: 50px"
                 @wheel="minutesWheel"
                 placeholder="MM"
                 v-model="minutesText"
                 :readonly="readonly"
                 size="2">
        </td>
        <td v-if="showMeridian">
          &nbsp;
          <button type="button" class="btn btn-default" data-action="toggleMeridian" :disabled="readonly"
                  v-text="meridian?t('uiv.timePicker.am'):t('uiv.timePicker.pm')"
                  @click="toggleMeridian"></button>
        </td>
      </tr>
      <tr class="text-center">
        <td>
          <button class="btn btn-link btn-sm" type="button" @click="changeTime(1,0)" :disabled="readonly">
            <i class="glyphicon glyphicon-chevron-down"></i>
          </button>
        </td>
        <td>&nbsp;</td>
        <td>
          <button class="btn btn-link btn-sm" type="button" @click="changeTime(0,0)" :disabled="readonly">
            <i class="glyphicon glyphicon-chevron-down"></i>
          </button>
        </td>
        <td v-if="showMeridian">
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import Local from './../../mixins/locale'
  import utils from './../../utils/stringUtils'

  const maxHours = 23
  const zero = 0
  const maxMinutes = 59
  const cutUpAmAndPm = 12

  export default {
    mixins: [Local],
    props: {
      value: {
        type: Date,
        required: true
      },
      showMeridian: {
        type: Boolean,
        'default': true
      },
      min: {
        type: Date
      },
      max: {
        type: Date
      },
      hourStep: {
        type: Number,
        'default': 1
      },
      minStep: {
        type: Number,
        'default': 1
      },
      readonly: {
        type: Boolean,
        'default': false
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
    mounted () {
      this.updateByValue(this.value)
    },
    watch: {
      value (value) {
        this.updateByValue(value)
      },
      showMeridian (value) {
        this.setTime()
      },
      hoursText (value) {
        let hour = parseInt(value)
        if (this.showMeridian) {
          if (hour >= 1 && hour <= cutUpAmAndPm) {
            if (this.meridian) {
              this.hours = hour === cutUpAmAndPm ? 0 : hour
            } else {
              this.hours = hour === cutUpAmAndPm ? cutUpAmAndPm : hour + cutUpAmAndPm
            }
          }
        } else if (hour >= zero && hour <= maxHours) {
          this.hours = hour
        }
        this.setTime()
      },
      minutesText (value) {
        let minutesStr = parseInt(value)
        if (minutesStr >= zero && minutesStr <= maxMinutes) {
          this.minutes = minutesStr
        }
        this.setTime()
      }
    },
    methods: {
      updateByValue (value) {
        this.hours = value.getHours()
        if (!this.showMeridian) {
          this.hoursText = utils.pad(this.hours, 2)
        } else {
          if (this.hours >= cutUpAmAndPm) {
            if (this.hours === cutUpAmAndPm) {
              this.hoursText = this.hours + ''
            } else {
              this.hoursText = utils.pad(this.hours - cutUpAmAndPm, 2)
            }
            this.meridian = false
          } else {
            if (this.hours === zero) {
              this.hoursText = cutUpAmAndPm.toString()
            } else {
              this.hoursText = utils.pad(this.hours, 2)
            }
            this.meridian = true
          }
        }
        this.minutes = value.getMinutes()
        this.minutesText = utils.pad(this.minutes, 2)
      },
      addHour (step) {
        step = step || this.hourStep
        this.hours = this.hours >= maxHours ? zero : this.hours + step
      },
      reduceHour (step) {
        step = step || this.hourStep
        this.hours = this.hours <= zero ? maxHours : this.hours - step
      },
      addMinute () {
        if (this.minutes >= maxMinutes) {
          this.minutes = zero
          this.addHour(1)
        } else {
          this.minutes += this.minStep
        }
      },
      reduceMinute () {
        if (this.minutes <= zero) {
          this.minutes = maxMinutes
          this.reduceHour(1)
        } else {
          this.minutes -= this.minStep
        }
      },
      changeTime (isHour, isPlus) {
        if (isHour && isPlus) {
          this.addHour()
        } else if (isHour && !isPlus) {
          this.reduceHour()
        } else if (!isHour && isPlus) {
          this.addMinute()
        } else {
          this.reduceMinute()
        }
        this.setTime()
      },
      toggleMeridian () {
        this.meridian = !this.meridian
        if (this.meridian) {
          this.hours -= cutUpAmAndPm
        } else {
          this.hours += cutUpAmAndPm
        }
        this.setTime()
      },
      minutesWheel (e) {
        if (!this.readonly) {
          e.preventDefault()
          this.changeTime(false, e.deltaY < 0)
        }
      },
      hoursWheel (e) {
        if (!this.readonly) {
          e.preventDefault()
          this.changeTime(true, e.deltaY < 0)
        }
      },
      setTime () {
        let time = this.value
        time.setHours(this.hours)
        time.setMinutes(this.minutes)
        if (this.max) {
          let max = new Date(time)
          max.setHours(this.max.getHours())
          max.setMinutes(this.max.getMinutes())
          time = time > max ? max : time
        }
        if (this.min) {
          let min = new Date(time)
          min.setHours(this.min.getHours())
          min.setMinutes(this.min.getMinutes())
          time = time < min ? min : time
        }
        this.$emit('input', new Date(time))
      }
    }
  }
</script>
