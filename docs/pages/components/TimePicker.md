# Time Picker

> A lightweight & configurable time picker.

## Inline Example

**Note**: Make sure to update the `v-model` reference when try to change it from outside the component. E.g. `model = new Date(model)`. See the example of 'Set to 9:00 AM' below.

```html
<template>
  <time-picker v-model="myTime"
               :show-meridian="showMeridian"
               :readonly="isReadOnly"
               :min-step="minStep"
               :hour-step="hourStep"
               :min="minTime"
               :max="maxTime"
               ref="timepicker"></time-picker>
  <alert type="info">Selected time in 24H is <b>{{timeString}}</b></alert>
  <hr/>
  <h4>Settings</h4>
  <form class="form-horizontal">
    <div class="form-group">
      <div class="col-xs-12">
        <button class="btn btn-default" type="button" @click="resetTime" data-action="setNine">Set to 9:00 AM</button>
        <button class="btn btn-default" type="button" @click="showMeridian=!showMeridian">12H / 24H</button>
        <button class="btn btn-default" type="button" @click="isReadOnly=!isReadOnly">Toggle Readonly</button>
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-6">
        <label>Hour Setp</label>
        <input class="form-control" v-model.number="hourStep" type="number" min="1" max="12">
      </div>
      <div class="col-md-6">
        <label>Minute Step</label>
        <input class="form-control" v-model.number="minStep" type="number" min="1" max="60">
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-6">
        <label>Min Time (24H)</label>
        <input class="form-control" v-model="min" type="text" placeholder="HH:MM">
      </div>
      <div class="col-md-6">
        <label>Max Time (24H)</label>
        <input class="form-control" v-model="max" type="text" placeholder="HH:MM">
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        myTime: new Date(),
        showMeridian: true,
        isReadOnly: false,
        hourStep: 1,
        minStep: 1,
        min: ``,
        max: ``
      }
    },
    computed: {
      timeString () {
        return `${this.myTime.getHours()} : ${this.myTime.getMinutes()}`
      },
      maxTime () {
        return this.max ? new Date(`2000/01/01 ${this.max}`) : null
      },
      minTime () {
        return this.min ? new Date(`2000/01/01 ${this.min}`) : null
      }
    },
    mounted () {
      this.myTime = new Date()
    },
    methods: {
      resetTime () {
        this.myTime.setHours(9)
        this.myTime.setMinutes(0)
        this.myTime = new Date(this.myTime)
      }
    }
  }
</script>

<!-- Live demo -->
```

# API Reference

## [TimePicker.vue](https://github.com/wxsms/uiv/tree/master/src/components/timepicker/TimePicker.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Date</td>
      <td></td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>The selected time.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>show-meridian</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Whether to display 12H or 24H mode.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hour-step</code></td>
      <td>Number</td>
      <td>1</td>
      <td></td>
      <td>Number of hours to increase or decrease when using a button.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>min-step</code></td>
      <td>Number</td>
      <td>1</td>
      <td></td>
      <td>Number of minutes to increase or decrease when using a button.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>readonly</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>
        Whether user can change value by typing inside the hours &amp; minutes input or arrow buttons.
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>max</code></td>
      <td>Date</td>
      <td></td>
      <td></td>
      <td>The maximum time that user can select or input.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>min</code></td>
      <td>Date</td>
      <td></td>
      <td></td>
      <td>The minimum time that user can select or input.</td>
    </tr>
    </tbody>
  </table>
</div>



<!-- Live demo script
<script>
  export default {
    data () {
      return {
        myTime: new Date(),
        showMeridian: true,
        isReadOnly: false,
        hourStep: 1,
        minStep: 1,
        min: ``,
        max: ``
      }
    },
    computed: {
      timeString () {
        return `${this.myTime.getHours()} : ${this.myTime.getMinutes()}`
      },
      maxTime () {
        return this.max ? new Date(`2000/01/01 ${this.max}`) : null
      },
      minTime () {
        return this.min ? new Date(`2000/01/01 ${this.min}`) : null
      }
    },
    mounted () {
      this.myTime = new Date()
    },
    methods: {
      resetTime () {
        this.myTime.setHours(9)
        this.myTime.setMinutes(0)
        this.myTime = new Date(this.myTime)
      }
    }
  }
</script>

-->
