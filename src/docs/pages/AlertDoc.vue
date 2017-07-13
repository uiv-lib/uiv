<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Alert" source-folder="alert"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">Basic Example</h3>
        <div>
          <alert type="success" :closable="true" v-if="showAlert4" @close="showAlert4=false">
            <strong>Well done!</strong>
            <span>You successfully read this important alert message.</span>
          </alert>
          <alert type="info" :closable="true" v-if="showAlert1" @close="showAlert1=false">
            <strong>Heads up!</strong>
            <span>This alert needs your attention, but it's not super important.</span>
          </alert>
          <alert type="warning" :closable="true" v-if="showAlert2" @close="showAlert2=false">
            <strong>Warning!</strong>
            <span>Better check yourself, you're not looking too good.</span>
          </alert>
          <alert type="danger" :closable="true" v-if="showAlert3" @close="showAlert3=false">
            <h4>Oh snap! You got an error!</h4>
            <p>
              Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
            <p>
              <button type="button" class="btn btn-danger">Take this action</button>
              <button type="button" class="btn btn-default">Or do this</button>
            </p>
          </alert>
        </div>
        <h3 class="page-header">Dynamic Example</h3>
        <div id="alertContainer">
          <alert v-for="(item,index) in alertList"
                 :closable="item.closable"
                 :type="item.type"
                 :duration="item.duration"
                 :key="item.key"
                 @close="alertList.splice(index, 1)">
            <span v-if="item.duration">This alert will dismiss after <b>{{item.duration}}ms</b>.</span>
            <span v-else>This alert will not dismiss over time.</span>
          </alert>
        </div>
        <div class="well">
          <form class="form-inline">
            <div class="form-group">
              <label>display time</label>
              <input class="form-control" step="1000" min="0" v-model.number="duration" type="number"
                     placeholder="input display time">
              <button type="button" class="btn btn-default" id="addAlertHadDuration"
                      @click="addAlert('success',false,true)">
                <span>Add Alert (Time)</span>
              </button>
              <button type="button" class="btn btn-default" id="addAlert" @click="addAlert('success',true)">
                <span>Add Alert</span>
              </button>
            </div>
          </form>
        </div>
        <h3 class="page-header">Use with Collapse</h3>
        <div>
          <button type="button" class="btn btn-default" @click="showAlert5 = !showAlert5">Toggle Alert</button>
        </div>
        <br/>
        <collapse v-model="showAlert5">
          <alert type="warning" :closable="true" @close="showAlert5 = false">
            This alert will collapse on open / close.
          </alert>
        </collapse>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="AlertDoc.vue">
        <pre><code>
&lt;!-- Basic --&gt;
&lt;alert type=&quot;warning&quot; :closable=&quot;true&quot; v-if=&quot;show&quot; @close=&quot;show=false&quot;&gt;
  &lt;strong&gt;Warning!&lt;/strong&gt; Better check yourself, you're not looking too good.
&lt;/alert&gt;

&lt;!-- With Collapse --&gt;
&lt;collapse v-model=&quot;show&quot;&gt;
  &lt;alert type=&quot;warning&quot; :closable=&quot;true&quot; @close=&quot;show = false&quot;&gt;
    ...
  &lt;/alert&gt;
&lt;/collapse&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="alert" file="Alert.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import Alert from '../../components/alert/Alert.vue'
  import Collapse from './../../components/collapse/Collapse.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import ApiPanel from './../architecture/ApiPanel.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, Alert, DemoCodePanel, ApiPanel, Collapse},
    data () {
      return {
        api: {
          props: [
            {
              name: 'closable',
              type: 'Boolean',
              desc: 'Show close button on alert',
              'default': true
            },
            {
              name: 'type',
              type: 'String',
              desc: 'Alert type (success, info, primary, warning, danger)',
              'default': 'success'
            },
            {
              name: 'duration',
              type: 'Number',
              desc: 'Close after millisecond, set to 0 to prevent self-closing',
              'default': 0
            }
          ],
          slots: [
            {
              name: 'default',
              desc: 'The alert body'
            }
          ],
          events: [
            {
              name: 'close',
              desc: 'Fire after the alert closed. Note: you have to hide / destroy the alert using <code>v-if</code> / <code>v-show</code> / <code>v-for</code> manually due to child components can\'t change state of parent component.'
            }
          ]
        },
        alertList: [],
        showAlert1: true,
        showAlert2: true,
        showAlert3: true,
        showAlert4: true,
        showAlert5: true,
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
