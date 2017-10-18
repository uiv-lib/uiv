<template>
  <section class="page">
    <div class="page-body">
      <navbar></navbar>
      <router-view :key="$route.path"></router-view>
    </div>
    <page-footer></page-footer>
  </section>
</template>

<script>
  import Navbar from './Navbar.vue'
  import PageFooter from './PageFooter.vue'

  export default {
    components: {Navbar, PageFooter}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variables";

  .page {
    max-width: ~"calc(100% - @{side-nav-width})";
    width: ~"calc(100% - @{side-nav-width})"; // IE need this
    margin-left: @side-nav-width;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media (max-width: @screen-xs-max) {
      max-width: 100%;
      width: 100%; // IE need this
      margin-left: 0;
      margin-top: 0;
    }

    .page-body {
      flex: 1 0 auto;
      padding-bottom: 50px;
    }
  }
</style>
