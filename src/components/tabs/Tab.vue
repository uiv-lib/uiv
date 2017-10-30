<template>
  <div class="tab-pane" :class="{fade: transition > 0}" role="tabpanel">
    <slot></slot>
  </div>
</template>

<script>
  import domUtils from '../../utils/domUtils'

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
            domUtils.addClass(this.$el, ACTIVE_CLASS)
            this.$el.offsetHeight
            domUtils.addClass(this.$el, IN_CLASS)
          }, this.transition)
        } else {
          domUtils.removeClass(this.$el, IN_CLASS)
          setTimeout(() => {
            domUtils.removeClass(this.$el, ACTIVE_CLASS)
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
    methods: {
      show () {
        this.$nextTick(() => {
          domUtils.addClass(this.$el, ACTIVE_CLASS)
          domUtils.addClass(this.$el, IN_CLASS)
        })
      }
    }
  }
</script>
