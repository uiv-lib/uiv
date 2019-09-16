# DatePicker

> A lightweight & configurable date picker.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

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

## Week numbers

```html
<template>
  <section>
    <date-picker v-model="date" week-numbers/>
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
<!-- date-picker-week-numbers.vue -->
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

Use `date-class` to apply custom classes to each date button, which should be an function that:

* takes the date of button as the first param.
* (0.33.0+) also with current month and year showing of the picker in the second param.
* returns the class(es).

See below example for detail usage, which has all sunday highlighted:

```html
<template>
  <date-picker v-model="date" :date-class="dateClass"/>
</template>
<script>
  export default {
    data () {
      return {
        date: null
      }
    },
    methods: {
      dateClass (date) {
        return date.getDay() === 0 ? 'btn-sunday' : ''
      }
    }
  }
</script>
<style>
 .btn-sunday.btn-default {background-color: #ccc}
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

## Custom locale

Pass a locale object to `locale` for custom translations of month and weekday names, `clear-btn` and `today-btn` texts.

```html
<template>
  <section>
    <date-picker :locale="localeHU" />
  </section>
</template>
<script>
  import localeHU from '../../../src/locale/lang/hu-HU'
  export default {
    data () {
      return {
        localeHU
      }
    }
  }
</script>
<!-- date-picker-locale.vue -->
```


# API Reference

## [DatePicker](https://github.com/wxsms/uiv/blob/master/src/components/datepicker/DatePicker.vue)

### Props

Name                   | Type       | Default                           | Required | Description
--------------------   | ---------- | --------------------------------- | -------- | -----------------------
`v-model`              |            |                                   | &#10004; | The selected date.
`width`                | Number     | 270                               |          | The date-picker's width in px.
`today-btn`            | Boolean    | true                              |          | Show / hide the today button.
`clear-btn`            | Boolean    | true                              |          | Show / hide the clear button.
`format`               | String     | yyyy-MM-dd                        |          | The date format, will emit Date object if provided as empty string.
`close-on-selected`    | Boolean    | true                              |          | Close the date-picker dropdown after date selected.
`limit-from`           |            |                                   |          | Anything that can convert to a valid Date object. E.g. `2017-01-01` or `new Date()`.
`limit-to`             |            |                                   |          | Same as `limit-from`.
`initial-view`         | String     | d                                 |          | Open the date-picker with specify view (one of `d` / `m` / `y`) on initial. Only works if the `v-model` is empty.
`week-starts-with`     | Number     | 0                                 |          | Starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).
`week-numbers`         | Boolean    | false                             |          | Show week numbers of year.
`date-parser`          | Function   | Date.parse                        |          | Use this prop to replace the `Date.parse` call inside the component. Useful when The formatted String can not be correctly parsed to Date type by `Date.parse` (e.g. dd-MM-yyyy). For example: `dateParser (value) {return moment(value, 'DD-MM-YYYY').toDate().getTime()}`
`date-class`           | Function   |                                   |          | The custom class callback function for each date. See above example section for details.
`year-month-formatter` | Function   |                                   |          | The formatter function of year month label string on top of date view, with 2 params `year` and `month` (0-based), with the formatted string returned.
`icon-control-left`    | String     | glyphicon glyphicon-chevron-left  |          | The arrow icon shown inside the `previous` button.
`icon-control-right`   | String     | glyphicon glyphicon-chevron-right |          | The arrow icon shown inside the `next` button.
`locale`               | Object     |                                   |          | (0.24.0+) The locale used for translating month and weekday names, clear-btn and today-btn texts.
