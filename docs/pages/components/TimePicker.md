# TimePicker

> A lightweight & configurable time picker.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

## Example

To change the time input, you can:

* Click on the add / minus button.
* Use up / down key of keyboard.
* Use mouse wheel.
* Input directly.

**Note**: Make sure to update the `v-model` reference when trying to change it from outside the component.

e.g. `time = new Date(time)`

```html
<template>
  <time-picker v-model="time"/>
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

## 24-hour

```html
<template>
  <time-picker v-model="time" :show-meridian="false"/>
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

## Range limit

Example that limit time range from **8:00 AM** to **8:00 PM**:

```html
<template>
  <time-picker v-model="time" :max="max" :min="min"/>
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
  <time-picker v-model="time" readonly/>
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

## With dropdown

```html
<template>
  <form class="form-inline">
    <dropdown class="form-group">
      <div class="input-group">
        <input class="form-control" type="text" :value="this.time.toTimeString()" readonly="readonly">
        <div class="input-group-btn">
          <btn class="dropdown-toggle"><i class="glyphicon glyphicon-time"></i></btn>
        </div>
      </div>
      <template slot="dropdown">
        <li style="padding: 10px">
          <time-picker v-model="time"/>
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

## Custom icons

```html
<template>
  <time-picker v-model="time" icon-control-up="glyphicon glyphicon-plus" icon-control-down="glyphicon glyphicon-minus"/>
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
<!-- time-picker-icons-example.vue -->
```

## Without controls

```html
<template>
  <time-picker v-model="time" :controls="false"/>
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
<!-- time-picker-no-controls-example.vue -->
```

## With custom input width

```html
<template>
  <time-picker v-model="time" :input-width="inputWidth"/>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date(''),
        inputWidth: 180
      }
    }
  }
</script>
<!-- time-picker-input-width-example.vue -->
```

## Empty fields

```html
<template>
  <time-picker v-model="time"/>
</template>
<script>
  export default {
    data () {
      return {
        time: new Date('')
      }
    }
  }
</script>
<!-- time-picker-empty-fields-example.vue -->
```

# API Reference

## [TimePicker](https://github.com/wxsms/uiv/blob/master/src/components/timepicker/TimePicker.vue)

### Props

Name                | Type       | Default                          | Required | Description
------------------- | ---------- | -------------------------------- | -------- | -----------------------
`v-model`           | Date       |                                  | &#10004; | The selected time.
`show-meridian`     | Boolean    | true                             |          | Use 12H or 24H mode.
`hour-step`         | Number     | 1                                |          | Hours to increase or decrease when using a button.
`min-step`          | Number     | 1                                |          | Minutes to increase or decrease when using a button.
`readonly`          | Boolean    | false                            |          |
`max`               | Date       |                                  |          | The maximum time that user can select or input.
`min`               | Date       |                                  |          | The minimum time that user can select or input.
`icon-control-up`   | String     | glyphicon glyphicon-chevron-up   |          | The arrow icon shown inside the `increase` button.
`icon-control-down` | String     | glyphicon glyphicon-chevron-down |          | The arrow icon shown inside the `decrease` button.
`controls`          | Boolean    | true                             |          | Hide the up/down `controls` if set to `false`.
`input-width`       | Number     | 50                               |          | The width in pixels of the `hours` and `minutes` inputs.
