<template>
  <div id="app" :class="pageClassFix">
    <backdrop :is-aside-show="isAsideShow"/>
    <side-nav :is-aside-show="isAsideShow"/>
    <page/>
  </div>
</template>

<script>
  import SideNav from './SideNav.vue'
  import Page from './Page.vue'
  import Backdrop from './Backdrop.vue'
  import { bus, events } from '../../bus'
  export default {
    components: {SideNav, Page, Backdrop},
    data () {
      return {
        isAsideShow: false
      }
    },
    computed: {
      pageClassFix () {
        switch (this.$route.path) {
          case '/':
            return 'home'
          default:
            return ''
        }
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
  @import "./../../assets/css/variables";

  #app {
    max-width: 100%;
    overflow: hidden;
  }
</style>
