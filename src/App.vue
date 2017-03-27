<template>
  <section>
    <page-header></page-header>
    <jumbotron></jumbotron>
    <div class="container" ref="container">
      <getting-started></getting-started>
      <alert-doc></alert-doc>
      <carousel-doc></carousel-doc>
      <collapse-doc></collapse-doc>
      <date-picker-doc></date-picker-doc>
      <dropdown-doc></dropdown-doc>
      <modal-doc></modal-doc>
      <pagination-doc></pagination-doc>
      <popover-doc></popover-doc>
      <tabs-doc></tabs-doc>
      <time-picker-doc></time-picker-doc>
      <tooltip-doc></tooltip-doc>
    </div>
    <page-footer></page-footer>
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
  import DatePickerDoc from './docs/DatePickerDoc.vue'
  import AlertDoc from './docs/AlertDoc.vue'
  import PaginationDoc from './docs/PaginationDoc.vue'
  import TooltipDoc from './docs/TooltipDoc.vue'
  import TimePickerDoc from './docs/TimePickerDoc.vue'
  import PopoverDoc from './docs/PopoverDoc.vue'
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
      CarouselDoc,
      DatePickerDoc,
      AlertDoc,
      PaginationDoc,
      TooltipDoc,
      TimePickerDoc,
      PopoverDoc
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
    // border-radius: 0 !important;
    // border: none !important;
  }
</style>
