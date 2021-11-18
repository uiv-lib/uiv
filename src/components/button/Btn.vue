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
  <router-link
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
  /></router-link>
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

<script>
import linkMixin from '../../mixins/link.mixin';
import BtnGroup from './BtnGroup.vue';

const INPUT_TYPE_CHECKBOX = 'checkbox';
const INPUT_TYPE_RADIO = 'radio';

export default {
  components: { BtnGroup },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // <input> props
    modelValue: {
      type: null,
      default: null,
    },
    inputValue: {
      type: null,
      default: null,
    },
    inputType: {
      type: String,
      validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO;
      },
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX
        ? this.modelValue.indexOf(this.inputValue) >= 0
        : this.modelValue === this.inputValue;
    },
    classes() {
      return {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        'btn-block': this.block,
        [`btn-${this.type}`]: Boolean(this.type),
        [`btn-${this.size}`]: Boolean(this.size),
      };
    },
  },
  methods: {
    onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        const valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit('update:modelValue', valueCopied);
      } else {
        this.$emit('update:modelValue', this.inputValue);
      }
    },
  },
};
</script>

<style scoped></style>
