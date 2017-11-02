# Pagination

> Provide pagination links for your site or app with the multi-page pagination component.

## Example

Simple pagination, great for apps and search results.

Use `v-model` (1-based) to indicate the current page.

```html
<template>
  <pagination v-model="currentPage" :total-page="totalPage"/>
</template>
<script>
  export default {
    data () {
      return {
        totalPage: 18,
        currentPage: 1
      }
    }
  }
</script> 
<!-- pagination-example.vue -->
```

## Sizing

Fancy larger or smaller pagination? Add `size="lg"` or `size="sm"` for additional sizes.

```html
<template>
  <section>
    <pagination v-model="currentPage" :total-page="totalPage" size="lg"/>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" size="sm"/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        totalPage: 18,
        currentPage: 1
      }
    }
  }
</script> 
<!-- pagination-sizing.vue -->
```

## Direction Links

By default `direction-links` are enabled, which allows users to nav to previous or next page.

```html
<template>
  <section>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" :direction-links="false"/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        totalPage: 18,
        currentPage: 1
      }
    }
  }
</script> 
<!-- pagination-direction-links.vue -->
```

## Boundary Links

Add `boundary-links` to allow fast nav to the first or last page.

```html
<template>
  <pagination v-model="currentPage" :total-page="totalPage" boundary-links/>
</template>
<script>
  export default {
    data () {
      return {
        totalPage: 18,
        currentPage: 1
      }
    }
  }
</script> 
<!-- pagination-boundary-links.vue -->
```

## Chunks

Use `max-size` to define the maximum chunk size of pagers (default is 5). And if you don't like chunk pagers, just simply set `max-size` to equal as `total-page`.

```html
<template>
  <section>
    <pagination v-model="currentPage" :total-page="totalPage" :max-size="3"/>
    <pagination v-model="currentPage" :total-page="totalPage"/>
    <pagination v-model="currentPage" :total-page="totalPage" :max-size="totalPage"/>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        totalPage: 10,
        currentPage: 1
      }
    }
  }
</script> 
<!-- pagination-chunks.vue -->
```

# API Reference

## [Pagination.vue](https://github.com/wxsms/uiv/tree/master/src/components/pagination/Pagination.vue)

### Props

Name              | Type       | Default  | Required | Description
----------------  | ---------- | -------- | -------- | -----------------------
`v-model`         | Number     |          | &#10004; | The current page (1-based).
`total-page`      | Number     |          | &#10004; | Total number of pages.
`max-size`        | Number     | 5        |          | Maximum number of pagers per chunk.
`boundary-links`  | Boolean    | false    |          | Display First / Last buttons.
`direction-links` | Boolean    | true     |          | Display Previous / Next buttons.
`size`            | String     |          |          | Optional pagination sizes, support: `sm` / `lg`

### Events

Name        | Params | Description
----------- | ------ | ---------------
`change`    | index  | Fire after page changed, with the index number changed to.
