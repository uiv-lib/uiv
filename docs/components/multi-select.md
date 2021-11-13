# MultiSelect

## Example

Use `v-model` to bind selected values, and `options` as select options.

<multi-select-example/>

<<< @/.vitepress/components/multi-select/example.vue

## Multiple Limit

Use `limit` to restrict the maximum number of options user can select, no limit when set to `0`.

<multi-select-limit/>

<<< @/.vitepress/components/multi-select/limit.vue

## Optional Sizes

Optional sizes `sm` and `lg` are supported. You can also add `block` prop to quickly apply `width: 100%` style to the component.

<multi-select-sizes/>

<<< @/.vitepress/components/multi-select/sizes.vue

## Disabled options

Add `disabled: true` to an option to make it unselectable.

<multi-select-disabled-options/>

<<< @/.vitepress/components/multi-select/disabled-options.vue

## Disabled select

Add `disabled` to `<multi-select>` to disable the dropdown and click events.

<multi-select-disabled-select/>

<<< @/.vitepress/components/multi-select/disabled-select.vue

## Collapse selected

Collapse multiple selected items into a text by using `collapse-selected` prop.

<multi-select-collapse-selected/>

<<< @/.vitepress/components/multi-select/collapse-selected.vue

## Option groups

If you need grouped options, simply add `group` (String) as the name to them.

<multi-select-option-groups/>

<<< @/.vitepress/components/multi-select/option-groups.vue

## Filterable

Add `filterable` to append filter input before options.

By default, options are filtered by item value and label (case ignored), use a custom `filter-function` to override it if needed.

<multi-select-filterable/>

<<< @/.vitepress/components/multi-select/filterable.vue

## API Reference

### [MultiSelect](https://github.com/uiv-lib/uiv/blob/1.x/src/components/select/MultiSelect.vue)

#### Props

Name                    | Type       | Default                | Required | Description
----------------        | ---------- | ---------------------- | -------- | -----------------------
`v-model`               | Array      |                        | &#10004; | The selected values.
`options`               | Array      |                        | &#10004; | The select options.
`label-key`             | String     | label                  |          | Identity key name for label.
`value-key`             | String     | value                  |          | Identity key name for value.
`limit`                 | Boolean    | 0                      |          | Maximum number of options user can select, no limit when set to `0`.
`size`                  | String     |                        |          | Optional sizes, supported: `sm` / `lg`.
`block`                 | Boolean    | false                  |          | Apply block level style.
`placeholder`           | String     | Select...              |          | The default text displayed when no options are selected.
`split`                 | String     | ,                      |          | The options display spliter.
`filterable`            | Boolean    | false                  |          | Append filter input before options (default is filter by item value and label, case ignored).
`filter-placeholder`    | String     | Search...              |          | The default text displayed in filter input.
`filter-auto-focus`     | Boolean    | true                   |          | Auto focus on filter input.
`filter-function`       | Function   |                        |          | Custom filter function, with one param as input string, and returns the filtered array.
`disabled`              | Boolean    | false                  |          | Disable the select component.
`collapse-selected`     | Boolean    | false                  |          | Collapse multiple selected items into a text.
`append-to-body`        | Boolean    | false                  |          | Append the dropdown to `body`.
`selected-icon`         | String     | glyphicon glyphicon-ok |          | Icon displayed in option while selected.
`item-selected-class`   | String     |                        |          | The class applied to the selected list item.

#### Events

Name             | Params                            | Description
-----------      | ------                            | ---------------
`change`         | value                             | Triggers when the selected value changes.
`visible-change` | the visible status (true / false) | Triggers when the dropdown toggles.
`limit-exceed`   |                                   | Triggers when the selected value length exceeded limit.
`focus`          | event                             | Triggers when input focuses.
`blur`           | event                             | Triggers when input blurs.

#### Slots

Name      | Description
--------- | -----------------------
`option`  | The option scoped slot, with `item` prop.
