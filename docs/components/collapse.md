# Collapse

> Flexible plugin for easy toggle behavior.

## Example

Click the button below to show and hide another element.

<collapse-example/>

<<< @/docs/.vuepress/components/collapse/example.vue

## Accordion

Extend the default collapse behavior to create an accordion with the panel component.

<collapse-accordion/>

<<< @/docs/.vuepress/components/collapse/accordion.vue

## API Reference

### [Collapse](https://github.com/uiv-lib/uiv/blob/1.x/src/components/collapse/Collapse.vue)

#### Props

Name                  | Type       | Default  | Required | Description
----------------      | ---------- | -------- | -------- | -----------------------
`v-model`             | Boolean    | false    | &#10004; | Show / hide the component.
`tag`                 | String     | div      |          | The HTML tag that render the collapse component.
`transition` | Number     | 350      |          | Collapse transition speed. Use 0 to disable transition.

#### Slots

Name      | Description
--------- | -----------------------
`default` | Replace as the collapse body.

#### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | This event fires immediately when the v-model prop is set to true.
`shown`     |        | This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).
`hide`      |        | 	This event is fired immediately when the v-model prop is set to false.
`hidden`    |        | This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete).
