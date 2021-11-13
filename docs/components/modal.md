# Modal

> Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.

## Example

Toggle a modal by clicking the button below. It will slide down and fade in from the top of the page.

A simple modal example with callback:

<modal-example/>

<<< @/.vitepress/components/modal/example.vue

## Optional sizes

Modals have two optional sizes: `lg` and `sm`.

<modal-sizes/>

<<< @/.vitepress/components/modal/sizes.vue

## Custom header

* Use `title` slot to customize the modal title.
* Set `header` prop to `false` to hide the modal header.
* You can also use `header` slot to take full control of the modal header. Notice that this slot will override `title` slot since it is a completely replacement

<modal-custom-header/>

<<< @/.vitepress/components/modal/custom-header.vue

## Custom footer

* Use `footer` slot to customize the modal footer.
* Set `footer` prop to `false` to hide the modal footer.

<modal-custom-footer/>

<<< @/.vitepress/components/modal/custom-footer.vue

## Custom button texts and types

* Use `ok-text` and `cancel-text` to customize button texts
* Use `ok-type` and `cancel-type` to customize button types

<modal-custom-button-text-and-type/>

<<< @/.vitepress/components/modal/custom-button-text-and-type.vue

## Auto focus

Auto focus on footer button with `data-action="auto-focus"` attribute after modal open. By default it is the OK button.



## Disable backdrop

Set `backdrop` prop to `false` to disable the modal dismiss action on backdrop click.

<modal-disable-backdrop/>

<<< @/.vitepress/components/modal/disable-backdrop.vue

## Disable animation

Set `transition` to `0` to disable modal animations.

<modal-disable-animation/>

<<< @/.vitepress/components/modal/disable-animation.vue

## Nested modals

Note that if you want modals to be real nested to each other, you have to add `append-to-body` prop to them. For example:

<modal-nested/>

<<< @/.vitepress/components/modal/nested.vue

Otherwise, you can simply nest them logically, without any extra settings:

<modal-nested-logically/>

<<< @/.vitepress/components/modal/nested-logically.vue


## API Reference

### [Modal](https://github.com/uiv-lib/uiv/blob/1.x/src/components/modal/Modal.vue)

#### Props

Name                  | Type       | Default  | Required | Description
----------------      | ---------- | -------- | -------- | -----------------------
`v-model`             | Boolean    | false    | &#10004; | Show / hide the modal.
`title`               | String     |          |          | The modal title (will be override if title slot exist).
`size`                | String     |          |          | The alternative modal size. Support `lg` / `sm`.
`backdrop`            | Boolean    | true     |          | Dismiss the modal by backdrop click.
`footer`              | Boolean    | true     |          | Show modal footer.
`header`              | Boolean    | true     |          | Show modal header.
`dismiss-btn`         | Boolean    | true     |          | Display the dismiss button in header.
`cancel-text`         | String     |          |          | Override the text of cancel button.
`cancel-type`         | String     | default  |          | Button type of cancel button.
`ok-text`             | String     |          |          | Override the text of ok button.
`ok-type`             | String     | primary  |          | Button type of ok button.
`transition`          | Number     | 150      |          | Transition time of the modal, set to 0 to disable animation.
`auto-focus`          | Boolean    | false    |          | Focus on the action button that has `data-action="auto-focus"` attribute after modal open, by default it is the OK button.
`keyboard`            | Boolean    | true     |          | Close the modal after `esc` key pressed.
`append-to-body`      | Boolean    | false    |          | Append the modal element to `<body>`.
`before-close`        | Function   |          |          | Call with the `msg` param, return `false` to interrupt the modal hiding process. Promise supported since 0.34.1.

#### Slots

Name      | Description
--------- | -----------------------
`title`   | Replace as the modal title.
`default` | Replace as the modal body.
`header`  | Replace as the modal header. Note: this slot will override `title` slot since it is a completely replacement of header.
`footer`  | Replace as the modal footer.

#### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | Fire after modal show.
`hide`      | msg    | Fire after modal dismiss with message (if exist).
