# Carousel 轮播

> A slideshow component for cycling through elements, like a carousel. **Nested carousels are not supported**.

## Example

<carousel-example/>

<<< @/.vitepress/components/carousel/example.vue

## Override indicators

Use the `indicators` slot to override default Bootstrap indicators. 

This is a scoped slot, use `slot-scope="props"` in Vue 2.5+, otherwise `scope="props"`.

<carousel-override-indicators/>

<<< @/.vitepress/components/carousel/override-indicators.vue

## Custom icons

Bootstrap 3 has 2 sets of icon supported for the carousel at present:

* `glyphicon glyphicon-chevron-left` and `glyphicon glyphicon-chevron-right` (default)
* `icon-prev` and `icon-next`

Additional CSS may needed if you prefer other icons or font.

Here is an example using `glyphicon-arrow-left` and `glyphicon-arrow-right`.

<carousel-icons/>

<<< @/.vitepress/components/carousel/icons.vue

## API Reference

### [Carousel](https://github.com/uiv-lib/uiv/blob/1.x/src/components/carousel/Carousel.vue)

#### Props

Name                 | Type       | Default                           | Required | Description
----------------     | ---------- | --------------------------------- | -------- | -----------------------
`v-model`            | Number     |                                   |          | The current slide index, use this to manual change slide index.
`indicators`         | Boolean    | true                              |          | Show / hide the indicators.
`controls`           | Boolean    | true                              |          | Show / hide the controls.
`interval`           | Number     | 5000                              |          | Slides running interval time in ms. Use `0` to stop interval.
`icon-control-left`  | String     | glyphicon glyphicon-chevron-left  |          | The left control icon font class.
`icon-control-right` | String     | glyphicon glyphicon-chevron-right |          | The right control icon font class.

#### Slots

Name         | Description
---------    | -----------------------
`default`    | The carousel body.
`indicators` | Override indicators. This is a scoped slot with `activeIndex` prop and `select` method. See example section above for usage details.

#### Events

Name        | Params | Description
----------- | ------ | ---------------
`change`    | index  | Fire after slide changed, with the index number changed to.
