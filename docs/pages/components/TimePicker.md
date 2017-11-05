# Time Picker

> A lightweight & configurable time picker.

## Example

To change the time input, you can:

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

## 24-Hour

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

## With Dropdown

```html
<template>
  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" :value="this.time.toTimeString()" readonly="readonly">
        <div class="input-group-btn">
          <button class="btn btn-default dropdown-toggle" type="button"><i class="glyphicon glyphicon-time"></i></button>
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

### Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`v-model`        | Date       |              | &#10004; | The selected time.
`show-meridian`  | Boolean    | true         |          | Use 12H or 24H mode.
`hour-step`      | Number     | 1            |          | Hours to increase or decrease when using a button.
`min-step`       | Number     | 1            |          | Minutes to increase or decrease when using a button.
`readonly`       | Boolean    | false        |          | 
`max`            | Date       |              |          | The maximum time that user can select or input.
`min`            | Date       |              |          | The minimum time that user can select or input.
