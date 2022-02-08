# ProgressBar

> Provide up-to-date feedback on the progress of a workflow or action with simple yet flexible progress bars.

## Example

Default progress bar.

<ClientOnly><progress-bar-example/></ClientOnly>

<<< @/.vitepress/components/progress-bar/example.vue

## With label

::: tip
To ensure that the label text remains legible even for low percentages, consider use `min-width` prop.
:::

<ClientOnly><progress-bar-with-label/></ClientOnly>

<<< @/.vitepress/components/progress-bar/with-label.vue

## Contextual alternatives

Progress bars use some of the same button and alert classes for consistent styles.

<ClientOnly><progress-bar-contextual-alternatives/></ClientOnly>

<<< @/.vitepress/components/progress-bar/contextual-alternatives.vue

## Striped

Uses a gradient to create a striped effect.

::: warning
Not available in IE9 and below.
:::

<ClientOnly><progress-bar-striped/></ClientOnly>

<<< @/.vitepress/components/progress-bar/striped.vue

## Animated

Animate the stripes right to left.

::: warning
Not available in IE9 and below.
:::

<ClientOnly><progress-bar-animated/></ClientOnly>

<<< @/.vitepress/components/progress-bar/animated.vue

## Stacked

Place multiple `<progress-bar-stack>` into the same `<progress-bar>` to stack them.

<ClientOnly><progress-bar-stacked/></ClientOnly>

<<< @/.vitepress/components/progress-bar/stacked.vue

## API Reference

### [ProgressBar](https://github.com/uiv-lib/uiv/blob/1.x/src/components/progressbar/ProgressBar.js)

#### Props

| Name         | Type    | Default | Required | Description                                                                                   |
|--------------|---------|---------|----------|-----------------------------------------------------------------------------------------------|
| `v-model`    | Number  |         | &#10004; | Current progress (0 ~ 100).                                                                   |
| `label`      | Boolean | false   |          | Show label on progress bar.                                                                   |
| `label-text` | String  |         |          | Custom label text.                                                                            |
| `min-width`  | Boolean | false   |          | Apply a minimum width to the progress bar, useful when showing label and small current value. |
| `type`       | String  |         |          | Progress bar type, support success / info / warning / danger. Or you can add custom types.    |
| `striped`    | Boolean | false   |          | Apply striped style.                                                                          |
| `active`     | Boolean | false   |          | Apply active to striped style.                                                                |

#### Slots

| Name      | Description                                                                      |
|-----------|----------------------------------------------------------------------------------|
| `default` | Use this slot if need stacked progress bar, see example in the code panel above. |

### [ProgressBarStack](https://github.com/uiv-lib/uiv/blob/1.x/src/components/progressbar/ProgressBarStack.js)

`ProgressBar` and `ProgressBarStack` shared same props.
