<template>
  <transition name="fade">
    <div class="tab-pane active" v-show="active">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Tab Title'
      },
      htmlTitle: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: false
      }
    },
    created () {
      let self = this
      if (self.$parent && self.$parent.tabs && typeof self.$parent.tabs.push === 'function') {
        self.$parent.tabs.push(self)
      } else {
        console.error(new Error('Tab parent must be Tabs.'))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-pane {
    opacity: 1;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .5s ease-in-out 0s;
  }

  .fade-leave-active {
    transition: none;
  }
</style>
