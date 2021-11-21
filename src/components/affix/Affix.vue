<template>
  <div ref="el" class="hidden-print">
    <div v-scroll="onScroll" :class="classes" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import vScroll from './../../directives/scroll';
import { computed, ref, nextTick } from 'vue';

const props = defineProps({
  offset: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['affix', 'affixed', 'unfix', 'unfixed']);

const el = ref(null);
const affixed = ref(false);
const classes = computed(() => ({ affix: affixed.value }));
const styles = computed(() => ({
  top: affixed.value ? props.offset + 'px' : null,
}));

function onScroll() {
  if (
    !(
      el.value?.offsetWidth ||
      el.value?.offsetHeight ||
      el.value?.getClientRects().length
    )
  ) {
    return;
  }
  // get window scroll and element position to detect if have to be normal or affixed
  const scroll = {};
  const element = {};
  const rect = el.value.getBoundingClientRect();
  const body = document.body;
  const types = ['Top', 'Left'];
  types.forEach((type) => {
    const t = type.toLowerCase();
    scroll[t] = window['page' + (type === 'Top' ? 'Y' : 'X') + 'Offset'];
    element[t] =
      scroll[t] +
      rect[t] -
      (el.value['client' + type] || body['client' + type] || 0);
  });
  const fix = scroll.top > element.top - props.offset;
  if (affixed.value !== fix) {
    affixed.value = fix;
    emit(affixed.value ? 'affix' : 'unfix');
    nextTick(() => {
      emit(affixed.value ? 'affixed' : 'unfixed');
    });
  }
}
</script>
