<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Typeahead" source-folder="typeahead"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h3>Static Query Example</h3>
        <div class="well">
          <form class="form-inline">
            <div class="form-group">
              <label class="control-label">Settings</label>
              <label class="checkbox-inline">
                <input type="checkbox" v-model="ignoreCase"> Ignore Case
              </label>
              <label class="checkbox-inline">
                <input type="checkbox" v-model="matchStart"> Match Start
              </label>
              <label class="checkbox-inline">
                <input type="checkbox" v-model="forceSelect"> Force Select
              </label>
            </div>
          </form>
        </div>
        <typeahead ref="typeahead1"
                   v-model="model1"
                   :data="states"
                   :item-key="itemKey"
                   :limit="10"
                   :append-to-body="false"
                   :ignore-case="ignoreCase"
                   :match-start="matchStart"
                   :force-select="forceSelect">
          <label class="control-label">States of America</label>
          <input data-role="input" class="form-control" type="text" placeholder="Type to search...">
        </typeahead>
        <br/>
        <div class="alert alert-info">
          <p v-if="model1">You selected: {{model1}}</p>
          <p v-else>Please select an item.</p>
        </div>
        <h3>Async & Custom Template Example</h3>
        <typeahead ref="typeahead2"
                   v-model="model2"
                   async-src="https://api.github.com/search/users?q="
                   async-key="items"
                   item-key="login"
                   :force-select="true">
          <label class="control-label">Github Users</label>
          <input data-role="input" class="form-control" type="text" placeholder="Type to search...">
          <template slot="item" scope="props">
            <img width="18px" height="18px" :src="props.item.avatar_url">
            <span v-text="props.item.login"></span>
          </template>
        </typeahead>
        <br/>
        <div class="alert alert-info">
          <p v-if="model2">You selected: {{model2}}</p>
          <p v-else>Please select an item.</p>
        </div>
      </div>
      <div class="col-md-12">
        <h4>Note</h4>
        <ul>
          <li><p>Use <code>v-model</code> to bind the input value.</p></li>
          <li><p>Element with <code>data-role="input"</code> will be the input source.</p></li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li><p><code>data: Array</code> The local auto-complete query data.</p></li>
          <li><p><code>item-key: String</code> Value of each data[key] to show, leave blank to use the data object.</p>
          </li>
          <li><p><code>append-to-body: Boolean</code> Append the dropdown to body. Default: false.</p></li>
          <li>
            <p><code>ignore-case: Boolean</code> Ignore input case while matching. Default: true.</p>
          </li>
          <li>
            <p><code>match-start: Boolean</code> Match from the head of item. Default: false.</p>
          </li>
          <li>
            <p><code>force-select: Boolean</code>
              Force user to select from the options or the model will be empty. Default: false.</p>
          </li>
          <li>
            <p><code>limit: Number</code> Limit the options size. Default: 10.</p>
          </li>
          <li>
            <p><code>async-src: String</code>
              The ajax url to fetch data using GET method, query string will be append to the end of this prop value,
              should return JSON object or array.
            </p>
          </li>
          <li>
            <p><code>async-key: String</code>
              The async JSON key to render, leave blank to use the original json object (should be Array).
            </p>
          </li>
          <li>
            <p><code>async-delay: Number</code>
              Debounce the input for specify milliseconds while using async call. Default: 500.
            </p>
          </li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li><p><code>default</code> Should be the typeahead input element or others.</p></li>
          <li>
            <p>
              <code>item</code>
              Use this slot to override the typeahead template.
              Note: This should be a scope slot and use <code>scope="props"</code> as param.
              The list item object will be <code>props.item</code>.
              Detail please refer to below sample.
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="TypeaheadDoc.vue">
        <pre><code>
// Local data query sample
&lt;typeahead v-model=&quot;model1&quot; :data=&quot;states&quot; item-key=&quot;name&quot;&gt;
  &lt;label class=&quot;control-label&quot;&gt;States of America&lt;/label&gt;
  &lt;input data-role=&quot;input&quot; class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;Type to search...&quot;&gt;
&lt;/typeahead&gt;

// Async data query &amp; custom template sample
&lt;typeahead v-model=&quot;model2&quot;
           async-src=&quot;https://api.github.com/search/users?q=&quot;
           async-key=&quot;items&quot;
           item-key=&quot;login&quot;&gt;
  &lt;label class=&quot;control-label&quot;&gt;Github Users&lt;/label&gt;
  &lt;input data-role=&quot;input&quot; class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;Type to search...&quot;&gt;
  &lt;template slot=&quot;item&quot; scope=&quot;props&quot;&gt;
    &lt;img width=&quot;18px&quot; height=&quot;18px&quot; :src=&quot;props.item.avatar_url&quot;&gt;
    &lt;span v-text=&quot;props.item.login&quot;&gt;&lt;/span&gt;
  &lt;/template&gt;
&lt;/typeahead&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodeBlock from '../architecture/DemoCodeBlock.vue'
  import Typeahead from '../../components/typeahead/Typeahead.vue'
  import states from '../data/states.json'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodeBlock, Typeahead},
    data () {
      return {
        model1: '',
        model2: '',
        itemKey: 'name',
        states: states.data,
        forceSelect: false,
        ignoreCase: true,
        matchStart: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
