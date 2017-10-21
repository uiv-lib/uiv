<template>
  <li :class="{active: active}">
    <template v-if="active">
      <slot></slot>
    </template>
    <template v-else-if="href">
      <a :href="href" :target="target">
        <slot></slot>
      </a>
    </template>
    <template v-else-if="to">
      <router-link :to="to">
        <slot></slot>
      </router-link>
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
      to: {}
    }
  }
</script>
