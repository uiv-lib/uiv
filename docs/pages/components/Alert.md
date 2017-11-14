# Alert

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Examples

Wrap any text or HTML in `<alert>` and use one of the four alert types (`success` / `info` / `warning` / `danger`) for basic alert messages.

```html
<alert type="success"><b>Well done!</b> You successfully read this important alert message.</alert>
<alert type="info"><b>Heads up!</b> This alert needs your attention, but it's not super important.</alert>
<alert type="warning"><b>Warning!</b> Better check yourself, you're not looking too good.</alert>
<alert type="danger"><b>Oh snap!</b> Change this and that and try again.</alert>
<!-- alert-examples.vue -->
```

## Dismissible

Use `dismissible` to allow user to dismiss alerts.

```html
<template>
  <section>
    <alert type="warning" v-if="show" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
    <alert v-for="(item, index) in alerts" dismissible :key="item.key" @dismissed="alerts.splice(index, 1)">
      <b>Heads up!</b> This alert needs your attention, but it's not super important.
    </alert>
    <hr/>
    <btn type="primary" @click="addDismissibleAlert()">Add Dismissible Alert</btn>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        show: true,
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
<!-- alert-dismissible.vue -->
```

## Auto Dismissing

Use `duration` in milliseconds to auto dismiss alert. It can be used together with `dismissible`.

```html
<template>
  <section>
    <alert v-for="(item, index) in alerts" :duration="duration" :key="item.key" @dismissed="alerts.splice(index, 1)">
      This alert <b>will dismiss after {{duration}}ms</b>.
    </alert>
    <hr/>
    <btn type="primary" @click="addAutoDismissAlert()">Add Auto Dismiss Alert</btn>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        alerts: [],
        duration: 2000
      }
    },
    methods: {
      addAutoDismissAlert () {
        this.alerts.push({key: new Date().getTime()})
      }
    }
  }
</script>
<!-- alert-auto-dismissing.vue -->
```

## Use with Collapse

```html
<template>
  <section>
    <btn type="primary" @click="show = !show">Toggle Collapsing Alert</btn>
    <hr/>
    <collapse v-model="show">
      <alert type="warning" dismissible @dismissed="show = false">This alert <b>will collapse on open / close</b>.</alert>
    </collapse>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        show: true
      }
    }
  }
</script>
<!-- alert-with-collapse.vue -->
```

# API Reference

## [Alert.vue](https://github.com/wxsms/uiv/tree/master/src/components/alert/Alert.vue)

### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`dismissible`    | Boolean    | false    |          | Show dismiss button in alert.
`type`           | String     | info     |          | Alert type (success, info, warning, danger).
`duration`       | Number     | 0        |          | Dismiss after milliseconds, use 0 to prevent self-closing.

### Slots

Name      | Description
--------- | -----------------------
`default` | The alert body.

### Events

Name        | Params | Description
----------- | ------ | ---------------
`dismissed` |        | Fire after the alert dismissed. Note: you have to hide / destroy the alert using `v-if` / `v-show` / `v-for` manually due to child components can't change state of parent component.
