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
          <time-picker v-model="myTime" :show-meridian="showMeridian"></time-picker>
          <div class="alert alert-info">Time is:{{timeString}}</div>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <button class="btn btn-default" @click="resetTime">设置14:00</button>
            <button class="btn btn-default" @click="showMeridian=!showMeridian">12H/24H</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Props</h4>
        <ul>
          <li>
          </li>
        </ul>
        <h4>Events</h4>
        <ul>
          <li>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="TimePickerDoc.vue">
        <pre><code>

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
        showMeridian: true
      }
    },
    computed: {
      timeString () {
        return (this.myTime.getHours() > 9 ? this.myTime.getHours() : ('0' + this.myTime.getHours())) + ':' + (this.myTime.getMinutes() > 9 ? this.myTime.getMinutes() : ('0' + this.myTime.getMinutes()))
      }
    },
    methods: {
      resetTime () {
        console.log(this.myTime)
        this.myTime.setHours(14)
        this.myTime.setMinutes(0)
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
