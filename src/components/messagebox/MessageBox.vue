<template>
  <modal
    ref="modal"
    v-model="show"
    auto-focus
    :size="size"
    :title="title"
    :header="!!title"
    :backdrop="closeOnBackdropClick"
    :cancel-text="cancelText"
    :ok-text="okText"
    :class="customClass"
    @hide="cb"
  >
    <div v-if="html" v-html="content"></div>
    <p v-else>{{ content }}</p>
    <div v-if="type === TYPES.PROMPT">
      <div class="form-group" :class="{ 'has-error': inputNotValid }">
        <input
          ref="input"
          v-model="input"
          :type="inputType"
          class="form-control"
          required
          data-action="auto-focus"
          @change="dirty = true"
          @keyup.enter="validate"
        />
        <span v-show="inputNotValid" class="help-block">{{ inputError }}</span>
      </div>
    </div>
    <template v-if="type === TYPES.ALERT" #footer>
      <btn
        :type="okType"
        :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
        @click="toggle(false, 'ok')"
        v-text="okBtnText"
      />
    </template>
    <template v-else #footer>
      <template v-if="reverseButtons">
        <btn
          v-if="type === TYPES.CONFIRM"
          :type="okType"
          :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
          @click="toggle(false, 'ok')"
          v-text="okBtnText"
        />
        <btn v-else :type="okType" @click="validate" v-text="okBtnText" />
        <btn
          :type="cancelType"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          @click="toggle(false, 'cancel')"
          v-text="cancelBtnText"
        />
      </template>
      <template v-else>
        <btn
          :type="cancelType"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          @click="toggle(false, 'cancel')"
          v-text="cancelBtnText"
        />
        <btn
          v-if="type === TYPES.CONFIRM"
          :type="okType"
          :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
          @click="toggle(false, 'ok')"
          v-text="okBtnText"
        />
        <btn v-else :type="okType" @click="validate" v-text="okBtnText" />
      </template>
    </template>
  </modal>
</template>

<script>
import { TYPES } from '../../constants/messagebox.constants'
import Local from '../../mixins/locale.mixin'
import Modal from '../../components/modal/Modal.vue'
import Btn from '../../components/button/Btn.vue'
import { isExist } from '../../utils/object.utils'

export default {
  components: { Modal, Btn },
  mixins: [Local],
  props: {
    backdrop: { type: null, default: undefined },
    title: { type: String, default: undefined },
    content: { type: String, default: undefined },
    html: {
      type: Boolean,
      default: false,
    },
    okText: { type: String, default: undefined },
    okType: {
      type: String,
      default: 'primary',
    },
    cancelText: { type: String, default: undefined },
    cancelType: {
      type: String,
      default: 'default',
    },
    type: {
      type: Number,
      default: TYPES.ALERT,
    },
    size: {
      type: String,
      default: 'sm',
    },
    cb: {
      type: Function,
      required: true,
    },
    validator: {
      type: Function,
      default: () => null,
    },
    customClass: { type: null, default: undefined },
    defaultValue: { type: String, default: undefined },
    inputType: {
      type: String,
      default: 'text',
    },
    autoFocus: {
      type: String,
      default: 'ok',
    },
    reverseButtons: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      TYPES,
      show: true,
      input: '',
      dirty: false,
    }
  },
  computed: {
    closeOnBackdropClick() {
      // use backdrop prop if exist
      // otherwise, only not available if render as alert
      return isExist(this.backdrop)
        ? Boolean(this.backdrop)
        : this.type !== TYPES.ALERT
    },
    inputError() {
      return this.validator(this.input)
    },
    inputNotValid() {
      return this.dirty && this.inputError
    },
    okBtnText() {
      return this.okText || this.t('uiv.modal.ok')
    },
    cancelBtnText() {
      return this.cancelText || this.t('uiv.modal.cancel')
    },
  },
  mounted() {
    if (this.defaultValue) {
      this.input = this.defaultValue
    }
  },
  methods: {
    toggle(show, msg) {
      this.$refs.modal.toggle(show, msg)
    },
    validate() {
      this.dirty = true
      if (!isExist(this.inputError)) {
        this.toggle(false, { value: this.input })
      }
    },
  },
}
</script>
