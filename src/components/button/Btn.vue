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
  <button
    v-else
    :class="classes"
    :type="nativeType"
    :disabled="disabled"
    @click="onClick">
    <slot></slot>
  </button>
</template>

<script type="text/jsx">
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      size: {
        type: String
      },
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
      href: {
        type: String
      },
      target: {
        type: String,
        default: '_self'
      },
      // <router-link> props
      to: {},
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
      }
    },
    computed: {
      classes () {
        return {
          btn: true,
          active: this.active,
          disabled: this.disabled && (this.href || this.to),
          'btn-block': this.block,
          [`btn-${this.type}`]: this.type,
          [`btn-${this.size}`]: this.size
        }
      }
    },
    methods: {
      onClick (event) {
        if (this.disabled) {
          event.preventDefault()
        } else {
          this.$emit('click')
        }
      }
    }
  }
</script>
