# MultiSelect

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

## Example

Use `v-model` to bind selected values, and `options` as select options.

```html
<template>
  <multi-select v-model="selected" :options="options"/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    }
  }
</script>
<!-- multi-select-example.vue -->
```

## Multiple Limit

Use `limit` to restrict the maximum number of options user can select, no limit when set to `0`.

```html
<template>
  <multi-select v-model="selected" :options="options" :limit="3"/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    }
  }
</script>
<!-- multi-select-limit.vue -->
```

## Optional Sizes

Optional sizes `sm` and `lg` are supported. You can also add `block` prop to quickly apply `width: 100%` style to the component.

```html
<template>
  <section>
    <div>
      <multi-select v-model="selected" :options="options" size="sm"/>
    </div>
    <br/>
    <div>
      <multi-select v-model="selected" :options="options"/>
    </div>
    <br/>
    <div>
      <multi-select v-model="selected" :options="options" size="lg"/>
    </div>
    <br/>
    <div>
      <multi-select v-model="selected" :options="options" size="lg" block/>
    </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    }
  }
</script>
<!-- multi-select-sizes.vue -->
```

## Disabled options

Add `disabled: true` to an option to disable it.

```html
<template>
  <multi-select v-model="selected" :options="options"/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3', disabled: true},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5', disabled: true}
        ]
      }
    }
  }
</script>
<!-- multi-select-disabled-options.vue -->
```

## Disabled select

```html
<template>
  <multi-select v-model="selected" :options="options" disabled/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    }
  }
</script>
<!-- multi-select-disabled-select.vue -->
```

## Collapse selected

Collapse multiple selected items into a text by using `collapse-selected` prop.

```html
<template>
  <multi-select v-model="selected" :options="options" collapse-selected/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    }
  }
</script>
<!-- multi-select-collapse-selected.vue -->
```

## Option groups

If you need grouped options, simply add `group` (String) as the name to them.

```html
<template>
  <multi-select v-model="selected" :options="options"/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Apple', group: 'Fruit'},
          {value: 2, label:'Banana', group: 'Fruit'},
          {value: 3, label:'Orange', group: 'Fruit'},
          {value: 4, label:'Red', group: 'Color'},
          {value: 5, label:'Green', group: 'Color'}
        ]
      }
    }
  }
</script>
<!-- multi-select-option-groups.vue -->
```

## Filterable

Add `filterable` to append filter input before options.

By default, options are filtered by item value and label (case ignored), use a custom `filter-function` to override it if needed.

```html
<template>
  <multi-select v-model="selected" :options="options" filterable/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    }
  }
</script>
<!-- multi-select-filterable.vue -->
```

## Search Event Publish

Enables publish for searching events

By default it is set to false. Emits search event if true

```html
<template>
  <multi-select v-model="selected" :options="options" @search="search" filter-placeholder="Click Enter to Search" filterable fire-event/>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {value: 1, label:'Option1'},
          {value: 2, label:'Option2'},
          {value: 3, label:'Option3'},
          {value: 4, label:'Option4'},
          {value: 5, label:'Option5'}
        ]
      }
    },
    methods:{
        search(searchedText){
            console.log(`Searched Text is '${searchedText}'`);
        }
    }
  }
</script>
<!-- multi-select-search-event.vue -->
```

## Custom Options

You can add customized options like following example

```html
<template>
  <multi-select v-model="selected" :options="options" value-key="email" label-key="username">
    <span slot="custom-option" slot-scope="option" v-tooltip="option.item.placeholder">
        <i :class="option.item.icon" style="margin-right: 10px;"></i>
        {{option.item.username}}
    </span>
  </multi-select>
</template>
<script>
  export default {
    data () {
      return {
        selected: [],
        options: [
          {icon: 'glyphicon glyphicon-envelope', email: 'testuser1@test.test', group: 'Internal Users', placeholder: 'Test User 1', username: 'TUser1'},
          {icon: 'glyphicon glyphicon-music', email: 'testuser2@test.test', group: 'Internal Users', placeholder: 'Test User 2', username: 'TUser2'},
          {icon: 'glyphicon glyphicon-search', email: 'testuser3@test.test', group: 'Internal Users', placeholder: 'Test User 3', username: 'TUser3'},
          {icon: 'glyphicon glyphicon-envelope', email: 'testuser4@test.test', group: 'Internal Users', placeholder: 'Test User 4', username: 'TUser4'},
          {icon: 'glyphicon glyphicon-star-empty', email: 'testuser5@test.test', group: 'Known External Users', placeholder: 'Test User 5', username: 'TUser5'},
          {icon: 'glyphicon glyphicon-asterisk', email: 'testuser6@test.test', group: 'Known External Users', placeholder: 'Test User 6', username: 'TUser6'},
        ]
      }
    }
  }
</script>
<!-- multi-select-custom-options.vue -->
```


# API Reference

## [MultiSelect](https://github.com/wxsms/uiv/blob/master/src/components/select/MultiSelect.vue)

### Props

Name                    | Type       | Default                | Required | Description
----------------        | ---------- | ---------------------- | -------- | -----------------------
`v-model`               | Array      |                        | &#10004; | The selected values.
`options`               | Array      |                        | &#10004; | The select options.
`label-key`             | String     | label                  |          | Identity key name for label.
`value-key`             | String     | value                  |          | Identity key name for value.
`limit`                 | Boolean    | 0                      |          | Maximum number of options user can select, no limit when set to `0`.
`size`                  | String     |                        |          | Optional sizes, supported: `sm` / `lg`.
`block`                 | Boolean    | false                  |          | Apply block level style.
`placeholder`           | String     | Select...              |          | The default text displayed when no options are selected.
`split`                 | String     | ,                      |          | The options display spliter.
`filterable`            | Boolean    | false                  |          | Append filter input before options (default is filter by item value and label, case ignored).
`filter-placeholder`    | String     | Search...              |          | The default text displayed in filter input.
`filter-auto-focus`     | Boolean    | true                   |          | Auto focus on filter input.
`filter-function`       | Function   |                        |          | Custom filter function, with one param as input string, and returns the filtered array.
`disabled`              | Boolean    | false                  |          | Disable the select component.
`collapse-selected`     | Boolean    | false                  |          | Collapse multiple selected items into a text.
`append-to-body`        | Boolean    | false                  |          | Append the dropdown to `body`.
`selected-icon`         | String     | glyphicon glyphicon-ok |          | Icon displayed in option while selected.
`item-selected-class`   | String     |                        |          | (0.24.0+) The class applied to the selected list item.
`fire-event`            | Boolean    | false                  |          | Filter input publish search event if it is true.

### Events

Name             | Params                            | Description
-----------      | ------                            | ---------------
`change`         | value                             | Triggers when the selected value changes.
`visible-change` | the visible status (true / false) | Triggers when the dropdown toggles.
`limit-exceed`   |                                   | Triggers when the selected value length exceeded limit.
`focus`          | event                             | Triggers when input focuses.
`blur`           | event                             | Triggers when input blurs.
`search`         | event                             | Triggers when input text changed. (It works if `fire-event` prop is true)

### Scoped Slots

Name                    | Description
-----------             | ---------------
`custom-option`         | Allows to use custom components for options
