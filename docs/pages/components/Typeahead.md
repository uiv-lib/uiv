# Typeahead

> A basic, easily extended component for quickly creating elegant typeaheads with any form text input.

## Static Query

A default input field will be auto generated within typeahead component. You can override it if you wish, attach element with `data-role="input"` to be the input source.

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

Use the `item` scoped slot to override the typeahead item's template.

* Use `slot-scope="props"` in Vue 2.5+, otherwise `scope="props"`.
* The items list will be `props.items`.
* The current active item index will be `props.activeIndex`.
* Use `props.select(item)` to select item.
* (Optional) Use `props.highlight(item)` to highlight search keywords in item.

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

### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`v-model`        |            |          | &#10004; | The input or selected value.
`data`           | Array      |          |          | The local auto-complete query data.
`item-key`       | String     |          |          | Value of each `data[key]` to show, leave blank to use the data object.
`append-to-body` | Boolean    | false    |          | Append the typeahead dropdown to body.
`ignore-case`    | Boolean    | true     |          | Ignore input case while matching. Only work in local data mode.
`match-start`    | Boolean    | false    |          | Match from the head of item. Only work in local data mode.
`force-select`   | Boolean    | false    |          | Force user to select from the options or the model will be empty.
`open-on-focus`  | Boolean    | true     |          | Open the typeahead dropdown on input focus.
`open-on-empty`  | Boolean    | false    |          | Open the typeahead dropdown to show suggestions even if input is empty.
`limit`          | Number     | 10       |          | Limit the options size.
`async-src`      | String     |          |          | The ajax url to fetch data using GET method, query string will be append to the end of this prop value, should return JSON object or array.
`async-key`      | String     |          |          | The async JSON key to render, leave blank to use the original json object (should be Array).
`debounce`       | Number     | 200      |          | Debounce the input for specify milliseconds while in async mode.

### Slots

Name      | Description
--------- | -----------------------
`default` | Can be the typeahead input element or others.
`item`    | Use this scoped slot to override the typeahead item's template.
