<template>
  <transition name="fade" mode="out-in">
    <div class="tab-pane" role="tabpanel" :class="{active:active}" v-show="active">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        'default': 'Tab Title'
      },
      htmlTitle: {
        type: Boolean,
        'default': false
      },
      disabled: {
        type: Boolean,
        'default': false
      },
      group: {
        type: String
      }
    },
    data () {
      return {
        active: true
      }
    },
    created () {
      let self = this
      try {
        self.$parent.tabs.push(self)
      } catch (e) {
        throw new Error('Tab parent must be Tabs.')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .fade-enter-active {
    transition: opacity .3s ease-in-out;
  }

  .fade-enter {
    opacity: 0;
  }
</style>
