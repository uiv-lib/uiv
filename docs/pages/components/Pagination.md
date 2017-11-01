# Pagination

> Provide pagination links for your site or app with the multi-page pagination component.

## Example

Use `v-model` to indicate the current page.

```html
<template>
  <section>
    <pagination v-model="currentPage"
                :boundary-links="boundaryLinks"
                :direction-links="directionLinks"
                :total-page="totalSize"
                :size="size"
                :max-size="maxSize"></pagination>
    <hr/>
    <h4>Settings</h4>
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-xs-12">
          <label class="checkbox-inline"><input v-model="boundaryLinks" type="checkbox"> Boundary Links</label>
          <label class="checkbox-inline"><input v-model="directionLinks" type="checkbox"> Direction Links</label>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-6">
          <label>Current Page</label>
          <div class="input-group">
            <input class="form-control" step="1" min="1" :max="totalSize" v-model.number="currentPage" type="number">
            <span class="input-group-addon" v-text="'/ '+totalSize"></span>
          </div>
        </div>
        <div class="col-md-6">
          <label>Size</label>
          <select class="form-control" v-model="size">
            <option value="sm">sm</option>
            <option value="">md</option>
            <option value="lg">lg</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-6">
          <label>Total Page</label>
          <input class="form-control" step="1" min="0" v-model.number="totalSize" type="number">
        </div>
        <div class="col-md-6">
          <label>Max Size</label>
          <input class="form-control" step="1" min="0" v-model.number="maxSize" type="number">
        </div>
      </div>
    </form>  
  </section>
</template>
<script>
  export default {
    data () {
      return {
        totalSize: 18,
        maxSize: 5,
        currentPage: 1,
        boundaryLinks: true,
        directionLinks: true,
        size: ''
      }
    }
  }
</script> 
<!-- pagination-example.vue -->
```

# API Reference

## [Pagination.vue](https://github.com/wxsms/uiv/tree/master/src/components/pagination/Pagination.vue)

### Props

Name              | Type       | Default  | Required | Description
----------------  | ---------- | -------- | -------- | -----------------------
`v-model`         | Number     |          | &#10004; | The current page.
`boundary-links`  | Boolean    | false    |          | Whether to display First / Last buttons.
`direction-links` | Boolean    | true     |          | Whether to display Previous / Next buttons.
`total-page`      | Number     |          | &#10004; | Total number of pages.
`max-size`        | Number     | 5        |          | Maximum number of pages per chunk.
`size`            | String     | md       |          | The pagination size. Support: `sm` / `md` / `lg`

### Events

Name        | Params | Description
----------- | ------ | ---------------
`change`    | index  | Fire after page changed, with the index number changed to.
