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
import { linkProps } from '../../props/link.props';

defineProps({
  ...linkProps,
  active: { type: Boolean, default: false },
});
</script>
