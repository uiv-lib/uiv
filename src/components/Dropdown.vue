<template>
  <div class="dropdown">
    <span data-role="trigger" @click="toggle" ref="toggle">
      <slot name="trigger"></slot>
    </span>
    <slot name="dropdown" v-if="show"></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    mounted () {
      window.addEventListener('click', this.windowClicked)
    },
    destroyed () {
      window.removeEventListener('click', this.windowClicked)
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      windowClicked (event) {
        if (this.$refs.toggle.contains(event.target)) {
          // Silent
        } else {
          this.show = false
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .dropdown {
    display: inline-block;
    position: relative;

    .dropdown-menu {
      display: block;
    }
  }
</style>
