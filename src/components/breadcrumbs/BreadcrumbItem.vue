<template>
  <li :class="{ active }">
    <slot v-if="active" />
    <RouterLink
      v-else-if="to"
      :to="to"
      :replace="replace"
      :append="append"
      :exact="exact"
      ><slot
    /></RouterLink>
    <a v-else :href="href" :target="target"><slot /></a>
  </li>
</template>

<script setup>
defineProps({
  // <a> props
  href: { type: String, default: undefined },
  target: { type: String, default: undefined },
  // <router-link> props
  to: { type: null, default: undefined },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
});
</script>
