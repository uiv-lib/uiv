<template>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" @click="toggleAside()">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">UIV</router-link>
      </div>
      <div class="collapse navbar-collapse">
      </div>
    </div>
  </nav>
</template>

<script>
  import types from '../../store/mutationTypes'

  export default {
    methods: {
      toggleAside () {
        this.$store.commit(types.TOGGLE_ASIDE)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/css/variables";

  nav {
    z-index: 4;
    display: none;
    margin-bottom: 0;
    background: @aside-bg;
  }

  @media (max-width: @screen-xs-max) {
    nav {
      display: block;
    }
  }
</style>
