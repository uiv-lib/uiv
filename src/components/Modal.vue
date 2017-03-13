<template>
  <section>
    <transition name="backdrop">
      <div class="modal-backdrop" v-if="show"></div>
    </transition>
    <transition name="modal">
      <div class="modal" tabindex="-1" role="dialog" v-if="show" @click="backdropClicked">
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
                <button type="button" class="btn btn-default" @click="toggle(false,'cancel')">{{cancelText}}</button>
                <button type="button" class="btn btn-primary" @click="toggle(false,'ok')">{{okText}}</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      size: {
        type: String
      },
      backdrop: {
        type: Boolean,
        default: true
      },
      footer: {
        type: Boolean,
        default: true
      },
      cancelText: {
        type: String,
        default: 'Cancel'
      },
      okText: {
        type: String,
        default: 'OK'
      }
    },
    data () {
      return {
        show: false
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
    methods: {
      toggle (show, msg) {
        if (typeof show !== 'undefined') {
          this.show = !!show
        } else {
          this.show = !this.show
        }
        this.$emit(`modal-${this.show ? 'show' : 'dismiss'}`, msg || 'dismiss')
      },
      backdropClicked (event) {
        if (this.backdrop && !this.$refs.modal.contains(event.target)) {
          this.toggle(false)
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
</style>
