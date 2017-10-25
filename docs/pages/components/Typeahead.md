# Typeahead

> A basic, easily extended component for quickly creating elegant typeaheads with any form text input.

## Static Query

```html
<template>
  <label class="control-label">States of America</label>
  <typeahead ref="typeahead1"
             v-model="model"
             :data="states"
             :item-key="itemKey"
             :ignore-case="ignoreCase"
             :match-start="matchStart"
             :force-select="forceSelect"
             :open-on-focus="openOnFocus"></typeahead>
  <hr/>
  <h4>Settings</h4>
  <form class="form-inline">
    <button class="btn btn-primary" type="button" @click="model = states[0]">Set to Alabama</button>
    <button class="btn btn-default" type="button" @click="model = null">Reset</button>
    <div class="form-group">
      <label class="checkbox-inline"><input type="checkbox" v-model="ignoreCase"> Ignore Case</label>
      <label class="checkbox-inline"><input type="checkbox" v-model="matchStart"> Match Start</label>
      <label class="checkbox-inline"><input type="checkbox" v-model="forceSelect"> Force Select</label>
    </div>
  </form>
  <br/>
  <alert type="info" v-if="model">You selected: {{model}}</alert>
</template>
<script>
  import states from '../../assets/data/states.json'

  export default {
    data () {
      return {
        model: '',
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
<!-- typeahead-example.vue -->
```

## Async & Custom Template

**Note**: `ignore-case` and `match-start` won't work in async query mode.

```html
<template>
  <typeahead ref="typeahead2"
             v-model="model"
             async-src="https://api.github.com/search/users?q="
             async-key="items"
             item-key="login">
    <template slot="item" slot-scope="props">
      <li v-for="(item, index) in props.items" :class="{active:props.activeIndex===index}">
        <a href="javascript:void(0)" @click="props.select(item)">
          <img width="22px" height="22px" :src="item.avatar_url + '&s=40'">
          <span v-html="props.highlight(item)"></span>
        </a>
      </li>
    </template>
  </typeahead>
  <br/>
  <alert type="info" v-if="model">You selected: {{model}}</alert>
</template>
<script>
  export default {
    data () {
      return {
        model: ''
      }
    }
  }
</script>
<!-- typeahead-async.vue -->
```

# API Reference

## [Typeahead.vue](https://github.com/wxsms/uiv/tree/master/src/components/typeahead/Typeahead.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Note</span></td>
    </tr>
    <tr>
      <td colspan="5">Element with <code>data-role="input"</code> will be the input source.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td></td>
      <td></td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>The input or selected value.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>data</code></td>
      <td>Array</td>
      <td></td>
      <td></td>
      <td>The local auto-complete query data.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>item-key</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>Value of each data[key] to show, leave blank to use the data object.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>append-to-body</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Append the typeahead dropdown to body.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>ignore-case</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Ignore input case while matching. Only work in local data mode.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>match-start</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Match from the head of item. Only work in local data mode.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>force-select</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Force user to select from the options or the model will be empty.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>open-on-focus</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Open the typeahead dropdown on input focus.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>open-on-empty</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Open the typeahead dropdown to show suggestions even if input is empty.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>limit</code></td>
      <td>Number</td>
      <td>10</td>
      <td></td>
      <td>Limit the options size.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>async-src</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>
        The ajax url to fetch data using GET method, query string will be append to the end of this prop value, should return JSON object or array.
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>async-key</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>
        The async JSON key to render, leave blank to use the original json object (should be Array).
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>debounce</code></td>
      <td>Number</td>
      <td>200</td>
      <td></td>
      <td>Debounce the input for specify milliseconds while in async mode.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Slots</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th colspan="4">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">Can be the typeahead input element or others.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>item</code></td>
      <td colspan="4">
        <p>Use this <b>scoped</b> slot to override the typeahead template.</p>
        <ul>
          <li><p>Use <code>slot-scope="props"</code> in Vue 2.5+, otherwise <code>scope="props"</code>.</p></li>
          <li><p>The items list will be <code>props.items</code>.</p></li>
          <li><p>The current active item index will be <code>props.activeIndex</code>.</p></li>
          <li><p>Use <code>props.select(item)</code> to select item.</p></li>
          <li><p>(Optional) Use <code>props.highlight(item)</code> to highlight search keywords in item.</p></li>
        </ul>
      </td>
    </tr>
    </tbody>
  </table>
</div>
