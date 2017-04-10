<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Progress Bar" source-folder="progressbar"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Basic Example</h3>
        <progress-bar v-model="progress66"></progress-bar>
        <br/>
        <h3>With Label</h3>
        <progress-bar v-model="progress66" :label="true"></progress-bar>
        <br/>
        <h3>With Custom Label</h3>
        <progress-bar v-model="progress66" :label="true" label-text="Loading... 66% completed"></progress-bar>
        <br/>
        <h3>With Minimum Width</h3>
        <progress-bar v-model="progress1" :min-width="true" :label="true"></progress-bar>
        <br/>
        <h3>Different Styles</h3>
        <progress-bar v-model="progress40" type="success"></progress-bar>
        <progress-bar v-model="progress20" type="info"></progress-bar>
        <progress-bar v-model="progress60" type="warning"></progress-bar>
        <progress-bar v-model="progress80" type="danger"></progress-bar>
        <br/>
        <h3>Striped</h3>
        <progress-bar v-model="progress40" type="success" :striped="true"></progress-bar>
        <progress-bar v-model="progress20" type="info" :striped="true"></progress-bar>
        <progress-bar v-model="progress60" type="warning" :striped="true"></progress-bar>
        <progress-bar v-model="progress80" type="danger" :striped="true"></progress-bar>
        <br/>
        <h3>Active Striped</h3>
        <progress-bar v-model="progress40" :striped="true" :active="true"></progress-bar>
        <br/>
        <h3>Stacked</h3>
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
        <demo-code-block demo-file="ProgressBarDoc.vue">
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
        </demo-code-block>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">API</h3>
        <h4>Props</h4>
        <ul>
          <li><p><code>min: Number</code> Default: 0</p></li>
          <li><p><code>max: Number</code> Default: 100</p></li>
          <li><p><code>v-model: Number</code> Current progress. Default: 0</p></li>
          <li><p><code>label: Boolean</code> Show label on progress bar. Default: false</p></li>
          <li><p><code>label-text: String</code> Custom label text.</p></li>
          <li><p><code>min-width: Boolean</code> Apply a minimum width to the progress bar, useful when showing label
            and small current value. Default: false</p></li>
          <li><p><code>type: String</code> Progress bar type, support success / info / warning / danger. Or you can add
            custom types.</p></li>
          <li><p><code>striped: Boolean</code> Apply striped style. Default false</p></li>
          <li><p><code>active: Boolean</code> Apply active to striped style. Default false</p></li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>default</code> Use this slot if need stacked progress bar, see example below.</p></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import ProgressBar from '../../components/progressbar/ProgressBar.vue'
  import ProgressBarStack from '../../components/progressbar/ProgressBarStack.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodeBlock, ProgressBar, ProgressBarStack},
    data () {
      return {
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
