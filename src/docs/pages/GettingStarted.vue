<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.gettingStarted')"></anchor-header>
        <h3 class="page-header">{{$t('gettingStarted.dependencies')}}</h3>
        <ul>
          <li><strong>Vue 2</strong> (tested on ^2.2.6)</li>
          <li><strong>Bootstrap 3 CSS</strong> (tested on ^3.3.7)</li>
        </ul>
        <h3 class="page-header">{{$t('gettingStarted.supportedBrowsers')}}</h3>
        <p>{{$t('gettingStarted.supportedBrowsersDesc')}}</p>
        <ul>
          <li>Chrome</li>
          <li>Firefox</li>
          <li>Safari</li>
          <li>Edge</li>
          <li>IE 9 / 10 / 11</li>
        </ul>
        <h3 class="page-header">{{$t('gettingStarted.install')}}</h3>
        <p>{{$t('gettingStarted.installDesc')}}</p>
        <br/>
        <h4>{{$t('gettingStarted.es6Sample')}}</h4>
        <div><pre><code>
$ npm install uiv

// Import and register all components once
import * as uiv from 'uiv'
Vue.use(uiv)

// Or import respectively
import { Dropdown } from 'uiv'

new Vue({
  components: {
    Dropdown
  }
})
        </code></pre>
        </div>
        <h4>{{$t('gettingStarted.browserSample')}}</h4>
        <div><pre><code>
&lt;tabs&gt;
  &lt;tab&gt;...&lt;/tab&gt;
  &lt;tab&gt;...&lt;/tab&gt;
&lt;/tabs&gt;

&lt;script src=&quot;path/to/vue.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;path/to/uiv.min.js&quot;&gt;&lt;/script&gt;

&lt;!-- Import and register all components once --&gt;
&lt;script&gt;
  Vue.use(uiv)
&lt;/script&gt;

&lt;!-- Or import respectively --&gt;
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
  </div>
</template>

<script>
  import hljsMixin from './../mixins/hljsMixin'
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import Locale from './../../mixins/locale'
  export default {
    mixins: [hljsMixin, Locale],
    components: {AnchorHeader}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
