# TimePicker

> A lightweight & configurable time picker.

## Example

To change the time input, you can:

* Click on the add / minus button.
* Use up / down key of keyboard.
* Use mouse wheel.
* Input directly.

::: tip
Make sure to update the `v-model` reference when trying to change it from outside the component.
:::

e.g. `time = new Date(time)`

<ClientOnly><time-picker-example/></ClientOnly>

<<< @/.vitepress/components/time-picker/example.vue

## 24-hour

<ClientOnly><time-picker-example-24/></ClientOnly>

<<< @/.vitepress/components/time-picker/example-24.vue

## Range limit

Example that limit time range from **8:00 AM** to **8:00 PM**:

<ClientOnly><time-picker-limit/></ClientOnly>

<<< @/.vitepress/components/time-picker/limit.vue

## Readonly

All input methods are all disabled in readonly mode.

<ClientOnly><time-picker-readonly/></ClientOnly>

<<< @/.vitepress/components/time-picker/readonly.vue

## With dropdown

<br/>

<ClientOnly><time-picker-with-dropdown/></ClientOnly>

<<< @/.vitepress/components/time-picker/with-dropdown.vue

## Without controls

<ClientOnly><time-picker-no-controls/></ClientOnly>

<<< @/.vitepress/components/time-picker/no-controls.vue

## API Reference

### [TimePicker](https://github.com/uiv-lib/uiv/blob/1.x/src/components/timepicker/TimePicker.vue)

#### Props

| Name                | Type    | Default                          | Required | Description                                              |
|---------------------|---------|----------------------------------|----------|----------------------------------------------------------|
| `v-model`           | Date    |                                  | &#10004; | The selected time.                                       |
| `show-meridian`     | Boolean | true                             |          | Use 12H or 24H mode.                                     |
| `hour-step`         | Number  | 1                                |          | Hours to increase or decrease when using a button.       |
| `min-step`          | Number  | 1                                |          | Minutes to increase or decrease when using a button.     |
| `readonly`          | Boolean | false                            |          |                                                          |
| `max`               | Date    |                                  |          | The maximum time that user can select or input.          |
| `min`               | Date    |                                  |          | The minimum time that user can select or input.          |
| `icon-control-up`   | String  | glyphicon glyphicon-chevron-up   |          | The arrow icon shown inside the `increase` button.       |
| `icon-control-down` | String  | glyphicon glyphicon-chevron-down |          | The arrow icon shown inside the `decrease` button.       |
| `controls`          | Boolean | true                             |          | Hide the up/down `controls` if set to `false`.           |
| `input-width`       | Number  | 50                               |          | The width in pixels of the `hours` and `minutes` inputs. |
