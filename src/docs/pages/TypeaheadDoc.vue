<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Typeahead" source-folder="typeahead"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
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
                   :force-select="forceSelect"
                   :open-on-focus="openOnFocus">
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
            <li v-for="(item, index) in props.items" :class="{active:props.activeIndex===index}">
              <a href="javascript:void(0)" @click="props.select(item)">
                <img width="22px" height="22px" :src="item.avatar_url + '&s=40'">
                <span v-html="props.highlight(item)"></span>
              </a>
            </li>
          </template>
        </typeahead>
        <br/>
        <div class="alert alert-info">
          <p v-if="model2">You selected: {{model2}}</p>
          <p v-else>Please select an item.</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="TypeaheadDoc.vue">
        <pre><code>
&lt;!--Local data query sample--&gt;
&lt;typeahead v-model=&quot;model1&quot; :data=&quot;states&quot; item-key=&quot;name&quot;&gt;
  &lt;label class=&quot;control-label&quot;&gt;States of America&lt;/label&gt;
  &lt;input data-role=&quot;input&quot; class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;Type to search...&quot;&gt;
&lt;/typeahead&gt;

&lt;!--Async data query &amp; custom template sample--&gt;
&lt;typeahead v-model=&quot;model2&quot;
           async-src=&quot;https://api.github.com/search/users?q=&quot;
           async-key=&quot;items&quot;
           item-key=&quot;login&quot;
           :force-select=&quot;true&quot;&gt;
  &lt;label class=&quot;control-label&quot;&gt;Github Users&lt;/label&gt;
  &lt;input data-role=&quot;input&quot; class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;Type to search...&quot;&gt;
  &lt;template slot=&quot;item&quot; scope=&quot;props&quot;&gt;
    &lt;li v-for=&quot;(item, index) in props.items&quot; :class=&quot;{active:props.activeIndex===index}&quot;&gt;
      &lt;a href=&quot;javascript:void(0)&quot; @click=&quot;props.select(item)&quot;&gt;
        &lt;img width=&quot;22px&quot; height=&quot;22px&quot; :src=&quot;item.avatar_url + '&amp;s=40'&quot;&gt;
        &lt;span v-html=&quot;props.highlight(item)&quot;&gt;&lt;/span&gt;
      &lt;/a&gt;
    &lt;/li&gt;
  &lt;/template&gt;
&lt;/typeahead&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="typeahead" file="Typeahead.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import Typeahead from '../../components/typeahead/Typeahead.vue'
  import states from '../data/states.json'
  import hljsMixin from './../mixins/hljsMixin'
  import ApiPanel from './../architecture/ApiPanel.vue'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Typeahead, ApiPanel},
    data () {
      return {
        api: {
          notes: [
            `Element with <code>data-role="input"</code> will be the input source.</code>`
          ],
          props: [
            {
              name: 'v-model',
              required: true,
              desc: 'The input or selected value.'
            },
            {
              name: 'data',
              desc: 'The local auto-complete query data.',
              type: 'Array'
            },
            {
              name: 'item-key',
              desc: 'Value of each data[key] to show, leave blank to use the data object.',
              type: 'String'
            },
            {
              name: 'append-to-body',
              desc: 'Append the typeahead dropdown to body.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'ignore-case',
              desc: 'Ignore input case while matching.',
              type: 'Boolean',
              'default': 'true'
            },
            {
              name: 'match-start',
              desc: 'Match from the head of item.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'force-select',
              desc: 'Force user to select from the options or the model will be empty.',
              type: 'Boolean',
              'default': 'false'
            },
            {
              name: 'open-on-focus',
              desc: 'Open the typeahead dropdown on input focus.',
              type: 'Boolean',
              'default': 'true'
            },
            {
              name: 'limit',
              desc: 'Limit the options size.',
              type: 'Number',
              'default': '10'
            },
            {
              name: 'async-src',
              desc: 'The ajax url to fetch data using GET method, query string will be append to the end of this prop value, should return JSON object or array.',
              type: 'String'
            },
            {
              name: 'async-key',
              desc: 'The async JSON key to render, leave blank to use the original json object (should be Array).',
              type: 'String'
            },
            {
              name: 'debounce',
              desc: 'Debounce the input for specify milliseconds while in async mode.',
              type: 'Number',
              'default': '200'
            }
          ],
          slots: [
            {
              name: 'default',
              desc: 'Should be the typeahead input element or others.'
            },
            {
              name: 'item',
              desc: `
<p>Use this slot to override the typeahead template. Note: This should be a scoped slot and use <code>scope="props"</code> as param.</p>
<ul>
  <li><p>The items list will be <code>props.items.</code></p></li>
  <li><p>The current active item index will be <code>props.activeIndex.</code></p></li>
  <li><p>Use <code>props.select(item)</code> to select item.</code></p></li>
  <li><p>(Optional) Use <code>props.highlight(item)</code> to highlight search keywords in item.</p></li>
</ul>
<p>Detail please refer to below sample in code panel.</p>`
            }
          ]
        },
        model1: '',
        model2: '',
        itemKey: 'name',
        states: states.data,
        forceSelect: false,
        ignoreCase: true,
        matchStart: false,
        openOnFocus: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
