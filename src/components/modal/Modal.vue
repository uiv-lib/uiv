<template>
  <div
    tabindex="-1"
    role="dialog"
    class="modal"
    :class="{ fade: transition > 0 }"
    @click.self="backdropClicked"
  >
    <div
      ref="dialog"
      class="modal-dialog"
      :class="modalSizeClass"
      role="document"
    >
      <div class="modal-content">
        <div v-if="header" class="modal-header">
          <slot name="header">
            <button
              v-if="dismissBtn"
              type="button"
              class="close"
              aria-label="Close"
              style="position: relative; z-index: 1060"
              @click="hideModal()"
            >
              <!-- 1060 is bigger than dialog z-index 1050 because it got cover by title sometimes -->
              <span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title">
              <slot name="title">{{ title }}</slot>
            </h4>
          </slot>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div v-if="footer" class="modal-footer">
          <slot name="footer">
            <btn :type="cancelType" @click="hideModal('cancel')">
              <span>{{ cancelText || t('uiv.modal.cancel') }}</span>
            </btn>
            <btn
              :type="okType"
              data-action="auto-focus"
              @click="hideModal('ok')"
            >
              <span>{{ okText || t('uiv.modal.ok') }}</span>
            </btn>
          </slot>
        </div>
      </div>
    </div>
    <div
      ref="backdrop"
      class="modal-backdrop"
      :class="{ fade: transition > 0 }"
    ></div>
  </div>
</template>

<script>
import { t } from '../../locale';
import Btn from './../button/Btn.vue';
import {
  EVENTS,
  on,
  off,
  removeFromDom,
  toggleBodyOverflow,
  addClass,
  removeClass,
  getComputedStyle,
  getOpenModals,
  getOpenModalNum,
} from '../../utils/dom.utils';
import { isFunction, isPromiseSupported } from '../../utils/object.utils';

const IN = 'in';

