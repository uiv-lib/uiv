<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <h2 class="page-header">Dropdown</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <dropdown>
          <button slot="trigger" class="btn btn-default dropdown-toggle" type="button">
            <span>Dropdown 1</span>
            <span class="caret"></span>
          </button>
          <ul slot="dropdown" class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </dropdown>
        <dropdown>
          <button slot="trigger" class="btn btn-primary dropdown-toggle" type="button">
            <span>Dropdown 2</span>
            <span class="caret"></span>
          </button>
          <ul slot="dropdown" class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </dropdown>
      </div>
    </div>
  </section>
</template>

<script>
  import Dropdown from './../components/Dropdown.vue'

  export default {
    components: {Dropdown}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
