<script>
  import {
    TRIGGERS,
    addClass,
    isElement
  } from '@src/utils/domUtils'
  import {isString} from '@src/utils/objectUtils'
  import popupMixin from '@src/mixins/popupMixin'

  const SHOW_CLASS = 'in'
  const BASE_CLASS = 'tooltip fade'

  export default {
    mixins: [popupMixin],
    render (h) {
      return h(
        this.tag,
        [
          this.$slots.default,
          h('div',
            {
              ref: 'popup',
              attrs: {
                role: 'tooltip'
              },
              on: {
                mouseenter: this.showOnHover,
                mouseleave: this.hideOnLeave
              }
            },
            [
              h('div', {'class': 'tooltip-arrow'}),
              h('div', {
                'class': 'tooltip-inner',
                domProps: {innerHTML: this.text}
              })
            ]
          )
        ]
      )
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      trigger: {
        type: String,
        default: TRIGGERS.HOVER_FOCUS
      }
    },
    watch: {
      text (value, oldValue) {
        // reset tooltip position while text changed & is shown
        // nextTick is required since user might change the text and v-model in the same time
        if (value && value !== oldValue) {
          this.$nextTick(() => {
            if (this.isShown()) {
              this.resetPosition()
            }
          })
        }
      }
    },
    methods: {
      initTriggerElByTarget (target) {
        if (target) {
          // target exist
          if (isString(target)) { // is selector
            this.triggerEl = document.querySelector(target)
          } else if (isElement(target)) { // is element
            this.triggerEl = target
          } else if (isElement(target.$el)) { // is component
            this.triggerEl = target.$el
          }
        } else {
          // use the first child
          let firstChild = this.$el.firstChild
          this.triggerEl = firstChild === this.$refs.popup ? null : firstChild
        }
      },
      show () {
        let tooltip = this.$refs.popup
        if (this.enable && this.triggerEl && this.text && !this.isShown()) {
          if (this.timeoutId > 0) {
            clearTimeout(this.timeoutId)
            this.timeoutId = 0
          } else {
            tooltip.className = `${BASE_CLASS} ${this.placement}`
            let container = document.querySelector(this.appendTo)
            container.appendChild(tooltip)
            this.resetPosition()
          }
          addClass(tooltip, SHOW_CLASS)
          this.$emit('input', true)
          this.$emit('show')
        }
      }
    }
  }
</script>
