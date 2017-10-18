# Progress Bar

> Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.

## Example

Default progress bar.

```html
<template>
  <progress-bar v-model="progress66"></progress-bar>
</template>

<script>
  export default {
    data () {
      return {
        progress66: 66
      }
    }
  }
</script>

<!-- Live demo -->
```

## With Label

To ensure that the label text remains legible even for low percentages, consider use `min-width` prop.

```html
<template>
  <h4>Default Label</h4>
  <progress-bar v-model="progress66" :label="true"></progress-bar>
  <h4>Custom Label</h4>
  <progress-bar v-model="progress66" :label="true" label-text="Loading......Please wait."></progress-bar>
  <h4>Minimum Width</h4>
  <progress-bar v-model="progress1" :min-width="true" :label="true"></progress-bar>
</template>

<script>
  export default {
    data () {
      return {
        progress1: 1,
        progress66: 66
      }
    }
  }
</script>

<!-- Live demo -->
```

## Contextual Alternatives

Progress bars use some of the same button and alert classes for consistent styles.

```html
<template>
  <progress-bar v-model="progress40" type="success"></progress-bar>
  <progress-bar v-model="progress20" type="info"></progress-bar>
  <progress-bar v-model="progress60" type="warning"></progress-bar>
  <progress-bar v-model="progress80" type="danger"></progress-bar>
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
<!-- Live demo -->
```

## Striped

Uses a gradient to create a striped effect. Not available in IE9 and below.

```html
<template>
  <progress-bar v-model="progress40" type="success" :striped="true"></progress-bar>
  <progress-bar v-model="progress20" type="info" :striped="true"></progress-bar>
  <progress-bar v-model="progress60" type="warning" :striped="true"></progress-bar>
  <progress-bar v-model="progress80" type="danger" :striped="true"></progress-bar>
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
<!-- Live demo -->
```

## Animated

Animate the stripes right to left. Not available in IE9 and below.

```html
<template>
  <progress-bar v-model="progress40" :striped="true" :active="true"></progress-bar>
</template>

<script>
  export default {
    data () {
      return {
        progress40: 40
      }
    }
  }
</script>
<!-- Live demo -->
```

## Stacked

Place multiple `<progress-bar-stack>` into the same `<progress-bar>` to stack them.

```html
<template>
  <progress-bar>
    <progress-bar-stack v-model="progress35" type="success"></progress-bar-stack>
    <progress-bar-stack v-model="progress20" type="warning" :striped="true"></progress-bar-stack>
    <progress-bar-stack v-model="progress10" type="danger"></progress-bar-stack>
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
<!-- Live demo -->
```

# API Reference

## [ProgressBar.vue](https://github.com/wxsms/uiv/tree/master/src/components/progressbar/ProgressBar.vue)

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Note</span></td>
    </tr>
    <tr>
      <td colspan="5"><code>ProgressBar.vue</code> and <code>ProgressBarStack.vue</code> share same prop attributes.
      </td>
    </tr>
    </tbody>
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
      <td>Number</td>
      <td></td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>Current progress (0 ~ 100).</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>label</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Show label on progress bar.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>label-text</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>Custom label text.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>min-width</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Apply a minimum width to the progress bar, useful when showing label and small current value.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>type</code></td>
      <td>String</td>
      <td></td>
      <td></td>
      <td>Progress bar type, support success / info / warning / danger. Or you can add custom types.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>striped</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Apply striped style.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>active</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Apply active to striped style.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Slots</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th colspan="4">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">Use this slot if need stacked progress bar, see example in the code panel below.</td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
    data () {
      return {
        progress1: 1,
        progress66: 66,
        progress20: 20,
        progress40: 40,
        progress60: 60,
        progress80: 80,
        progress35: 35,
        progress10: 10
      }
    }
  }
</script>
-->
