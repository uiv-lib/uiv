<template>
  <section>
    <page-header></page-header>
    <div class="container" ref="container">
      <dropdown-doc></dropdown-doc>
      <modal-doc></modal-doc>
      <tabs-doc></tabs-doc>
    </div>
    <page-footer></page-footer>
  </section>
</template>

<script>
  import PageHeader from './PageHeader.vue'
  import PageFooter from './PageFooter.vue'
  import hljs from './utils/hljsUtils'
  import TabsDoc from './docs/TabsDoc.vue'
  import DropdownDoc from './docs/DropdownDoc.vue'
  import ModalDoc from './docs/ModalDoc.vue'
  export default {
    name: 'app',
    components: {
      PageHeader, PageFooter, TabsDoc, DropdownDoc, ModalDoc
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

  h1, h2, h3, h4, h5, h6 {
    a {
      color: #333;
      text-decoration: none;

      &:active, &:visited, &:focus, &:hover {
        color: #333;
        text-decoration: none;
      }
    }
  }

  a.anchor {
    display: block;
    position: relative;
    top: -40px;
    visibility: hidden;
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
