<template>
  <section>
    <page-header></page-header>
    <jumbotron></jumbotron>
    <div class="container" ref="container">
      <getting-started></getting-started>
      <carousel-doc></carousel-doc>
      <collapse-doc></collapse-doc>
      <dropdown-doc></dropdown-doc>
      <modal-doc></modal-doc>
      <tabs-doc></tabs-doc>
    </div>
    <page-footer></page-footer>

    <a href="https://github.com/wxsms/uiv">
      <img style="position: absolute; top: 0; right: 0; border: 0; z-index: 1031;"
           src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
           alt="Fork me on GitHub"
           data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png">
    </a>
  </section>
</template>

<script>
  import PageHeader from './docs/architectures/PageHeader.vue'
  import PageFooter from './docs/architectures/PageFooter.vue'
  import Jumbotron from './docs/architectures/Jumbotron.vue'
  import hljs from './utils/hljsUtils'
  import GettingStarted from './docs/architectures/GettingStarted.vue'
  import TabsDoc from './docs/TabsDoc.vue'
  import DropdownDoc from './docs/DropdownDoc.vue'
  import ModalDoc from './docs/ModalDoc.vue'
  import CollapseDoc from './docs/CollapseDoc.vue'
  import CarouselDoc from './docs/CarouselDoc.vue'

  export default {
    name: 'app',
    components: {
      GettingStarted,
      Jumbotron,
      PageHeader,
      PageFooter,
      TabsDoc,
      DropdownDoc,
      ModalDoc,
      CollapseDoc,
      CarouselDoc
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
    padding-top: 50px;
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
