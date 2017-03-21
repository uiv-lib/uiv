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
          <pagination :boundary-links=true :total-page="totalSize" v-model="currentPage" :max-size="maxSize"></pagination>
          <pagination :total-page="totalSize" v-model="currentPage" :max-size="maxSize"></pagination>
          <pagination :direction-links=false :total-page="totalSize" v-model="currentPage" :max-size="maxSize"></pagination>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <input class="form-control" step="1" min="0" v-model="currentPage" type="number"
                   placeholder="current page">
            <button class="btn btn-default" @click="currentPage += 1">页数 +1</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Props</h4>
        <ul>
        </ul>
        <h4>Events</h4>
        <ul>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="Pagination.vue">
        <pre><code>
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
        currentPage: 1
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
