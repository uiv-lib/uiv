# Alert

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Examples

Wrap any text or HTML in `<alert>` and use one of the four alert types (`success` / `info` / `warning` / `danger`) for basic alert messages.

```html
<alert type="success"><b>Well done!</b> You successfully read this important alert message.</alert>
<alert type="info"><b>Heads up!</b> This alert needs your attention, but it's not super important.</alert>
<alert type="warning"><b>Warning!</b> Better check yourself, you're not looking too good.</alert>
<alert type="danger"><b>Oh snap!</b> Change this and that and try again.</alert>

<!-- Live demo -->
```

## Dismissible

Use `dismissible` to allow user to dismiss alerts.

```html
<template>
  <section>
    <alert type="warning" v-if="show1" :dismissible="true" @dismissed="show1 = false" id="alert-test">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
    <alert v-for="(item, index) in alerts" :dismissible="true" :key="item.key" @dismissed="alerts.splice(index, 1)">
      <b>Heads up!</b> This alert needs your attention, but it's not super important.
    </alert>
    <hr/>
    <button type="button" class="btn btn-primary" id="add-alert-1" @click="addDismissibleAlert()">Add Dismissible Alert</button>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        show1: true,
        alerts: []
      }
    },
    methods: {
      addDismissibleAlert () {
        this.alerts.push({key: new Date().getTime()})
      }
    }
  }
</script>

<!-- Live demo -->
```

## Auto Dismissing

Use `duration` in milliseconds to auto dismiss alert.

```html
<template>
  <section>
    <alert v-for="(item, index) in alerts2" :duration="duration" :key="item.key" @dismissed="alerts2.splice(index, 1)">
      This alert <b>will dismiss after {{duration}}ms</b>.
    </alert>
    <hr/>
    <button type="button" class="btn btn-primary" id="add-alert-2" @click="addAutoDismissAlert()">Add Auto Dismiss Alert</button>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        alerts2: [],
        duration: 2000
      }
    },
    methods: {
      addAutoDismissAlert () {
        this.alerts2.push({key: new Date().getTime()})
      }
    }
  }
</script>

<!-- Live demo -->
```

## Use with Collapse

```html
<template>
  <div>
    <button type="button" class="btn btn-primary" @click="show2 = !show2">Toggle Collapsing Alert</button>
  </div>
  <br/>
  <collapse v-model="show2">
    <alert type="warning" :dismissible="true" @dismissed="show2 = false">This alert <b>will collapse on open / close</b>.</alert>
  </collapse>
</template>

<script>
  export default {
    data () {
      return {
        show2: true
      }
    }
  }
</script>

<!-- Live demo -->
```

# API Reference

## [Alert.vue](https://github.com/wxsms/uiv/tree/master/src/components/alert/Alert.vue)

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
      <td nowrap="nowrap"><code>dismissible</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Show dismiss button in alert.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>type</code></td>
      <td>String</td>
      <td>info</td>
      <td></td>
      <td>Alert type (success, info, warning, danger).</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>duration</code></td>
      <td>Number</td>
      <td>0</td>
      <td></td>
      <td>Dismiss after milliseconds, use 0 to prevent self-closing.</td>
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
      <td colspan="4">The alert body.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Events</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>dismissed</code></td>
      <td></td>
      <td colspan="3">
        Fire after the alert dismissed. Note: you have to hide / destroy the alert using <code>v-if</code>
        / <code>v-show</code> / <code>v-for</code>
        manually due to child components can't change state of parent component.
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
        alerts: [],
        alerts2: [],
        show1: true,
        show2: true,
        duration: 2000
      }
    },
    methods: {
      addDismissibleAlert () {
        this.alerts.push({key: new Date().getTime()})
      },
      addAutoDismissAlert () {
        this.alerts2.push({key: new Date().getTime()})
      }
    }
  }
</script>
-->
