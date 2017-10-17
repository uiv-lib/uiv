# Alert

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Examples

Wrap any text or HTML in `<alert>` and use one of the four alert types (`success` / `info` / `warning` / `danger`) for basic alert messages.

```html
<alert type="success"><b>Well done!</b> You successfully read this important alert message.</alert>
<alert type="info"><b>Heads up!</b> This alert needs your attention, but it's not super important.</alert>
<alert type="warning"><b>Warning!</b> Better check yourself, you're not looking too good.</alert>
<alert type="danger"><b>Oh snap!</b> Change this and that and try again.</alert>

<!-- Demo Code -->
```

## Dismissible Alerts

* Use `dismissible` to allow user to dismiss alerts.
* Use `duration` to auto dismiss alerts after milliseconds.
* These 2 props can be used in combinations.


```html
<template>
  <section>
    <alert type="warning" v-if="show1" :dismissible="true" @dismissed="show1 = false" id="alert-test"><b>Warning!</b> Better check yourself, you're not looking too good.</alert>
    <alert v-for="(item, index) in alerts"
           :dismissible="item.dismissible"
           :type="item.type"
           :duration="item.duration"
           :key="item.key"
           @dismissed="alerts.splice(index, 1)">
      <span v-if="item.duration">This alert <b>will dismiss after {{item.duration}}ms</b>.</span>
      <span v-else>This alert <b>will not dismiss over time</b>.</span>
    </alert>
    <button type="button" class="btn btn-default" id="add-alert-1" @click="addAlert(false)">Add Alert (Dismiss After 2000ms)</button>
    <button type="button" class="btn btn-default" id="add-alert-2" @click="addAlert(true)">Add Alert (Dismissible)</button>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        show1: true,
        alerts: [],
        duration: 2000
      }
    },
    methods: {
      addAlert (dismissible) {
        this.alerts.push({
          type: 'success', 
          dismissible: dismissible, 
          duration: dismissible ? 0 : this.duration, 
          key: new Date().getTime()
        })
      }
    }
  }
</script>

<!-- Demo Code -->
```

## Use with Collapse

```html
<template>
  <div>
    <button type="button" class="btn btn-default" @click="show2 = !show2">Toggle Collapsing Alert</button>
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

<!-- Demo Code -->
```

# Component Reference

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
      <td>success</td>
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

<script>
  export default {
    data () {
      return {
        alerts: [],
        show1: true,
        show2: true,
        duration: 2000
      }
    },
    methods: {
      addAlert (dismissible) {
        this.alerts.push({
          type: 'success', 
          dismissible: dismissible, 
          duration: dismissible ? 0 : this.duration, 
          key: new Date().getTime()
        })
      }
    }
  }
</script>
