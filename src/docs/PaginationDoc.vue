<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Pagination" source-folder="pagination"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div id="alertContainer">
          <pagination :boundary-links="boundaryLinks"
                      :direction-links="directionLinks"
                      :total-page="totalSize"
                      :size="size"
                      v-model="currentPage"
                      :max-size="maxSize"></pagination>
        </div>
        <div class="well">
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-xs-12">
                <label class="checkbox-inline">
                  <input v-model="boundaryLinks" type="checkbox"> Boundary Links
                </label>
                <label class="checkbox-inline">
                  <input v-model="directionLinks" type="checkbox"> Direction Links
                </label>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>Current Page:</label>
                <div class="input-group">
                  <input class="form-control" step="1" min="1" :max="totalSize" v-model.number="currentPage" type="number">
                  <span class="input-group-addon" v-text="'/ '+totalSize"></span>
                </div>
              </div>
              <div class="col-md-6">
                <label>Size:</label>
                <select class="form-control" v-model="size">
                  <option value="sm">sm</option>
                  <option value="">md</option>
                  <option value="lg">lg</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-6">
                <label>Total Page:</label>
                <input class="form-control" step="1" min="0" v-model.number="totalSize" type="number">
              </div>
              <div class="col-md-6">
                <label>Max Size:</label>
                <input class="form-control" step="1" min="0" v-model.number="maxSize" type="number">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Note</h4>
        <ul>
          <li><p>Use <code>v-model: Number</code> to identify the current page.</p></li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li><p><code>boundary-links: Boolean</code> Whether to display First / Last buttons.Default: false</p></li>
          <li><p><code>direction-links: Boolean</code> Whether to display Previous / Next buttons.Default: true</p></li>
          <li><p><code>total-page: Number</code> Total number of items in all pages.</p></li>
          <li><p><code>max-size: Number</code> Maximum number of items per page.Default: 5</p></li>
          <li><p><code>size: String</code> The pagination size.</p></li>
        </ul>
        <h4>Events</h4>
        <ul>
          <li><p><code>page-changed (index:Number)</code> Fire after page changed.</p></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="PaginationDoc.vue">
        <pre><code>
&lt;pagination v-model=&quot;currentPage&quot; :total-page=&quot;totalSize&quot; :max-size=&quot;maxSize&quot;&gt;&lt;/pagination&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import Pagination from '../components/pagination/Pagination.vue'

  export default {
    components: {AnchorHeader, DemoCodeBlock, Pagination},
    data () {
      return {
        totalSize: 18,
        maxSize: 5,
        currentPage: 1,
        boundaryLinks: true,
        directionLinks: true,
        size: ''
      }
    },
    methods: {
      changePage () {
        alert('Page is changed!')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
