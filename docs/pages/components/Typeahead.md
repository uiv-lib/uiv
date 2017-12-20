# Typeahead

> A basic, easily extended component for quickly creating elegant typeaheads with any form text input.

## Example

Use `v-model` to bind the input value, and `target` to point to the ideal input element.

If you want to clear the `v-model` of typeahead, simply set it to `null`, the corresponding input value will also be cleared.

```html
<template>
  <section>
    <btn @click="model=states[0]" type="primary">Set to Alabama</btn>
    <btn @click="model=null">Clear</btn>
    <hr/>
    <label for="input">States of America:</label>
    <input id="input" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input" :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
</template>
<script>
  import states from '../../assets/data/states.json'

  export default {
    data () {
      return {
        model: '',
        states: states.data
      }
    }
  }
</script>
<!-- typeahead-example.vue -->
```

## Target

A `target` can be:

* Selector that can be recognized by `querySelect`.
* Reference to Element.
* Reference to Component.

Note that if you use a component reference, the corresponding component's root element must be an input element.

An example using element reference target:

```html
<template>
  <section>
    <label>States of America:</label>
    <input ref="input" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" :target="target" :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        model: '',
        target: null,
        states: states.data // import states from '../../assets/data/states.json'
      }
    },
    mounted () {
      this.target = this.$refs.input
    }
  }
</script>
<!-- typeahead-target.vue -->
```

## Match Start

Match from the head of item.

**Note**: Only work in local data query mode.

```html
<template>
  <section>
    <label for="input-2">States of America:</label>
    <input id="input-2" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-2" match-start :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        model: '',
        states: states.data // import states from '../../assets/data/states.json'
      }
    }
  }
</script>
<!-- typeahead-match-start.vue -->
```

## Force Select

Force user to select from the options or the model will be empty.

```html
<template>
  <section>
    <label for="input-3">States of America:</label>
    <input id="input-3" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-3" force-select :data="states" item-key="name"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        model: '',
        states: states.data // import states from '../../assets/data/states.json'
      }
    }
  }
</script>
<!-- typeahead-force-select.vue -->
```

## Async Query

You can use simply use `async-src` to perform an AJAX query with built-in query function, or `async-function` for a custom one if you need more than that.

**Note**: `ignore-case` and `match-start` won't work in async query mode.

An example using `async-src`:

```html
<template>
  <section>
    <label for="input-4">Users of Github:</label>
    <input id="input-4" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-4" async-src="https://api.github.com/search/users?q=" async-key="items" item-key="login"/>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
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
<!-- typeahead-async-query.vue -->
```

## Custom Template

Use the `item` scoped slot to override the typeahead item's template.

* Use `slot-scope="props"` in Vue 2.5+, otherwise `scope="props"`.
* The items list will be `props.items`.
* The current active item index will be `props.activeIndex`.
* Use `props.select(item)` to select item.
* (Optional) Use `props.highlight(item)` to highlight search keywords in item.

An example with custom template and `async-function`:

```html
<template>
  <section>
    <label for="input-5">Users of Github:</label>
    <input id="input-5" class="form-control" type="text" placeholder="Type to search...">
    <typeahead v-model="model" target="#input-5" :async-function="queryFunction" item-key="login">
      <template slot="item" slot-scope="props">
        <li v-for="(item, index) in props.items" :class="{active:props.activeIndex===index}">
          <a role="button" @click="props.select(item)">
            <img width="22px" height="22px" :src="item.avatar_url + '&s=40'">
            <span v-html="props.highlight(item)"></span>
          </a>
        </li>
      </template>
    </typeahead>
    <br/>
    <alert v-show="model">You selected {{model}}</alert>
  </section>
</template>
<script>
  import axios from 'axios' // https://github.com/axios/axios

  export default {
    data () {
      return {
        model: ''
      }
    },
    methods: {
      queryFunction (query, done) {
        axios.get('https://api.github.com/search/users?q=' + query)
          .then(res => {
            done(res.data.items)
          })
          .catch(err => {
            // any error handler
          })
      }
    }
  }
</script>
<!-- typeahead-custom-template.vue -->
```

# API Reference

## [Typeahead.vue](https://github.com/wxsms/uiv/blob/release/src/components/typeahead/Typeahead.vue)

### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`v-model`        |            |          | &#10004; | The input or selected value.
`target`         |            |          | &#10004; | The input element to bind with. Can be a select or reference to Element / Component.
`data`           | Array      |          |          | The local auto-complete query data.
`item-key`       | String     |          |          | Value of each `data[key]` to show, leave blank to use the data object.
`append-to-body` | Boolean    | false    |          | Append the typeahead dropdown to body.
`ignore-case`    | Boolean    | true     |          | Ignore input case while matching. Only work in local data mode.
`match-start`    | Boolean    | false    |          | Match from the head of item. Only work in local data mode.
`force-select`   | Boolean    | false    |          | Force user to select from the options or the model will be empty.
`open-on-focus`  | Boolean    | true     |          | Open the typeahead dropdown on input focus.
`open-on-empty`  | Boolean    | false    |          | Open the typeahead dropdown to show suggestions even if input is empty.
`preselect`      | Boolean    | true     |          | Select the first item that matches the query automatically.
`limit`          | Number     | 10       |          | Limit the options size.
`async-src`      | String     |          |          | The ajax url to fetch data using GET method, query string will be append to the end of this prop value, should return JSON object or array.
`async-key`      | String     |          |          | The async JSON key to render, leave blank to use the original json object (should be Array).
`async-function` | Function   |          |          | The custom async query function with 2 params: `query` as the user input, and `done` as the callback function with array data (note that `async-key` won't work with this). See the example in Custom Template section for details.
`debounce`       | Number     | 200      |          | Debounce the input for specify milliseconds while in async mode.

### Slots

Name      | Description
--------- | -----------------------
`item`    | Use this scoped slot to override the typeahead item's template.

### Events

Name           | Description
---------      | -----------------------
`loading`      | Async loading.
`loaded`       | Async load complete.
`loaded-error` | Async load complete with error.
