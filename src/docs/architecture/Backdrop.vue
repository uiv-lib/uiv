<template>
  <transition name="fade">
    <section v-show="isAsideShow" @click="toggleAside()"></section>
  </transition>
</template>

<script>
  import {bus, events} from './../bus'

  export default {
    props: ['isAsideShow'],
    methods: {
      toggleAside () {
        bus.$emit(events.TOGGLE_ASIDE, false)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  section {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, .5);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease-in-out;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
