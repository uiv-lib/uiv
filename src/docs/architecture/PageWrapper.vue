<template>
  <div id="app">
    <backdrop :is-aside-show="isAsideShow"></backdrop>
    <side-nav :is-aside-show="isAsideShow"></side-nav>
    <page></page>
  </div>
</template>

<script>
  import SideNav from './SideNav.vue'
  import Page from './Page.vue'
  import Backdrop from './Backdrop.vue'
  import { bus, events } from './../bus'
  export default {
    components: {SideNav, Page, Backdrop},
    data () {
      return {
        isAsideShow: false
      }
    },
    mounted () {
      bus.$on(events.TOGGLE_ASIDE, (show) => {
        if (typeof show !== 'undefined') {
          this.isAsideShow = !!show
        } else {
          this.isAsideShow = !this.isAsideShow
        }
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  #app {
    max-width: 100vw;
    overflow: hidden;
  }
</style>
