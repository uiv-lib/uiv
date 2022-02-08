# Alert

> Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Examples

Wrap any text or HTML in `<alert>` and use one of the four alert types (`success` / `info` / `warning` / `danger`) for basic alert messages.

<ClientOnly><alert-example/></ClientOnly>

<<< @/.vitepress/components/alert/example.vue

## Dismissible

Use `dismissible` to allow user to dismiss alerts.

<ClientOnly><alert-dismissible/></ClientOnly>

<<< @/.vitepress/components/alert/dismissible.vue

## Auto dismissing

Use `duration` in milliseconds to auto dismiss alert. It can be used together with `dismissible`.

<ClientOnly><alert-auto-dismissing/></ClientOnly>

<<< @/.vitepress/components/alert/auto-dismissing.vue

## Use with collapse

<ClientOnly><alert-with-collapse/></ClientOnly>

<<< @/.vitepress/components/alert/with-collapse.vue

## API Reference

### [Alert](https://github.com/uiv-lib/uiv/blob/1.x/src/components/alert/Alert.vue)

#### Props

| Name          | Type    | Default | Required | Description                                                |
|---------------|---------|---------|----------|------------------------------------------------------------|
| `dismissible` | Boolean | false   |          | Show dismiss button in alert.                              |
| `type`        | String  | info    |          | Alert type (success, info, warning, danger).               |
| `duration`    | Number  | 0       |          | Dismiss after milliseconds, use 0 to prevent self-closing. |

#### Slots

| Name      | Description     |
|-----------|-----------------|
| `default` | The alert body. |

#### Events

| Name        | Params | Description                                                                                                                                                                           |
|-------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dismissed` |        | Fire after the alert dismissed. Note: you have to hide / destroy the alert using `v-if` / `v-show` / `v-for` manually due to child components can't change state of parent component. |
