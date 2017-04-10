<template>
  <section :class="{'no-transition':!animation}">
    <transition name="backdrop">
      <div class="modal-backdrop" v-if="value"></div>
    </transition>
    <transition name="modal" @afterEnter="afterModalOpen">
      <div class="modal" tabindex="-1" role="dialog" v-if="value" @click="backdropClicked">
        <div ref="modal" class="modal-dialog" :class="modalSizeClass" role="document">
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
    </transition>
  </section>
</template>

<script>
  import utils from './../../utils/domUtils'

  const MODAL_OPEN_CLASS = 'modal-open'

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
      animation: {
        type: Boolean,
        'default': true
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
        msg: ''
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
        if (v) {
          utils.addClass(document.body, MODAL_OPEN_CLASS)
          this.$emit('modal-show')
        } else {
          utils.removeClass(document.body, MODAL_OPEN_CLASS)
          this.$emit('modal-dismiss', this.msg || 'dismiss')
        }
        this.msg = ''
      }
    },
    mounted () {
      utils.on(window, utils.events.KEY_UP, this.onKeyPress)
    },
    beforeDestroy () {
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
      backdropClicked (event) {
        if (this.backdrop && this.$refs.modal && !this.$refs.modal.contains(event.target)) {
          this.toggle(false)
        }
      },
      afterModalOpen () {
        if (this.autoFocus) {
          let btn = this.$el.querySelector('[data-action="auto-focus"]')
          if (btn) {
            btn.focus()
          }
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .modal {
    display: block;
    top: 0;
    opacity: 1;
    transition: top .3s ease-in-out, opacity .3s ease-in-out;
  }

  .modal-enter, .modal-leave-active {
    top: -100px;
    opacity: 0;
  }

  .modal-backdrop {
    display: block;
    opacity: .5;
    transition: opacity .3s ease-in-out;
  }

  .backdrop-enter, .backdrop-leave-active {
    opacity: 0;
  }

  .no-transition {
    .modal, .modal-backdrop {
      transition: none;
    }
  }
</style>
