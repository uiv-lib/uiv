# Progress Bar

> Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.

## Example

Default progress bar.

```html
<template>
  <progress-bar v-model="progress"/>
</template>
<script>
  export default {
    data () {
      return {
        progress: 66
      }
    }
  }
</script>
<!-- progress-bar-example.vue -->
```

## With Label

To ensure that the label text remains legible even for low percentages, consider use `min-width` prop.

```html
<template>
  <section>
    <h4>Default Label</h4>
    <progress-bar v-model="progress" label/>
    <h4>Custom Label</h4>
    <progress-bar v-model="progress" label label-text="Loading......Please wait."/>
    <h4>Minimum Width</h4>
    <progress-bar v-model="progress1" min-width label/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        progress1: 1,
        progress: 66
      }
    }
  }
</script>
<!-- progress-bar-with-label.vue -->
```

## Contextual Alternatives

Progress bars use some of the same button and alert classes for consistent styles.

```html
<template>
  <section>
    <progress-bar v-model="progress40" type="success"/>
    <progress-bar v-model="progress20" type="info"/>
    <progress-bar v-model="progress60" type="warning"/>
    <progress-bar v-model="progress80" type="danger"/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        progress20: 20,
        progress40: 40,
        progress60: 60,
        progress80: 80
      }
    }
  }
</script>
<!-- progress-bar-contextual-alternatives.vue -->
```

## Striped

Uses a gradient to create a striped effect. Not available in IE9 and below.

```html
<template>
  <section>
    <progress-bar v-model="progress40" type="success" striped/>
    <progress-bar v-model="progress20" type="info" striped/>
    <progress-bar v-model="progress60" type="warning" striped/>
    <progress-bar v-model="progress80" type="danger" striped/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        progress20: 20,
        progress40: 40,
        progress60: 60,
        progress80: 80
      }
    }
  }
</script>
<!-- progress-bar-striped.vue -->
```

## Animated

Animate the stripes right to left. Not available in IE9 and below.

```html
<template>
  <progress-bar v-model="progress" striped active/>
</template>
<script>
  export default {
    data () {
      return {
        progress: 40
      }
    }
  }
</script>
<!-- progress-bar-animated.vue -->
```

## Stacked

Place multiple `<progress-bar-stack>` into the same `<progress-bar>` to stack them.

```html
<template>
  <progress-bar>
    <progress-bar-stack v-model="progress35" type="success"/>
    <progress-bar-stack v-model="progress20" type="warning" striped/>
    <progress-bar-stack v-model="progress10" type="danger"/>
  </progress-bar>
</template>
<script>
  export default {
    data () {
      return {
        progress20: 20,
        progress35: 35,
        progress10: 10
      }
    }
  }
</script>
<!-- progress-bar-stacked.vue -->
```

# API Reference

## [ProgressBar.vue](https://github.com/wxsms/uiv/tree/master/src/components/progressbar/ProgressBar.vue)

`ProgressBar.vue` and `ProgressBarStack.vue` share same prop attributes.

### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`v-model`        | Number     |          | &#10004; | Current progress (0 ~ 100).
`label`          | Boolean    | false    |          | Show label on progress bar.
`label-text`     | String     |          |          | Custom label text.
`min-width`      | Boolean    | false    |          | Apply a minimum width to the progress bar, useful when showing label and small current value.
`type`           | String     |          |          | Progress bar type, support success / info / warning / danger. Or you can add custom types.
`striped`        | Boolean    | false    |          | Apply striped style.
`active`         | Boolean    | false    |          | Apply active to striped style.

### Slots

Name      | Description
--------- | -----------------------
`default` | Use this slot if need stacked progress bar, see example in the code panel above.
