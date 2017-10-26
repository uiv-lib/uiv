# Date Picker

> A lightweight & configurable date picker.

## Inline Example

Use `v-model` to bind the selected date.

```html
<template>
  <date-picker id="date-picker-1"
               v-model="date"
               :today-btn="todayBtn"
               :clear-btn="clearBtn"
               :limit-from="limitFrom"
               :format="format"
               :week-starts-with="weekStartsWith"
               :limit-to="limitTo"></date-picker>
  <br/>
  <alert type="info" v-show="date">You selected <b>{{date}}</b>.</alert>
  <hr/>
  <h4>Settings</h4>
  <form class="form-horizontal">
    <div class="form-group">
      <div class="col-xs-12">
        <label class="checkbox-inline"><input type="checkbox" v-model="todayBtn">Today Button</label>
        <label class="checkbox-inline"><input type="checkbox" v-model="clearBtn">Clear Button</label>
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-6">
        <label>Limit From</label>
        <input type="text" class="form-control" v-model="limitFrom" placeholder="E.g. 2017-03-01">
      </div>
      <div class="col-md-6">
        <label>Limit To</label>
        <input type="text" class="form-control" v-model="limitTo" placeholder="E.g. 2017-03-31">
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-6">
        <label>Format</label>
        <select class="form-control" v-model="format">
          <option>yyyy-M-d</option>
          <option>yyyy-MM-dd</option>
          <option>yyyy-MMM-dd</option>
          <option>yyyy-MMMM-dd</option>
          <option>yyyy/MM/dd</option>
          <option>MM/dd/yyyy</option>
          <option>yyyy,MM,dd</option>
        </select>
        <p class="help-block">* Some browser (e.g. IE) might not support all of these formats.</p>
      </div>
      <div class="col-md-6">
        <label>Week Starts With</label>
        <select class="form-control" v-model="weekStartsWith">
          <option v-for="day in 7" :value="day - 1">{{ day - 1 }}</option>
        </select>
      </div>
    </div>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        date: '',
        show: false,
        clearBtn: true,
        todayBtn: true,
        closeOnSelected: true,
        limitFrom: '',
        limitTo: '',
        format: 'yyyy-MM-dd',
        weekStartsWith: 0
      }
    }
  }
</script>
<!-- date-picker-inline-example.vue -->
```

## With Dropdown

```html
<template>
  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" v-model="date">
        <div class="input-group-btn">
          <button class="btn btn-default" type="button" data-role="trigger">
            <i class="glyphicon glyphicon-calendar"></i>
          </button>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker id="date-picker-2" v-model="date"></date-picker>
        </li>
      </template>
    </dropdown>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        date: ''
      }
    }
  }
</script>
<!-- date-picker-dropdown-example.vue -->
```

# API Reference

## [DatePicker.vue](https://github.com/wxsms/uiv/tree/master/src/components/datepicker/DatePicker.vue)

### Props

Name                | Type       | Default    | Required | Description
----------------    | ---------- | --------   | -------- | -----------------------
`v-model`           |            |            | &#10004; | The selected date.
`width`             | Number     | 270        |          | The date-picker's width in px.
`today-btn`         | Boolean    | true       |          | Show / hide the today button.
`clear-btn`         | Boolean    | true       |          | Show / hide the clear button.
`format`            | String     | yyyy-MM-dd |          | The date format.
`close-on-selected` | Boolean    | true       |          | Close the date-picker dropdown after date selected.
`limit-from`        |            |            |          | Anything that can convert to a valid Date object. E.g. `2017-01-01` or `new Date()`.
`limit-to`          |            |            |          | Same as `limit-from`.
`initial-view`      | String     | d          |          | Open the date-picker with specify view (one of `d` / `m` / `y`) on initial. Only works if the `v-model` is empty.
`week-starts-with`  | Number     | 0          |          | Starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).
`date-parser`       | Function   | Date.parse |          | Use this prop to replace the `Date.parse` call inside the component. Useful when The formatted String can not be correctly parsed to Date type by `Date.parse` (e.g. dd-MM-yyyy).
