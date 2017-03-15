<template>
  <section>
    <page-header></page-header>
    <div class="container" ref="container">
      <carousel-doc></carousel-doc>
      <collapse-doc></collapse-doc>
      <dropdown-doc></dropdown-doc>
      <modal-doc></modal-doc>
      <tabs-doc></tabs-doc>
    </div>
    <page-footer></page-footer>
  </section>
</template>

<script>
  import PageHeader from './docs/architectures/PageHeader.vue'
  import PageFooter from './docs/architectures/PageFooter.vue'
  import hljs from './utils/hljsUtils'
  import TabsDoc from './docs/TabsDoc.vue'
  import DropdownDoc from './docs/DropdownDoc.vue'
  import ModalDoc from './docs/ModalDoc.vue'
  import CollapseDoc from './docs/CollapseDoc.vue'
  import CarouselDoc from './docs/CarouselDoc.vue'
  export default {
    name: 'app',
    components: {
      PageHeader, PageFooter, TabsDoc, DropdownDoc, ModalDoc, CollapseDoc, CarouselDoc
    },
    mounted () {
      // highlight code blocks
      let blocks = this.$refs.container.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  body {
    padding-top: 70px;
  }

  pre {
    background-color: #fff !important;
    border-radius: 0 !important;
  }

  .tab-docs {
    .tab-content {
      border: 1px solid #ddd;
      border-top: none;

      .tab-pane {
        > pre {
          border: none !important;
        }
      }
    }
  }
</style>
