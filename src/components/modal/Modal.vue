<template>
  <div>
    <div ref="backdrop" class="modal-backdrop" :class="{fade:transitionDuration>0}"></div>
    <div ref="modal"
         class="modal"
         :class="{fade:transitionDuration>0}"
         tabindex="-1"
         role="dialog"
         @click="backdropClicked">
      <div ref="dialog" class="modal-dialog" :class="modalSizeClass" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" aria-label="Close" @click="toggle(false)">
              <span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title">
              <slot name="title">{{title}}</slot>
            </h4>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="footer">
            <slot name="footer">
              <button type="button" class="btn btn-default" @click="toggle(false,'cancel')">
                <span>{{cancelText}}</span>
              </button>
              <button type="button" class="btn btn-primary" @click="toggle(false,'ok')" data-action="auto-focus">
                <span>{{okText}}</span>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from './../../utils/domUtils'

  const MODAL_OPEN = 'modal-open'
  const IN = 'in'

  export default {
    props: {
      value: {
        type: Boolean,
        'default': false
      },
      title: {
        type: String
      },
      size: {
        type: String
      },
      backdrop: {
        type: Boolean,
        'default': true
      },
      footer: {
        type: Boolean,
        'default': true
      },
      cancelText: {
        type: String,
        'default': 'Cancel'
      },
      okText: {
        type: String,
        'default': 'OK'
      },
      transitionDuration: {
        type: Number,
        'default': 150
      },
      autoFocus: {
        type: Boolean,
        'default': false
      },
      keyboard: {
        type: Boolean,
        'default': true
      }
    },
    data () {
      return {
        msg: '',
        timeoutId: 0
      }
    },
    computed: {
      modalSizeClass () {
        return {
          'modal-lg': this.size === 'lg',
          'modal-sm': this.size === 'sm'
        }
      }
    },
    watch: {
      value (v) {
        this.$toggle(v)
      }
    },
    mounted () {
      utils.removeFromDom(this.$refs.backdrop)
      utils.on(window, utils.events.KEY_UP, this.onKeyPress)
      if (this.value) {
        this.$toggle(true)
      }
    },
    beforeDestroy () {
      clearTimeout(this.timeoutId)
      utils.removeFromDom(this.$refs.backdrop)
      utils.off(window, utils.events.KEY_UP, this.onKeyPress)
    },
    methods: {
      onKeyPress (event) {
        if (this.keyboard && this.value && event.keyCode === 27) {
          this.toggle(false)
        }
      },
      toggle (show, msg) {
        this.msg = msg
        this.$emit('input', show)
      },
      $toggle (show) {
        let backdrop = this.$refs.backdrop
        let modal = this.$refs.modal
        clearTimeout(this.timeoutId)
        if (show) {
          document.body.appendChild(backdrop)
          modal.style.display = 'block'
          backdrop.offsetHeight // force repaint
          utils.addClass(backdrop, IN)
          utils.addClass(modal, IN)
          utils.addClass(document.body, MODAL_OPEN)
          this.timeoutId = setTimeout(() => {
            if (this.autoFocus) {
              let btn = this.$el.querySelector('[data-action="auto-focus"]')
              if (btn) {
                btn.focus()
              }
            }
            this.$emit('show')
            this.timeoutId = 0
          }, this.transitionDuration)
        } else {
          utils.removeClass(backdrop, IN)
          utils.removeClass(modal, IN)
          this.timeoutId = setTimeout(() => {
            modal.style.display = 'none'
            utils.removeFromDom(backdrop)
            utils.removeClass(document.body, MODAL_OPEN)
            this.$emit('hide', this.msg || 'dismiss')
            this.msg = ''
            this.timeoutId = 0
          }, this.transitionDuration)
        }
      },
      backdropClicked (event) {
        if (this.backdrop && !this.$refs.dialog.contains(event.target)) {
          this.toggle(false)
        }
      }
    }
  }
</script>
