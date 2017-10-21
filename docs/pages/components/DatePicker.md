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

<!-- Live demo -->
```

## With Dropdown

```html
<template>
  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" v-model="date2">
        <div class="input-group-btn">
          <button class="btn btn-default" type="button" data-role="trigger">
            <i class="glyphicon glyphicon-calendar"></i>
          </button>
        </div>
      </div>
      <template slot="dropdown">
        <li>
          <date-picker id="date-picker-2" v-model="date2"></date-picker>
        </li>
      </template>
    </dropdown>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        date2: ''
      }
    }
  }
</script>

<!-- Live demo -->
```

# API Reference

## [DatePicker.vue](https://github.com/wxsms/uiv/tree/master/src/components/datepicker/DatePicker.vue)

<div class="table-responsive">
  <table class="table table-bordered">
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
      <td>The selected date</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>width</code></td>
      <td>Number</td>
      <td>270</td>
      <td></td>
      <td>The date-picker's width in px</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>today-btn</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Show / hide the today button.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>clear-btn</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Show / hide the clear button.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>format</code></td>
      <td>String</td>
      <td>yyyy-MM-dd</td>
      <td></td>
      <td>The date format</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>close-on-selected</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Close the date-picker dropdown after date selected</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>limit-from</code></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Anything that can convert to a valid Date object. E.g. '2017-01-01' or 'new Date()'</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>limit-to</code></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Same as limit-from</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>initial-view</code></td>
      <td>String</td>
      <td>d</td>
      <td></td>
      <td>Open the date-picker with specify view (one of d / m / y) on initial. Only works if the v-model is empty.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>week-starts-with</code></td>
      <td>Number</td>
      <td>0</td>
      <td></td>
      <td>Starting day of the week. Support 0 (Sunday) ~ 6 (Saturday).</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>date-parser</code></td>
      <td>Function</td>
      <td>Date.parse</td>
      <td></td>
      <td>
        <p>Use this prop to replace the <code>Date.parse</code> call inside the component.
          Useful when The formatted String can not be correctly parsed to Date type by <code>Date.parse</code>
          (e.g. dd-MM-yyyy).</p>
      </td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
    data () {
      return {
        date: '',
        date2: '',
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
-->
