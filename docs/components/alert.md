<script setup>
import Example from '../.vitepress/components/alert/example.vue';
import Dismissible from '../.vitepress/components/alert/dismissible.vue';
import AutoDismissing from '../.vitepress/components/alert/auto-dismissing.vue';
import WithCollapse from '../.vitepress/components/alert/with-collapse.vue';
</script>

# Alert

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Examples

Wrap any text or HTML in `<alert>` and use one of the four alert types (`success` / `info` / `warning` / `danger`) for basic alert messages.

<example/>

<<< @/.vitepress/components/alert/example.vue

## Dismissible

Use `dismissible` to allow user to dismiss alerts.

<dismissible/>

<<< @/.vitepress/components/alert/dismissible.vue

## Auto dismissing

Use `duration` in milliseconds to auto dismiss alert. It can be used together with `dismissible`.

<auto-dismissing/>

<<< @/.vitepress/components/alert/auto-dismissing.vue

## Use with collapse

<with-collapse/>

<<< @/.vitepress/components/alert/with-collapse.vue

## API Reference

### [Alert](https://github.com/uiv-lib/uiv/blob/1.x/src/components/alert/Alert.vue)

#### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`dismissible`    | Boolean    | false    |          | Show dismiss button in alert.
`type`           | String     | info     |          | Alert type (success, info, warning, danger).
`duration`       | Number     | 0        |          | Dismiss after milliseconds, use 0 to prevent self-closing.

#### Slots

Name      | Description
--------- | -----------------------
`default` | The alert body.

#### Events

Name        | Params | Description
----------- | ------ | ---------------
`dismissed` |        | Fire after the alert dismissed. Note: you have to hide / destroy the alert using `v-if` / `v-show` / `v-for` manually due to child components can't change state of parent component.
