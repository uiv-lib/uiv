<template>
  <button type="button" class="navbar-toggle collapsed" @click="toggleAside()">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
</template>

<script>
  import {bus, events} from '../../bus'

  export default {
    methods: {
      toggleAside () {
        bus.$emit(events.TOGGLE_ASIDE)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/variables";

  .navbar-toggle {
    background: #000;
    opacity: .25;
    display: none;
    z-index: 1000;
    position: fixed;
    top: 15px;
    right: 15px;
    margin: 0;

    .icon-bar {
      background-color: #fff;
    }
  }

  @media (max-width: @screen-xs-max) {
    .navbar-toggle {
      display: block;
    }
  }

  @media print {
    .navbar-toggle {
      display: none;
    }
  }
</style>
