<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.install')"></anchor-header>
        <h3 class="page-header">{{$t('install.viaCdn')}}</h3>
        <p v-html="$t('install.viaCdnDesc')"></p>
        <pre><code>
&lt;!-- Load Vue from CDN --&gt;
&lt;script src=&quot;//vuejs.org/js/vue.min.js&quot;&gt;&lt;/script&gt;

&lt;!-- Load uiv from CDN --&gt;
&lt;script src=&quot;//unpkg.com/uiv/dist/uiv.min.js&quot;&gt;&lt;/script&gt;
        </code></pre>
        <h3 class="page-header">{{$t('install.viaNpm')}}</h3>
        <p v-html="$t('install.viaNpmDesc')"></p>
        <pre><code>
$ npm install uiv --save
        </code></pre>
      </div>
    </div>
  </div>
</template>

<script>
  import hljsMixin from './../mixins/hljsMixin'
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
