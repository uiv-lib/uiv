<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">uiv</a>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <dropdown tag="li">
            <a href="javascript:void(0)" class="dropdown-toggle" data-role="trigger">
              Components <span class="caret"></span>
            </a>
            <ul slot="dropdown" class="dropdown-menu">
              <li><a href="#carousel">Carousel</a></li>
              <li><a href="#collapse">Collapse</a></li>
              <li><a href="#dropdown">Dropdown</a></li>
              <li><a href="#modal">Modal</a></li>
              <li><a href="#tabs">Tabs</a></li>
            </ul>
          </dropdown>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import Dropdown from '../../components/Dropdown.vue'

  export default {
    components: {Dropdown}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
