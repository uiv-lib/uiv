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
        @click="hide('ok')"
        >{{ okBtnText }}</btn
      >
    </template>
    <template v-else #footer>
      <template v-if="reverseButtons">
        <btn
          v-if="type === TYPES.CONFIRM"
          :type="okType"
          :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
          @click="hide('ok')"
          >{{ okBtnText }}</btn
        >
        <btn v-else :type="okType" @click="validate">{{ okBtnText }}</btn>
        <btn
          :type="cancelType"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          @click="hide('cancel')"
          >{{ cancelBtnText }}</btn
        >
      </template>
      <template v-else>
        <btn
          :type="cancelType"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          @click="hide('cancel')"
          >{{ cancelBtnText }}</btn
        >
        <btn
          v-if="type === TYPES.CONFIRM"
          :type="okType"
          :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
          @click="hide('ok')"
          >{{ okBtnText }}</btn
        >
        <btn v-else :type="okType" @click="validate">{{ okBtnText }}</btn>
      </template>
    </template>
  </modal>
</template>

<script setup>
import { TYPES } from '../../constants/messagebox.constants';
import { t } from '../../locale';
import Modal from '../../components/modal/Modal.vue';
import Btn from '../../components/button/Btn.vue';
import { isExist } from '../../utils/object.utils';
import { computed, ref } from 'vue';

const props = defineProps({
  backdrop: { type: null, default: undefined },
  title: { type: String, default: undefined },
  content: { type: String, default: undefined },
  html: { type: Boolean, default: false },
  okText: { type: String, default: undefined },
  okType: { type: String, default: 'primary' },
  cancelText: { type: String, default: undefined },
  cancelType: { type: String, default: 'default' },
  type: { type: Number, default: 0 },
  size: { type: String, default: 'sm' },
  cb: { type: Function, required: true },
  validator: {
    type: Function,
    default: () => null,
  },
  customClass: { type: null, default: undefined },
  defaultValue: { type: String, default: undefined },
  inputType: { type: String, default: 'text' },
  autoFocus: { type: String, default: 'ok' },
  reverseButtons: { type: Boolean, default: false },
});

const show = ref(true);
// eslint-disable-next-line vue/no-setup-props-destructure
const input = ref(props.defaultValue ?? '');
const dirty = ref(false);
const modal = ref(null);

const closeOnBackdropClick = computed(() =>
  isExist(props.backdrop) ? !!props.backdrop : props.type !== TYPES.ALERT
);
const inputError = computed(() => props.validator(input.value));
const inputNotValid = computed(() => dirty.value && inputError.value);
const okBtnText = computed(() => props.okText || t('uiv.modal.ok'));
const cancelBtnText = computed(() => props.cancelText || t('uiv.modal.cancel'));

function hide(msg) {
  modal.value?.hideModal(msg);
}

function validate() {
  dirty.value = true;
  if (!isExist(inputError.value)) {
    hide({ value: input.value });
  }
}
</script>
