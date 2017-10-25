# Time Picker

> A lightweight & configurable time picker.

## Example

You can:

* Click on the add / minus button.
* Use mouse wheel.
* Input directly.

**Note**: Make sure to update the `v-model` reference when trying to change it from outside the component.

e.g. `time = new Date(time)`

```html
<template>
  <time-picker v-model="time"></time-picker>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date()
      }
    }
  }
</script>
<!-- time-picker-example.vue -->
```

## In 24-Hour

```html
<template>
  <time-picker v-model="time" :show-meridian="false"></time-picker>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date()
      }
    }
  }
</script>
<!-- time-picker-24-example.vue -->
```

## Readonly

All input methods are all disabled in readonly mode.

```html
<template>
  <time-picker v-model="time" readonly></time-picker>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date()
      }
    }
  }
</script>
<!-- time-picker-readonly-example.vue -->
```

## Range Limit

Example that limit time range from **8:00 AM** to **8:00 PM**:

```html
<template>
  <time-picker v-model="time" :max="max" :min="min"></time-picker>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date(),
        min: new Date('2017/01/01 8:00'), // date doesn't matter
        max: new Date('2017/01/01 20:00')
      }
    }
  }
</script>
<!-- time-picker-limit-example.vue -->
```

## With Dropdown

```html
<template>
  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" :value="this.time.toTimeString()" readonly="readonly">
        <div class="input-group-btn">
          <button class="btn btn-default" type="button" data-role="trigger">
            <i class="glyphicon glyphicon-time"></i>
          </button>
        </div>
      </div>
      <template slot="dropdown">
        <li style="padding: 10px">
          <time-picker v-model="time"></time-picker>
        </li>
      </template>
    </dropdown>
  </form>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date()
      }
    }
  }
</script>
<!-- time-picker-with-dropdown.vue -->
```


# API Reference

## [TimePicker.vue](https://github.com/wxsms/uiv/tree/master/src/components/timepicker/TimePicker.vue)

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
      <td>Date</td>
      <td></td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>The selected time.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>show-meridian</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Whether to display 12H or 24H mode.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hour-step</code></td>
      <td>Number</td>
      <td>1</td>
      <td></td>
      <td>Number of hours to increase or decrease when using a button.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>min-step</code></td>
      <td>Number</td>
      <td>1</td>
      <td></td>
      <td>Number of minutes to increase or decrease when using a button.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>readonly</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>
        Whether user can change value by typing inside the hours &amp; minutes input or arrow buttons.
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>max</code></td>
      <td>Date</td>
      <td></td>
      <td></td>
      <td>The maximum time that user can select or input.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>min</code></td>
      <td>Date</td>
      <td></td>
      <td></td>
      <td>The minimum time that user can select or input.</td>
    </tr>
    </tbody>
  </table>
</div>
