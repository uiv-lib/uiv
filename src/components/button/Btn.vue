<template>
  <a
    v-if="href"
    :class="classes"
    role="button"
    :href="href"
    @click="onClick">
    <slot></slot>
  </a>
  <router-link
    v-else-if="to"
    :class="classes"
    role="button"
    :event="disabled ? '' : 'click'"
    :to="to"
    :replace="replace"
    :append="append"
    :exact="exact"
    @click.native="onClick">
    <slot></slot>
  </router-link>
  <label
    v-else-if="inputType"
    :class="classes"
    @click="onClick">
    <input
      autocomplete="off"
      :type="inputType"
      :checked="isInputActive"
      :disabled="disabled"
      @change="onChange"/>
    <slot></slot>
  </label>
  <btn-group v-else-if="isInJustifiedGroup">
    <button
      :class="classes"
      :type="nativeType"
      :disabled="disabled"
      @click="onClick">
      <slot></slot>
    </button>
  </btn-group>
  <button
    v-else
    :class="classes"
    :type="nativeType"
    :disabled="disabled"
    @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  import BtnGroup from './BtnGroup.vue'
  import domUtils from './../../utils/domUtils'

  const INPUT_TYPE_CHECKBOX = 'checkbox'
  const INPUT_TYPE_RADIO = 'radio'

  export default {
    components: {BtnGroup},
    props: {
      type: {
        type: String,
        default: 'default'
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      size: String,
      block: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // <a> props
      href: String,
      target: {
        type: String,
        default: '_self'
      },
      // <router-link> props
      to: null,
      replace: {
        type: Boolean,
        default: false
      },
      append: {
        type: Boolean,
        default: false
      },
      exact: {
        type: Boolean,
        default: false
      },
      // <input> props
      value: null,
      inputValue: null,
      inputType: {
        type: String,
        validator (value) {
          return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
        }
      }
    },
    data () {
      return {
        isInJustifiedGroup: false
      }
    },
    computed: {
      classes () {
        return {
          btn: true,
          active: this.inputType ? this.isInputActive : this.active,
          disabled: this.disabled,
          'btn-block': this.block,
          [`btn-${this.type}`]: this.type,
          [`btn-${this.size}`]: this.size
        }
      },
      isInputActive () {
        if (this.inputType === INPUT_TYPE_CHECKBOX) {
          return this.value.indexOf(this.inputValue) >= 0
        } else {
          return this.value === this.inputValue
        }
      }
    },
    mounted () {
      this.isInJustifiedGroup = domUtils.hasClass(this.$el.parentNode, 'btn-group-justified')
    },
    methods: {
      onClick (event) {
        if (this.disabled) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          this.$emit('click')
        }
      },
      onChange () {
        if (this.inputType === INPUT_TYPE_CHECKBOX) {
          if (this.isInputActive) {
            this.value.splice(this.value.indexOf(this.inputValue), 1)
          } else {
            this.value.push(this.inputValue)
          }
        } else {
          this.$emit('input', this.inputValue)
        }
      }
    }
  }
</script>
