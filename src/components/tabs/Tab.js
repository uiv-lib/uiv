import { spliceIfExist } from '../../utils/array.utils'
import { addClass, removeClass } from '../../utils/dom.utils'
import { Portal } from 'portal-vue'

const ACTIVE_CLASS = 'active'
const IN_CLASS = 'in'

export default {
  components: { Portal },
  props: {
    title: {
      type: String,
      default: 'Tab Title',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabClasses: {
      type: Object,
      default: () => {
        return {}
      },
    },
    group: String,
    pullRight: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: true,
      transition: 150,
    }
  },
  watch: {
    active(active) {
      if (active) {
        setTimeout(() => {
          addClass(this.$el, ACTIVE_CLASS)
          this.$el.offsetHeight
          addClass(this.$el, IN_CLASS)
          try {
            this.$parent.$emit('changed', this.$parent.activeIndex)
          } catch (e) {
            throw new Error('<tab> parent must be <tabs>.')
          }
        }, this.transition)
      } else {
        removeClass(this.$el, IN_CLASS)
        setTimeout(() => {
          removeClass(this.$el, ACTIVE_CLASS)
        }, this.transition)
      }
    },
  },
  created() {
    try {
      this.$parent.tabs.push(this)
    } catch (e) {
      throw new Error('<tab> parent must be <tabs>.')
    }
  },
  beforeDestroy() {
    const tabs = this.$parent && this.$parent.tabs
    spliceIfExist(tabs, this)
  },
  methods: {
    show() {
      this.$nextTick(() => {
        addClass(this.$el, ACTIVE_CLASS)
        addClass(this.$el, IN_CLASS)
      })
    },
  },
}
