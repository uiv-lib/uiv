# DatePicker

> A lightweight & configurable date picker.

## Example

Use `v-model` to bind the selected date.

```html
<template>
  <section>
    <date-picker v-model="date"/>
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
    <date-picker v-model="date" format="yyyy/MMMM/dd"/>
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
  <date-picker v-model="date" :today-btn="false" :clear-btn="false"/>
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

## Range limit

Example that limit date range from **2018-01-01** to **2019-01-01**:

```html
<template>
  <date-picker v-model="date" limit-from="2018-01-01" limit-to="2019-01-01"/>
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

## Week starts

Change the starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).

```html
<template>
  <date-picker v-model="date" :week-starts-with="1"/>
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

## With dropdown

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
          <date-picker v-model="date"/>
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

## Custom date classes

Use `date-config` to apply custom classes to each date button, which should be an Array of:

* `date`: the desired date, can be a `Date` object, `timestamp` or simple String like `2018/01/01`.
* `classes`: the custom classes to bind, anything that can be recognized by `v-bind:class`.

See below example for detail usage:

```html
<template>
  <date-picker v-model="date" :date-config="config"/>
</template>
<script>
  export default {
    data () {
      const today = new Date()
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      return {
        date: null,
        config: [
          {date: yesterday, classes: 'btn-yesterday'},
          {date: tomorrow, classes: 'btn-tomorrow'}
        ]
      }
    }
  }
</script>
<style>
 .btn-yesterday.btn-default {background-color: #ccc}
 .btn-tomorrow.btn-default {background-color: #28b684}
</style>
<!-- date-picker-custom-date-classes.vue -->
```

## Custom icons

```html
<template>
  <section>
    <date-picker icon-control-left="glyphicon glyphicon-triangle-left" icon-control-right="glyphicon glyphicon-triangle-right"/>
  </section>
</template>
<!-- date-picker-icons-example.vue -->
```


# API Reference

## [DatePicker](https://github.com/wxsms/uiv/blob/master/src/components/datepicker/DatePicker.vue)

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
`date-config`        | Array      |                                   |          | The config array for each date. See above example section for details.
`icon-control-left`  | String     | glyphicon glyphicon-chevron-left  |          | The arrow icon shown inside the `previous` button.
`icon-control-right` | String     | glyphicon glyphicon-chevron-right |          | The arrow icon shown inside the `next` button.