export default {
  components: { Btn },
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    size: { type: String, default: undefined },
    backdrop: { type: Boolean, default: true },
    footer: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    cancelText: { type: String, default: undefined },
    cancelType: { type: String, default: 'default' },
    okText: { type: String, default: undefined },
    okType: { type: String, default: 'primary' },
    dismissBtn: { type: Boolean, default: true },
    transition: { type: Number, default: 150 },
    autoFocus: { type: Boolean, default: false },
    keyboard: { type: Boolean, default: true },
    beforeClose: { type: Function, default: undefined },
    zOffset: { type: Number, default: 20 },
    appendToBody: { type: Boolean, default: false },
    displayStyle: { type: String, default: 'block' },
  },
  emits: ['update:modelValue', 'show', 'hide'],
  data() {
    return {
      msg: '',
    };
  },
  computed: {
    modalSizeClass() {
      return {
        [`modal-${this.size}`]: !!this.size,
      };
    },
  },
  watch: {
    modelValue(v) {
      this.$toggle(v);
    },
  },
  mounted() {
    removeFromDom(this.$refs.backdrop);
    on(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    on(window, EVENTS.KEY_UP, this.onKeyPress);
    if (this.modelValue) {
      this.$toggle(true);
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeoutId);
    removeFromDom(this.$refs.backdrop);
    removeFromDom(this.$el);
    if (getOpenModalNum() === 0) {
      toggleBodyOverflow(true);
    }
    off(window, EVENTS.MOUSE_DOWN, this.suppressBackgroundClose);
    off(window, EVENTS.MOUSE_UP, this.unsuppressBackgroundClose);
    off(window, EVENTS.KEY_UP, this.onKeyPress);
  },
  methods: {
    t,
    onKeyPress(event) {
      if (this.keyboard && this.modelValue && event.keyCode === 27) {
        const thisModal = this.$refs.backdrop;
        let thisZIndex = thisModal.style.zIndex;
        thisZIndex =
          thisZIndex && thisZIndex !== 'auto' ? parseInt(thisZIndex) : 0;
        // Find out if this modal is the top most one.
        const modals = getOpenModals();
        const modalsLength = modals.length;
        for (let i = 0; i < modalsLength; i++) {
          if (modals[i] !== thisModal) {
            let zIndex = modals[i].style.zIndex;
            zIndex = zIndex && zIndex !== 'auto' ? parseInt(zIndex) : 0;
            // if any existing modal has higher zIndex, ignore
            if (zIndex > thisZIndex) {
              return;
            }
          }
        }
        this.hideModal();
      }
    },
    hideModal(msg) {
      const shouldClose = isFunction(this.beforeClose)
        ? this.beforeClose(msg)
        : true;

      // Skip the hiding when beforeClose returning falsely value or returned Promise resolves to falsely value
      // Use Promise.resolve to accept both Boolean values and Promises
      Promise.resolve(shouldClose).then((_shouldClose) => {
        if (!_shouldClose) {
          return;
        }
        this.msg = msg;
        this.$emit('update:modelValue', false);
      });
    },
    $toggle(show) {
      const modal = this.$el;
      const backdrop = this.$refs.backdrop;
      clearTimeout(this.timeoutId);
      if (show) {
        // If two modals share the same v-if condition the calculated z-index is incorrect,
        // resulting in popover misbehaviour.
        // solved by adding a nextTick.
        // https://github.com/uiv-lib/uiv/issues/342
        this.$nextTick(() => {
          const alreadyOpenModalNum = getOpenModalNum();
          document.body.appendChild(backdrop);
          if (this.appendToBody) {
            document.body.appendChild(modal);
          }
          modal.style.display = this.displayStyle;
          modal.scrollTop = 0;
          backdrop.offsetHeight; // force repaint
          toggleBodyOverflow(false);
          addClass(backdrop, IN);
          addClass(modal, IN);
          // fix z-index for nested modals
          // no need to calculate if no modal is already open
          if (alreadyOpenModalNum > 0) {
            const modalBaseZ = parseInt(getComputedStyle(modal).zIndex) || 1050; // 1050 is default modal z-Index
            const backdropBaseZ =
              parseInt(getComputedStyle(backdrop).zIndex) || 1040; // 1040 is default backdrop z-Index
            const offset = alreadyOpenModalNum * this.zOffset;
            modal.style.zIndex = `${modalBaseZ + offset}`;
            backdrop.style.zIndex = `${backdropBaseZ + offset}`;
          }
          // z-index fix end
          this.timeoutId = setTimeout(() => {
            if (this.autoFocus) {
              const btn = this.$el.querySelector('[data-action="auto-focus"]');
              if (btn) {
                btn.focus();
                /* START.TESTS_ONLY */
                /* istanbul ignore next */
                btn.setAttribute('data-focused', 'true');
                /* END.TESTS_ONLY */
              }
            }
            this.$emit('show');
            this.timeoutId = 0;
          }, this.transition);
        });
      } else {
        removeClass(backdrop, IN);
        removeClass(modal, IN);
        this.timeoutId = setTimeout(() => {
          modal.style.display = 'none';
          removeFromDom(backdrop);
          if (this.appendToBody) {
            removeFromDom(modal);
          }
          if (getOpenModalNum() === 0) {
            toggleBodyOverflow(true);
          }
          this.$emit('hide', this.msg || 'dismiss');
          this.msg = '';
          this.timeoutId = 0;
          // restore z-index for nested modals
          modal.style.zIndex = '';
          backdrop.style.zIndex = '';
          // z-index fix end
        }, this.transition);
      }
    },
    suppressBackgroundClose(event) {
      if (event && event.target === this.$el) {
        return;
      }
      this.isCloseSuppressed = true;
      on(window, 'mouseup', this.unsuppressBackgroundClose);
    },
    unsuppressBackgroundClose() {
      if (this.isCloseSuppressed) {
        off(window, 'mouseup', this.unsuppressBackgroundClose);
        setTimeout(() => {
          this.isCloseSuppressed = false;
        }, 1);
      }
    },
    backdropClicked() {
      if (this.backdrop && !this.isCloseSuppressed) {
        this.hideModal();
      }
    },
  },
};
</script>
