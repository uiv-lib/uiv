<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    role="button"
    :class="classes"
    @click="onClick"
  >
    <slot />
  </a>
  <RouterLink
    v-else-if="to"
    :to="to"
    :class="classes"
    :event="disabled ? '' : 'click'"
    :replace="replace"
    :append="append"
    :exact="exact"
    role="button"
    @click="onClick"
    ><slot
  /></RouterLink>
  <label v-else-if="inputType" :class="classes" @click="onClick">
    <input
      autocomplete="off"
      :type="inputType"
      :checked="isInputActive"
      :disabled="disabled"
      @input.stop
      @change="onInputChange"
    />
    <slot />
  </label>
  <BtnGroup v-else-if="justified">
    <button
      :class="classes"
      :type="nativeType"
      :disabled="disabled"
      @click="onClick"
    >
      <slot />
    </button>
  </BtnGroup>
  <button
    v-else
    :class="classes"
    :type="nativeType"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup>
import BtnGroup from './BtnGroup.vue';
import { computed } from 'vue';
import { linkProps } from '../../props/link.props';

const props = defineProps({
  ...linkProps,
  justified: { type: Boolean, default: false },
  type: { type: String, default: 'default' },
  nativeType: { type: String, default: 'button' },
  size: { type: String, default: undefined },
  block: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  // <input> props
  modelValue: { type: null, default: null },
  inputValue: { type: null, default: null },
  inputType: {
    type: String,
    validator(value) {
      return value === 'checkbox' || value === 'radio';
    },
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue']);

const isInputActive = computed(() =>
  props.inputType === 'checkbox'
    ? props.modelValue.indexOf(props.inputValue) >= 0
    : props.modelValue === props.inputValue
);
const classes = computed(() => ({
  btn: true,
  active: props.inputType ? isInputActive.value : props.active,
  disabled: props.disabled,
  'btn-block': props.block,
  [`btn-${props.type}`]: !!props.type,
  [`btn-${props.size}`]: !!props.size,
}));

function onClick(e) {
  if (props.disabled && e instanceof Event) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function onInputChange() {
  if (props.inputType === 'checkbox') {
    const valueCopied = props.modelValue.slice();
    if (isInputActive.value) {
      valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
    } else {
      valueCopied.push(props.inputValue);
    }
    emit('update:modelValue', valueCopied);
  } else {
    emit('update:modelValue', props.inputValue);
  }
}
</script>
