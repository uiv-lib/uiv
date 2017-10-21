<template>
  <li :class="{active: active}">
    <template v-if="active">
      <slot></slot>
    </template>
    <template v-else-if="to">
      <router-link :to="to" :replace="replace" :append="append" :exact="exact">
        <slot></slot>
      </router-link>
    </template>
    <template v-else>
      <a :href="href" :target="target">
        <slot></slot>
      </a>
    </template>
  </li>
</template>

<script>
  export default {
    props: {
      active: {
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
    }
  }
</script>
