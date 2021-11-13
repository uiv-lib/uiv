# Pagination

> Provide pagination links for your site or app with the multi-page pagination component.

## Example

Simple pagination, great for apps and search results.

Use `v-model` (1-based) to indicate the current page.

<pagination-example/>

<<< @/.vitepress/components/pagination/example.vue

## Sizing

Fancy larger or smaller pagination? Add `size="lg"` or `size="sm"` for additional sizes.

<pagination-sizes/>

<<< @/.vitepress/components/pagination/sizes.vue

## Alignment

By default the pagination component is left aligned. Change the alignment to center or right by setting `align` to the appropriate value.

<pagination-alignment/>

<<< @/.vitepress/components/pagination/alignment.vue

## Direction links

By default `direction-links` are enabled, which allows users to nav to previous or next page.

<pagination-direction-links/>

<<< @/.vitepress/components/pagination/direction-links.vue

## Boundary links

Add `boundary-links` to allow fast nav to the first or last page.

<pagination-boundary-links/>

<<< @/.vitepress/components/pagination/boundary-links.vue

## Chunks

Use `max-size` to define the maximum chunk size of pagers (default is 5). And if you don't like chunk pagers, just simply set `max-size` to equal as `total-page`.

<pagination-chunks/>

<<< @/.vitepress/components/pagination/chunks.vue

## Disabled

<pagination-disabled/>

<<< @/.vitepress/components/pagination/disabled.vue

## API Reference

### [Pagination](https://github.com/uiv-lib/uiv/blob/1.x/src/components/pagination/Pagination.vue)

#### Props

Name              | Type       | Default  | Required | Description
----------------  | ---------- | -------- | -------- | -----------------------
`v-model`         | Number     |          | &#10004; | The current page (1-based).
`total-page`      | Number     |          | &#10004; | Total number of pages.
`max-size`        | Number     | 5        |          | Maximum number of pagers per chunk.
`boundary-links`  | Boolean    | false    |          | Display First / Last buttons.
`direction-links` | Boolean    | true     |          | Display Previous / Next buttons.
`size`            | String     |          |          | Optional pagination sizes, support: `sm` / `lg`
`align`           | String     |          |          | Optional pagination alignment, support: `left` / `center` / `right`
`disabled`        | Boolean    | false    |          | Disable the pagination component.

#### Events

Name        | Params | Description
----------- | ------ | ---------------
`change`    | index  | Fire after page changed, with the index number changed to.
