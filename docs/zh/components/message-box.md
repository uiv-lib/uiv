# MessageBox 消息提示

> A set of modal boxes simulating system message box, mainly for alerting information, confirm operations and prompting messages.

By design MessageBox provides simulations of browsers' `alert`, `confirm` and `prompt`. Use Modal instead if needed more complicated contents.

## Alert

Displays an alert modal with the optional specified content and an OK (auto-focused) button. By default it can not be closed on backdrop click.

An alert example using callback:

<message-box-alert/>

<<< @/docs/.vuepress/components/message-box/alert.vue

## Confirm

Displays a modal dialog with an optional message and two buttons, OK (auto-focused) and Cancel.

A confirm example using `Promise`:

<message-box-confirm/>

<<< @/docs/.vuepress/components/message-box/confirm.vue

## Prompt

Displays a dialog with an optional message prompting the user to input some text.

<message-box-prompt/>

<<< @/docs/.vuepress/components/message-box/prompt.vue

## Global methods

Following global methods for `Vue.prototype` will be added **if uiv is installed**:

* `$alert(options, callback(msg))`
* `$confirm(options, callback(err, msg))`
* `$prompt(options, callback(err, msg))`

Callback params:

* `err` as user dismiss or cancel the box, otherwise it will be `null`. Note that there is no err in `$alert` callback.
* `msg` as the user input while using prompt.

Each of these methods will return a `Promise` object that resolve / reject while the box is closed (if supported by browser or with es6 promise polyfill).

## Import individually

If you prefer importing `MessageBox` individually:

```javascript
import { MessageBox } from 'uiv'
```

or:

```javascript
import MessageBox from 'uiv/dist/MessageBox'
```

The corresponding methods are: `MessageBox.alert`, `MessageBox.confirm` and `MessageBox.prompt`, with same parameters as above.

::: warning
You **CAN NOT** use MessageBox individually like this if you're also using `vue-i18n` in the root instance of Vue (because it will not be able to access the correct language pack), a workaround is to register them manually:
:::

```javascript
import Vue from 'vue'
import { MessageBox } from 'uiv'

Vue.prototype.$alert = MessageBox.alert
// ...
```

## API Reference

### [MessageBox](https://github.com/uiv-lib/uiv/blob/1.x/src/services/messagebox/MessageBox.vue)

These props are used as `options` in the methods above.

#### Props

Name             | Type       | Default  | Required | Description
----------       | ---------- | -------- | -------- | -----------------------
`size`           | String     | sm       |          | The alternative modal sizes. Support: `lg` / `md` / `sm`.
`title`          | String     |          |          | The modal title.
`content`        | String     |          |          | The modal content.
`html`           | Boolean    | `false`  |          | Allow HTML in content.
`okText`         | String     |          |          | Text of ok button.
`okType`         | String     | primary  |          | Button type of ok button.
`cancelText`     | String     |          |          | Text of cancel button.
`cancelType`     | String     | default  |          | Button type of cancel button.
`customClass`    |            |          |          | Custom classes to modal, anything that can work with `v-bind:class` or `:class`.
`backdrop`       | Boolean    | `false` if type is alert, otherwise `true` |          | Dismiss the modal by backdrop click.
`validator`      | Function   |          |          | Custom validator function for prompt. Accepts the input value as param, returns the err msg (not valid) or null (valid)
`defaultValue`   | String     |          |          | The default value to fill in prompt box.
`inputType`      | String     | text     |          | The default input type of prompt box.
`autoFocus`      | String     | ok       |          | Focus on button while message box open. Can be `ok` / `cancel`, or empty String to disable the feature.
`reverseButtons` | Boolean    | false    |          | Reverse the order of `ok` and `cancel` button.
