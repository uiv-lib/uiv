<script>
  import {
    TRIGGERS,
    addClass,
    isElement
  } from '@src/utils/domUtils'
  import {isString} from '@src/utils/objectUtils'
  import popupMixin from '@src/mixins/popupMixin'

  const SHOW_CLASS = 'in'
  const BASE_CLASS = 'popover fade'

  export default {
    mixins: [popupMixin],
    render (h) {
      return h(this.tag,
        [
          this.$slots.default,
          h('div',
            {
              style: {
                display: 'block'
              },
              ref: 'popup',
              on: {
                mouseenter: this.showOnHover,
                mouseleave: this.hideOnLeave
              }
            },
            [
              h('div', {'class': 'arrow'}),
              h('h3', {
                'class': 'popover-title',
                directives: [
                  {name: 'show', value: this.title}
                ]
              }, this.title),
              h('div', {'class': 'popover-content'}, [this.content || this.$slots.popover])
            ]
          )
        ]
      )
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      trigger: {
        type: String,
        default: TRIGGERS.OUTSIDE_CLICK
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
          // find special element
          let trigger = this.$el.querySelector('[data-role="trigger"]')
          if (trigger) {
            this.triggerEl = trigger
          } else {
            // use the first child
            let firstChild = this.$el.firstChild
            this.triggerEl = firstChild === this.$refs.popup ? null : firstChild
          }
        }
      },
      show () {
        if (this.enable && this.triggerEl && (this.title || this.content || this.$slots.popover) && !this.isShown()) {
          let popover = this.$refs.popup
          if (this.timeoutId > 0) {
            clearTimeout(this.timeoutId)
            this.timeoutId = 0
          } else {
            popover.className = `${BASE_CLASS} ${this.placement}`
            let container = document.querySelector(this.appendTo)
            container.appendChild(popover)
            this.resetPosition()
          }
          addClass(popover, SHOW_CLASS)
          this.$emit('input', true)
          this.$emit('show')
        }
      }
    }
  }
</script>
