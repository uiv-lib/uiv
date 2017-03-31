<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="TimePicker" source-folder="timepicker"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div>
          <time-picker v-model="myTime"
                       :show-meridian="showMeridian"
                       :readonly-input="isReadOnly"
                       :min-step="minStep"
                       :hour-step="hourStep"
                       :min="minTime"
                       :max="maxTime"
                       ref="timepicker"></time-picker>
          <br/>
          <div class="alert alert-info">Selected time in 24H is <b>{{timeString}}</b></div>
        </div>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-xs-12">
                <button class="btn btn-default" type="button" @click="resetTime" data-action="setNine">Set to 9:00 AM
                </button>
                <button class="btn btn-default" type="button" @click="showMeridian=!showMeridian">12H / 24H</button>
                <button class="btn btn-default" type="button" @click="isReadOnly=!isReadOnly">Toggle Readonly Input
                </button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>Hour Step</label>
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
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="TimePickerDoc.vue">
        <pre><code>
&lt;time-picker v-model=&quot;myTime&quot; :show-meridian=&quot;showMeridian&quot;&gt;&lt;/time-picker&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">API</h3>
        <h4>Notes</h4>
        <ul>
          <li><p>Use <code>v-model: Date</code> to identify the time</p></li>
          <li><p>Make sure to update the date object reference when try to change it from outside the component. E.g.
            <code>model = new Date(model)</code></p></li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li><p><code>show-meridian: Boolean</code> Whether to display 12H or 24H mode. Default: true.</p></li>
          <li><p><code>hour-step: Number</code> Number of hours to increase or decrease when using a button. Default: 1.
          </p></li>
          <li><p><code>min-tep: Number</code> Number of minutes to increase or decrease when using a button. Default: 1.
          </p></li>
          <li><p><code>readonly-input: Boolean</code> Whether user can type inside the hours & minutes input. Default:
            false.</p></li>
          <li><p><code>max: Date</code> The maximum time that user can select or input.</p></li>
          <li><p><code>min: Date</code> The minimum time that user can select or input.</p></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import TimePicker from '../../components/timepicker/TimePicker.vue'
  import utils from '../../utils/stringUtils'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, TimePicker, DemoCodeBlock},
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
        return `${utils.pad(this.myTime.getHours(), 2)} : ${utils.pad(this.myTime.getMinutes(), 2)}`
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

<style lang="less" rel="stylesheet/less" scoped>

</style>
