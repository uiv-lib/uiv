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
                <button class="btn btn-default" type="button" @click="resetTime" data-action="setNine">
                  <span>Set to 9:00 AM</span>
                </button>
                <button class="btn btn-default" type="button" @click="showMeridian=!showMeridian">12H / 24H</button>
                <button class="btn btn-default" type="button" @click="isReadOnly=!isReadOnly">
                  <span>Toggle Readonly Input</span>
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
        <demo-code-panel demo-file="TimePickerDoc.vue">
        <pre><code>
&lt;time-picker v-model=&quot;myTime&quot; :show-meridian=&quot;showMeridian&quot;&gt;&lt;/time-picker&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="timepicker" file="TimePicker.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import TimePicker from '../../components/timepicker/TimePicker.vue'
  import utils from '../../utils/stringUtils'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, TimePicker, DemoCodePanel, ApiPanel},
    data () {
      return {
        api: {
          notes: [
            `Make sure to update the date object reference when try to change it from outside the component. E.g. <code>model = new Date(model)</code>`
          ],
          props: [
            {
              name: 'v-model',
              required: true,
              desc: 'The selected time.',
              type: 'Date',
              'default': ''
            },
            {
              name: 'show-meridian',
              desc: 'Whether to display 12H or 24H mode.',
              type: 'Boolean',
              'default': 'true'
            },
            {
              name: 'hour-step',
              desc: 'Number of hours to increase or decrease when using a button.',
              type: 'Number',
              'default': '1'
            },
            {
              name: 'min-step',
              desc: 'Number of minutes to increase or decrease when using a button.',
              type: 'Number',
              'default': '1'
            },
            {
              name: 'readonly-input',
              desc: 'Whether user can type inside the hours & minutes input.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'max',
              desc: 'The maximum time that user can select or input.',
              type: 'Date'
            },
            {
              name: 'min',
              desc: 'The minimum time that user can select or input.',
              type: 'Date'
            }
          ]
        },
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
