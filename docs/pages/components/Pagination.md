# Pagination

> Provide pagination links for your site or app with the multi-page pagination component.

## Example

Use `v-model` to indicate the current page.

```html
<template>
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

<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Number</td>
      <td></td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>The current page</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>boundary-links</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td></td>
      <td>Whether to display First / Last buttons</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>direction-links</code></td>
      <td>Boolean</td>
      <td>true</td>
      <td></td>
      <td>Whether to display Previous / Next buttons</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>total-page</code></td>
      <td>Number</td>
      <td></td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>Total number of pages</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>max-size</code></td>
      <td>Number</td>
      <td>5</td>
      <td></td>
      <td>Maximum number of pages per chunk</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>size</code></td>
      <td>The pagination size. Support: sm / md / lg</td>
      <td>md</td>
      <td></td>
      <td>String</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Events</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>change</code></td>
      <td><p>index</p></td>
      <td colspan="3">Fire after page changed, with the index number changed to</td>
    </tr>
    </tbody>
  </table>
</div>
