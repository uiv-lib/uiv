<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="TimePicker" source-folder="timepicker"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div>
          <time-picker v-model="myTime"
                       :show-meridian="showMeridian"
                       :readonly-input="isReadOnly"
                       :min-step="minStep"
                       :hour-step="hourStep"></time-picker>
          <br/>
          <div class="alert alert-info">Time is:{{timeString}}</div>
        </div>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-xs-12">
                <div class="form-inline">
                  <div class="form-group">
                    <button class="btn btn-default" @click="resetTime">Set to 9:00 AM</button>
                    <button class="btn btn-default" @click="showMeridian=!showMeridian">12H / 24H</button>
                    <button class="btn btn-default" @click="isReadOnly=!isReadOnly">is read only or not</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>set hour step:</label>
                <input class="form-control" v-model.number="hourStep" type="number">
              </div>
              <div class="col-md-6">
                <label>set minutes step:</label>
                <input class="form-control" v-model.number="minStep" type="number">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Notes</h4>
        <ul>
          <li><p>Use <code>v-model: Date</code> to identify the time</p></li>
          <li><p>Make sure to update the date object reference when try to change it from outside the component. E.g. <code>model = new Date(model)</code></p></li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li><p><code>show-meridian: Boolean</code> Whether to display 12H or 24H mode.Default:true</p></li>
        </ul>
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
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import TimePicker from '../components/timepicker/TimePicker.vue'
  export default {
    components: {AnchorHeader, TimePicker, DemoCodeBlock},
    data () {
      return {
        myTime: new Date(),
        showMeridian: true,
        isReadOnly: false,
        hourStep: 1,
        minStep: 1,
        min: new Date(),
        max: new Date()
      }
    },
    computed: {
      timeString () {
        return (this.myTime.getHours() > 9 ? this.myTime.getHours() : ('0' + this.myTime.getHours())) + ':' + (this.myTime.getMinutes() > 9 ? this.myTime.getMinutes() : ('0' + this.myTime.getMinutes()))
      }
    },
    mounted () {
      this.myTime = new Date()
      this.min.setHours(8)
      this.min.setMinutes(0)
      this.min = new Date(this.min)
      this.max.setHours(18)
      this.max.setMinutes(0)
      this.max = new Date(this.min)
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
