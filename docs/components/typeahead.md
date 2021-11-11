# Typeahead

> A basic, easily extended component for quickly creating elegant typeaheads with any form text input.

## Example

Use `v-model` to bind the input value, and `target` to point to the ideal input element.

If you want to clear the `v-model` of typeahead, simply set it to `null`, the corresponding input value will also be cleared.

<typeahead-example/>

<<< @/.vitepress/components/typeahead/example.vue

## Target

A `target` can be:

* Selector that can be recognized by `querySelect`.
* Reference to Element.
* Reference to Component.

::: tip
If you use a component reference, the corresponding component's root element must be an input element.
:::

An example using element reference target:

<typeahead-target/>

<<< @/.vitepress/components/typeahead/target.vue

## Match start

Match from the head of item.

::: tip
Only work in local data query mode.
:::

<typeahead-match-start/>

<<< @/.vitepress/components/typeahead/match-start.vue

## Force select

Force user to select from the options or the model will be empty.

<typeahead-force-select/>

<<< @/.vitepress/components/typeahead/force-select.vue

## Async query

You can simply use `async-src` to perform an AJAX query with built-in query function, or `async-function` for a custom one if you need more than that.

::: tip
`ignore-case` and `match-start` won't work in async query mode.
:::

An example using `async-src`:

<typeahead-async-query/>

<<< @/.vitepress/components/typeahead/async-query.vue

## Custom template

Use the `item` scoped slot to override the typeahead item's template.

* Use `slot-scope="props"` in Vue 2.5+, otherwise `scope="props"`.
* The items list will be `props.items`.
* The current active item index will be `props.activeIndex`.
* Use `props.select(item)` to select item.
* (Optional) Use `props.highlight(item)` to highlight search keywords in item.

An example with custom template and `async-function`:

<typeahead-custom-template/>

<<< @/.vitepress/components/typeahead/custom-template.vue

## API Reference

### [Typeahead](https://github.com/uiv-lib/uiv/blob/1.x/src/components/typeahead/Typeahead.vue)

#### Props

Name             | Type       | Default  | Required | Description
---------------- | ---------- | -------- | -------- | -----------------------
`v-model`        |            |          | &#10004; | The input or selected value.
`target`         |            |          | &#10004; | The input element to bind with. Can be a select or reference to Element / Component.
`data`           | Array      |          |          | The local auto-complete query data.
`item-key`       | String     |          |          | Value of each `data[key]` to show, leave blank to use the data object.
`append-to-body` | Boolean    | false    |          | Append the typeahead dropdown to body.
`ignore-case`    | Boolean    | true     |          | Ignore input case while matching. Only work in local data mode.
`match-start`    | Boolean    | false    |          | Match from the head of item. Only work in local data mode.
`force-select`   | Boolean    | false    |          | Force user to select from the options or the model will be empty.
`force-clear`    | Boolean    | false    |          | Clear the input if no valid options has selected in force-select mode.
`open-on-focus`  | Boolean    | true     |          | Open the typeahead dropdown on input focus.
`open-on-empty`  | Boolean    | false    |          | Open the typeahead dropdown to show suggestions even if input is empty.
`preselect`      | Boolean    | true     |          | Select the first item that matches the query automatically.
`limit`          | Number     | 10       |          | Limit the options size.
`async-src`      | String     |          |          | The ajax url to fetch data using GET method, query string will be append to the end of this prop value, should return JSON object or array.
`async-key`      | String     |          |          | The async JSON key to render, leave blank to use the original json object (should be Array).
`async-function` | Function   |          |          | The custom async query function with 2 params: `query` as the user input, and `done` as the callback function with array data (note that `async-key` won't work with this). See the example in Custom Template section for details.
`debounce`       | Number     | 200      |          | Debounce the input for specify milliseconds while in async mode.

#### Slots

Name      | Description
--------- | -----------------------
`item`    | Use this scoped slot to override the typeahead item's template.
`empty`   | Slot content will be displayed while no results matched (if the slot exist).

#### Events

Name                    | Description
---------               | -----------------------
`loading`               | Async loading.
`loaded`                | Async load complete.
`loaded-error`          | Async load complete with error.
`input`                 | Item selected
`selected-item-changed` | (since 1.4.0) On selected item changed, but not confirmed yet, i.e. using keyboard navigation
