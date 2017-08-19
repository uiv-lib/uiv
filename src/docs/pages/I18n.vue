<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.i18n')"></anchor-header>
        <h3 class="page-header">{{$t('i18n.basic')}}</h3>
        <p v-html="$t('i18n.basicDesc')"></p>
        <pre><code>
import Vue from 'vue'
import uiv from 'uiv'
import locale from 'uiv/src/locale/lang/zh-CN'

Vue.use(uiv, { locale })
        </code></pre>
        <p v-html="$t('i18n.basicDesc2')"></p>
        <h3 class="page-header">{{$t('i18n.vueI18n')}}</h3>
        <p v-html="$t('i18n.vueI18nDesc')"></p>
        <p v-html="$t('i18n.vueI18nDesc2')"></p>
        <pre><code>
import uivLocale from 'uiv/src/locale/lang/zh-CN'

let appLocale = Object.assign({}, uivLocale, {
  // ...
})
        </code></pre>
        <h3 class="page-header">{{$t('i18n.supported')}}</h3>
        <p>{{$t('i18n.supportedSortBy')}}</p>
        <ul>
          <li>cs-CZ</li>
          <li>en-US</li>
          <li>pt-BR</li>
          <li>zh-CN</li>
        </ul>
        <p>{{$t('i18n.supportedContribute')}}</p>
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
