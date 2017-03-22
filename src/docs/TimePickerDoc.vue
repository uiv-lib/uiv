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
          <time-picker></time-picker>
          <div class="alert alert-info">Time is:</div>
        </div>
        <div class="form-inline">
          <div class="form-group">

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
    components: {AnchorHeader, TimePicker, DemoCodeBlock}
  }

</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
