# Affix

> The affix component toggles `position: fixed` on and off, emulating the effect found with `position: sticky`.

::: tip
You must provide CSS for the positioning and width of your affixed content.
:::

::: warning
Do not use affix on an element contained in a relatively positioned element, such as a pulled or pushed column.
:::

## Example

Try to scroll the page down and see what's happening to the alert:

<DemoWrapper><affix-example/></DemoWrapper>

<<< @/.vitepress/components/affix/example.vue

## API Reference

### [Affix](https://github.com/uiv-lib/uiv/blob/1.x/src/components/affix/Affix.vue)

#### Props

| Name     | Type   | Default | Required | Description                                                       |
|----------|--------|---------|----------|-------------------------------------------------------------------|
| `offset` | Number | 0       |          | Pixels to offset from screen when calculating position of scroll. |

#### Slots

| Name      | Description     |
|-----------|-----------------|
| `default` | The affix body. |

#### Events

| Name      | Description                                                       |
|-----------|-------------------------------------------------------------------|
| `affix`   | This event fires immediately before the element has been affixed. |
| `affixed` | This event is fired after the element has been affixed.           |
