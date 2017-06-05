<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Progress Bar" source-folder="progressbar"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">Basic Example</h3>
        <progress-bar v-model="progress66"></progress-bar>
        <h3 class="page-header">With Label</h3>
        <progress-bar v-model="progress66" :label="true"></progress-bar>
        <h3 class="page-header">With Custom Label</h3>
        <progress-bar v-model="progress66" :label="true" label-text="Loading... 66% completed"></progress-bar>
        <h3 class="page-header">With Minimum Width</h3>
        <progress-bar v-model="progress1" :min-width="true" :label="true"></progress-bar>
        <h3 class="page-header">Different Styles</h3>
        <progress-bar v-model="progress40" type="success"></progress-bar>
        <progress-bar v-model="progress20" type="info"></progress-bar>
        <progress-bar v-model="progress60" type="warning"></progress-bar>
        <progress-bar v-model="progress80" type="danger"></progress-bar>
        <h3 class="page-header">Striped</h3>
        <progress-bar v-model="progress40" type="success" :striped="true"></progress-bar>
        <progress-bar v-model="progress20" type="info" :striped="true"></progress-bar>
        <progress-bar v-model="progress60" type="warning" :striped="true"></progress-bar>
        <progress-bar v-model="progress80" type="danger" :striped="true"></progress-bar>
        <h3 class="page-header">Active Striped</h3>
        <progress-bar v-model="progress40" :striped="true" :active="true"></progress-bar>
        <h3 class="page-header">Stacked</h3>
        <progress-bar>
          <progress-bar-stack v-model="progress35" type="success"></progress-bar-stack>
          <progress-bar-stack v-model="progress20" type="warning" :striped="true"></progress-bar-stack>
          <progress-bar-stack v-model="progress10" type="danger"></progress-bar-stack>
        </progress-bar>
        <br/>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="ProgressBarDoc.vue">
        <pre><code>
&lt;!-- Single --&gt;
&lt;progress-bar v-model=&quot;progress&quot;&gt;&lt;/progress-bar&gt;

&lt;!-- Stacked --&gt;
&lt;progress-bar&gt;
  &lt;progress-bar-stack v-model=&quot;progress1&quot; type=&quot;success&quot;&gt;&lt;/progress-bar-stack&gt;
  &lt;progress-bar-stack v-model=&quot;progress2&quot; type=&quot;warning&quot; :striped=&quot;true&quot;&gt;&lt;/progress-bar-stack&gt;
  &lt;progress-bar-stack v-model=&quot;progress3&quot; type=&quot;danger&quot;&gt;&lt;/progress-bar-stack&gt;
&lt;/progress-bar&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="progressbar" file="ProgressBar.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import ProgressBar from '../../components/progressbar/ProgressBar.vue'
  import ProgressBarStack from '../../components/progressbar/ProgressBarStack.vue'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, ProgressBar, ProgressBarStack, ApiPanel},
    data () {
      return {
        api: {
          notes: [
            '<code>ProgressBar.vue</code> and <code>ProgressBarStack.vue</code> share same prop attributes.'
          ],
          props: [
            {
              name: 'v-model',
              required: true,
              desc: 'Current progress.',
              type: 'Number',
              'default': ''
            },
            {
              name: 'min',
              desc: '',
              type: 'Number',
              'default': '0'
            },
            {
              name: 'max',
              desc: '',
              type: 'Number',
              'default': '100'
            },
            {
              name: 'label',
              desc: 'Show label on progress bar.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'label-text',
              desc: 'Custom label text.',
              type: 'String',
              'default': ''
            },
            {
              name: 'min-width',
              desc: 'Apply a minimum width to the progress bar, useful when showing label and small current value.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'type',
              desc: 'Progress bar type, support success / info / warning / danger. Or you can add custom types.',
              type: 'String',
              'default': ''
            },
            {
              name: 'striped',
              desc: 'Apply striped style.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'active',
              desc: 'Apply active to striped style.',
              type: 'Boolean',
              'default': 'false'
            }
          ],
          slots: [
            {
              name: 'default',
              desc: 'Use this slot if need stacked progress bar, see example in the code panel below.'
            }
          ]
        },
        progress66: 66,
        progress1: 1,
        progress20: 20,
        progress40: 40,
        progress60: 60,
        progress80: 80,
        progress35: 35,
        progress10: 10
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
