<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Alert" source-folder="alert"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div id="alertContainer">
          <alert v-for="(item,index) in alertList"
                 :closable="item.closable"
                 :type="item.type"
                 :duration="item.duration"
                 :key="item.key"
                 @closed="alertList.splice(index, 1)">
            <strong>Well done!</strong> You successfully read this important alert message.
          </alert>
          <alert type="info" :closable="true" v-if="showAlert1" @closed="showAlert1=false">
            <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
          </alert>
          <alert type="warning" :closable="true" v-if="showAlert2" @closed="showAlert2=false">
            <strong>Warning!</strong> Better check yourself, you're not looking too good.
          </alert>
          <alert type="danger" :closable="true" v-if="showAlert3" @closed="showAlert3=false">
            <strong>Oh snap!</strong> Change a few things up and try submitting again.
          </alert>
        </div>
        <div class="well">
          <form class="form-inline">
            <div class="form-group">
              <label>display time</label>
              <input class="form-control" step="1000" min="0" v-model="duration" type="number"
                     placeholder="input display time">
              <button type="button" class="btn btn-default" id="addAlertHadDuration"
                      @click="addAlert('success',false,true)">
                Add Alert (time)
              </button>
              <button type="button" class="btn btn-default" id="addAlert" @click="addAlert('success',true)">
                Add Alert
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Props</h4>
        <ul>
          <li><p><code>closable: Boolean</code> Show close button on alert. default: true.</p></li>
          <li><p><code>type: String</code> Alert type (success, info, primary, warning, danger). default: success.</p>
          </li>
          <li><p><code>duration: Number</code> Close after millisecond. default: 0 (not going to close by itself)</p>
          </li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>default</code> The alert body.</p></li>
        </ul>
        <h4>Events</h4>
        <ul>
          <li>
            <p>
              <code>closed</code>
              Fire after the alert closed.
              Note: you have to hide / destroy the alert using <code>v-if</code> / <code>v-show</code> /
              <code>v-for</code> manually due to child components can't change state of parent component.</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="AlertDoc.vue">
        <pre><code>
&lt;alert type=&quot;warning&quot; :closable=&quot;true&quot; v-if=&quot;show&quot; @closed=&quot;show=false&quot;&gt;
  &lt;strong&gt;Warning!&lt;/strong&gt; Better check yourself, you're not looking too good.
&lt;/alert&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import Alert from '../components/alert/Alert.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'

  export default {
    components: {AnchorHeader, Alert, DemoCodeBlock},
    data () {
      return {
        alertList: [
          {type: 'success', closable: false, key: new Date().getTime()}
        ],
        showAlert1: true,
        showAlert2: true,
        showAlert3: true,
        duration: 5000
      }
    },
    methods: {
      addAlert (type, canClose, isDisplayTime) {
        if (isDisplayTime) {
          this.alertList.push({type: type, closable: canClose, duration: this.duration, key: new Date().getTime()})
        } else {
          this.alertList.push({type: type, closable: canClose, key: new Date().getTime()})
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
