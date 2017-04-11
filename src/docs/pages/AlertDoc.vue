<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Alert" source-folder="alert"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div id="alertContainer">
          <alert v-for="(item,index) in alertList"
                 :closable="item.closable"
                 :type="item.type"
                 :duration="item.duration"
                 :key="item.key"
                 @closed="alertList.splice(index, 1)">
            <strong>Well done!</strong>
            <span>You successfully read this important alert message.</span>
          </alert>
          <alert type="info" :closable="true" v-if="showAlert1" @closed="showAlert1=false">
            <strong>Heads up!</strong>
            <span>This alert needs your attention, but it's not super important.</span>
          </alert>
          <alert type="warning" :closable="true" v-if="showAlert2" @closed="showAlert2=false">
            <strong>Warning!</strong>
            <span>Better check yourself, you're not looking too good.</span>
          </alert>
          <alert type="danger" :closable="true" v-if="showAlert3" @closed="showAlert3=false">
            <strong>Oh snap!</strong>
            <span>Change a few things up and try submitting again.</span>
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
                <span>Add Alert (time)</span>
              </button>
              <button type="button" class="btn btn-default" id="addAlert" @click="addAlert('success',true)">
                <span>Add Alert</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="AlertDoc.vue">
        <pre><code>
&lt;alert type=&quot;warning&quot; :closable=&quot;true&quot; v-if=&quot;show&quot; @closed=&quot;show=false&quot;&gt;
  &lt;strong&gt;Warning!&lt;/strong&gt; Better check yourself, you're not looking too good.
&lt;/alert&gt;
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
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import ApiPanel from './../architecture/ApiPanel.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, Alert, DemoCodePanel, ApiPanel},
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
              name: 'closed',
              desc: 'Fire after the alert closed. Note: you have to hide / destroy the alert using <code>v-if</code> / <code>v-show</code> / <code>v-for</code> manually due to child components can\'t change state of parent component.'
            }
          ]
        },
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
