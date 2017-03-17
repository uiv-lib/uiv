<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Alert"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div id="alertContainer">
          <alert class="alert"
                 role="alert"
                 v-for="item in alertList"
                 :can-close="item.canClose"
                 :alert-type="item.type"
                 :display-time="item.displayTime">
            <div slot="contain"><strong>Well done!</strong> You successfully read this important alert message.</div>
          </alert>
          <alert class="alert alert-info" role="alert" :can-close=true>
            <div slot="contain"><strong>Heads up!</strong> This alert needs your attention, but it's not super important.</div>
          </alert>
          <alert class="alert alert-warning" role="alert" :can-close=true>
            <div slot="contain"><strong>Warning!</strong> Better check yourself, you're not looking too good.</div>
          </alert>
          <alert class="alert alert-danger" role="alert" :can-close=true>
            <div slot="contain"><strong>Oh snap!</strong> Change a few things up and try submitting again.</div>
          </alert>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <label>display time</label>
            <input class="form-control" step="1000" min="0"  v-model="displayTime" type="number" placeholder="input display time">
            <button class="btn btn-default" @click="addAlert('alert-success',false)">add a Alert(time)</button>
            <button class="btn btn-default" @click="addAlert('alert-success',true)">add a Alert</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Prop</h4>
        <ul>
          <li><p><code>canClose:Boolean</code></p></li>
          <li><p><code>alertType:String</code></p></li>
          <li><p><code>displayTime:Number</code></p></li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>contain</code></p></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="AlertDoc.vue">
        <pre><code>
&lt;alert class="alert" role="alert"&gt;
  &lt;div slot="contain" &gt;...&lt;/idv&gt;
&lt;/alert&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import Alert from './../components/Alert.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'

  export default {
    components: {AnchorHeader, Alert, DemoCodeBlock},
    data () {
      return {
        alertList: [
          {type: 'alert-success', canClose: false}
        ],
        displayTime: 5000
      }
    },
    methods: {
      addAlert (type, canClose) {
        this.alertList.push({type: type, canClose: canClose, displayTime: this.displayTime})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
