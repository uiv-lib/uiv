# MultiSelect

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

# API Reference

## [MultiSelect](https://github.com/wxsms/uiv/blob/master/src/components/select/MultiSelect.vue)

### Props

Name                  | Type       | Default                | Required | Description
----------------      | ---------- | ---------------------- | -------- | -----------------------
`v-model`             | Array      |                        | &#10004; | The selected values.
`options`             | Array      |                        | &#10004; | The select options.
`label-key`           | String     | label                  |          | Identity key name for label.
`value-key`           | String     | value                  |          | Identity key name for value.
`limit`               | Boolean    | 0                      |          | Maximum number of options user can select, no limit when set to `0`.
`size`                | String     |                        |          | Optional sizes, supported: `sm` / `lg`.
`block`               | Boolean    | false                  |          | Apply block level style.
`placeholder`         | String     | Select...              |          | The default text displayed when no options are selected.
`split`               | String     | ,                      |          | The options display spliter.
`filterable`          | Boolean    | false                  |          | Append filter input before options (default is filter by item value and label, case ignored).
`filter-placeholder`  | String     | Search...              |          | The default text displayed in filter input.
`filter-function`     | Function   |                        |          | Custom filter function, with one param as input string, and returns the filtered array.
`disabled`            | Boolean    | false                  |          | Disable the select component.
`collapse-selected`   | Boolean    | false                  |          | Collapse multiple selected items into a text.
`append-to-body`      | Boolean    | false                  |          | Append the dropdown to `body`.
`selected-icon`       | String     | glyphicon glyphicon-ok |          | Icon displayed in option while selected.

### Events

Name             | Params                            | Description
-----------      | ------                            | ---------------
`change`         | value                             | Triggers when the selected value changes.
`visible-change` | the visible status (true / false) | Triggers when the dropdown toggles.
`limit-exceed`   |                                   | Triggers when the selected value length exceeded limit.
`focus`          | event                             | Triggers when input focuses.
`blur`           | event                             | Triggers when input blurs.
