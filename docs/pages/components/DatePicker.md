# Date Picker

> A lightweight & configurable date picker.

## Example

Use `v-model` to bind the selected date.

```html
<template>
  <section>
    <date-picker v-model="date"></date-picker>
    <br/>
    <alert type="info" v-show="date">You selected <b>{{date}}</b>.</alert>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
<!-- date-picker-example.vue -->
```

## Formats

You can use any format you like. For example:

* yyyy-M-d
* yyyy-MM-dd
* yyyy-MMM-dd
* yyyy-MMMM-dd
* yyyy/MM/dd
* MM/dd/yyyy
* yyyy, MM, dd
* ...

Note that some browsers (e.g. IE) might not support all of these formats.

If you need a special format that not supported by `Date.parse`, consider using `date-parser` option to override it.

```html
<template>
  <section>
    <date-picker v-model="date" format="yyyy/MMMM/dd"></date-picker>
    <br/>
    <alert type="info" v-show="date">You selected <b>{{date}}</b>.</alert>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
<!-- date-picker-formats.vue -->
```

## Buttons

Use `today-btn` and `clear-btn` to toggle visible of them.

```html
<template>
  <date-picker v-model="date" :today-btn="false" :clear-btn="false"></date-picker>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
<!-- date-picker-without-buttons.vue -->
```

## Range Limit

Example that limit date range from **2017-01-01** to **2018-01-01**:

```html
<template>
  <date-picker v-model="date" limit-from="2017-01-01" limit-to="2018-01-01"></date-picker>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
<!-- date-picker-range-limit.vue -->
```

## Week Starts

Change the starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).

```html
<template>
  <date-picker v-model="date" :week-starts-with="1"></date-picker>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
<!-- date-picker-week-starts.vue -->
```

## With Dropdown

```html
<template>
  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" v-model="date">
        <div class="input-group-btn">
          <btn class="dropdown-toggle"><i class="glyphicon glyphicon-calendar"></i></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker v-model="date"></date-picker>
        </li>
      </template>
    </dropdown>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    }
  }
</script>
<!-- date-picker-dropdown-example.vue -->
```

# API Reference

## [DatePicker.vue](https://github.com/wxsms/uiv/tree/master/src/components/datepicker/DatePicker.vue)

### Props

Name                 | Type       | Default                           | Required | Description
-------------------- | ---------- | --------------------------------- | -------- | -----------------------
`v-model`            |            |                                   | &#10004; | The selected date.
`width`              | Number     | 270                               |          | The date-picker's width in px.
`today-btn`          | Boolean    | true                              |          | Show / hide the today button.
`clear-btn`          | Boolean    | true                              |          | Show / hide the clear button.
`format`             | String     | yyyy-MM-dd                        |          | The date format.
`close-on-selected`  | Boolean    | true                              |          | Close the date-picker dropdown after date selected.
`limit-from`         |            |                                   |          | Anything that can convert to a valid Date object. E.g. `2017-01-01` or `new Date()`.
`limit-to`           |            |                                   |          | Same as `limit-from`.
`initial-view`       | String     | d                                 |          | Open the date-picker with specify view (one of `d` / `m` / `y`) on initial. Only works if the `v-model` is empty.
`week-starts-with`   | Number     | 0                                 |          | Starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).
`date-parser`        | Function   | Date.parse                        |          | Use this prop to replace the `Date.parse` call inside the component. Useful when The formatted String can not be correctly parsed to Date type by `Date.parse` (e.g. dd-MM-yyyy).
`icon-control-left`  | String     | glyphicon glyphicon-chevron-left  |          | The arrow icon shown inside the `previous` button.
`icon-control-right` | String     | glyphicon glyphicon-chevron-right |          | The arrow icon shown inside the `next` button.
