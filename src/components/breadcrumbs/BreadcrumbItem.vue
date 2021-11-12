<template>
  <li>
    <slot v-if="active" />
    <router-link
      v-else-if="to"
      :class="{ active }"
      :to="to"
      :replace="replace"
      :append="append"
      :exact="exact"
      ><slot
    /></router-link>
    <a v-else :class="{ active }" :href="href" :target="target"><slot /></a>
  </li>
</template>

<script>
import linkMixin from '../../mixins/link.mixin'
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  mixins: [linkMixin],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
