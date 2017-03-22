<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Getting Started"></anchor-header>
        <h3 class="page-header">Dependencies</h3>
        <ul>
          <li><strong>Vue 2</strong> (tested on ^2.2.1)</li>
          <li><strong>Bootstrap 3 CSS</strong> (tested on ^3.3.7)</li>
        </ul>
        <h3 class="page-header">Supported Browsers</h3>
        <p>Components and directives are tested with the following browsers:</p>
        <ul>
          <li>Chrome</li>
          <li>Firefox</li>
          <li>Safari</li>
          <li>IE 9 / 10 / 11</li>
        </ul>
        <h3 class="page-header">Install</h3>
        <p>uiv is using Webpack UMD exporter, which means you can use it in both:</p>
        <ul>
          <li><b>ES6</b></li>
          <li><b>CommonJS</b></li>
          <li><b>AMD</b></li>
          <li><b>Browser</b></li>
        </ul>
        <p>You can simply include uiv into you js files or HTML page and start working.</p>
        <h4>ES6 Sample</h4>
        <div><pre><code>
$ npm install uiv

// Directives, e.g. v-tooltip
import Vue from 'vue'
import { directives } from 'uiv'
Vue.use(directives)

// Components
import { Dropdown } from 'uiv'

new Vue({
  components: {
    Dropdown
  }
})
        </code></pre>
        </div>
        <h4>Browser Sample</h4>
        <div><pre><code>
&lt;tabs&gt;
  &lt;tab&gt;...&lt;/tab&gt;
  &lt;tab&gt;...&lt;/tab&gt;
&lt;/tabs&gt;

&lt;script src=&quot;path/to/vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;path/to/uiv.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
  Vue.use(uiv.directives) // If you need
  new Vue({
    components: {
      Tabs: uiv.Tabs, Tab: uiv.Tab
    }
  })
&lt;/script&gt;
        </code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './AnchorHeader.vue'
  export default {
    components: {AnchorHeader}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
