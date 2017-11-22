<script>
  import {TRIGGERS} from '@src/utils/domUtils'
  import popupMixin from '@src/mixins/popupMixin'

  export default {
    mixins: [popupMixin],
    data () {
      return {
        name: 'popover'
      }
    },
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
      isNotEmpty () {
        return this.title || this.content || this.$slots.popover
      }
    }
  }
</script>
