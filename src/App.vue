<template>
  <div class="container" ref="container">
    <dropdown-doc></dropdown-doc>
    <modal-doc></modal-doc>
    <tabs-doc></tabs-doc>

    <a href="https://github.com/wxsms/uiv">
      <img style="position: absolute; top: 0; right: 0; border: 0;"
           src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
           alt="Fork me on GitHub"
           data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png">
    </a>
  </div>
</template>

<script>
  import hljs from './utils/hljsUtils'
  import TabsDoc from './docs/TabsDoc.vue'
  import DropdownDoc from './docs/DropdownDoc.vue'
  import ModalDoc from './docs/ModalDoc.vue'
  export default {
    name: 'app',
    components: {
      TabsDoc, DropdownDoc, ModalDoc
    },
    mounted () {
      let blocks = this.$refs.container.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
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
