<template>
  <div class="tab-pane" role="tabpanel" :class="{active:active}" v-show="active">
    <slot></slot>
  </div>
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
