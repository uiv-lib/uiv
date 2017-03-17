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
        <h3 class="page-header">Install</h3>
        <h4>ES6</h4>
        <div><pre><code>
$ npm install uiv

import { Dropdown } from 'uiv'

new Vue({
  components: {
    Dropdown
  }``
})
        </code></pre>
        </div>
        <br/>
        <h4>CommonJS</h4>
        <div><pre><code>
$ npm install uiv

const Dropdown = require('uiv').Dropdown

new Vue({
  components: {
    Dropdown
  }``
})
        </code></pre>
        </div>
        <br/>
        <h4>Browser</h4>
        <div><pre><code>
&lt;tabs&gt;
  &lt;tab&gt;...&lt;/tab&gt;
  &lt;tab&gt;...&lt;/tab&gt;
&lt;/tabs&gt;

&lt;script src=&quot;path/to/vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;path/to/uiv.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
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
