<template>
  <span v-if="tag==='span'" class="dropdown">
    <slot></slot>
    <slot name="dropdown" v-if="show"></slot>
  </span>
  <li v-else-if="tag==='li'" class="dropdown">
    <slot></slot>
    <slot name="dropdown" v-if="show"></slot>
  </li>
  <div v-else class="dropdown">
    <slot></slot>
    <slot name="dropdown" v-if="show"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      tag: {
        type: String,
        default: 'span'
      }
    },
    data () {
      return {
        show: false,
        triggerEl: undefined
      }
    },
    mounted () {
      this.triggerEl = this.$el.querySelector('[data-role="trigger"]')
      if (this.triggerEl) {
        this.triggerEl.addEventListener('click', this.toggle)
      }
      window.addEventListener('click', this.windowClicked)
    },
    destroyed () {
      if (this.triggerEl) {
        this.triggerEl.removeEventListener('click', this.toggle)
      }
      window.removeEventListener('click', this.windowClicked)
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      windowClicked (event) {
        if (this.triggerEl && this.triggerEl.contains(event.target)) {
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
    position: relative;
    display: inline-block;

    .dropdown-menu {
      display: block;
    }
  }
</style>
