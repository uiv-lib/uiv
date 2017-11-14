<template>
  <div class="tab-pane" :class="{fade: transition > 0}" role="tabpanel">
    <slot></slot>
  </div>
</template>

<script>
  import {spliceIfExist} from '@src/utils/arrayUtils'
  import {addClass, removeClass} from '@src/utils/domUtils'

  const ACTIVE_CLASS = 'active'
  const IN_CLASS = 'in'

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
      },
      group: {
        type: String
      },
      pullRight: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: true,
        transition: 150
      }
    },
    watch: {
      active (active) {
        if (active) {
          setTimeout(() => {
            addClass(this.$el, ACTIVE_CLASS)
            this.$el.offsetHeight
            addClass(this.$el, IN_CLASS)
          }, this.transition)
        } else {
          removeClass(this.$el, IN_CLASS)
          setTimeout(() => {
            removeClass(this.$el, ACTIVE_CLASS)
          }, this.transition)
        }
      }
    },
    created () {
      try {
        this.$parent.tabs.push(this)
      } catch (e) {
        throw new Error('<tab> parent must be <tabs>.')
      }
    },
    beforeDestroy () {
      let tabs = this.$parent && this.$parent.tabs
      spliceIfExist(tabs, this)
    },
    methods: {
      show () {
        this.$nextTick(() => {
          addClass(this.$el, ACTIVE_CLASS)
          addClass(this.$el, IN_CLASS)
        })
      }
    }
  }
</script>
