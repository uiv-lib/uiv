<template>
  <nav :class="navClasses">
    <div :class="fluid ? 'container-fluid' : 'container'">
      <div class="navbar-header">
        <slot name="collapse-btn">
          <button type="button" class="navbar-toggle collapsed" @click="toggle">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </slot>
        <slot name="brand" />
      </div>
      <slot />
      <collapse v-model="show" class="navbar-collapse">
        <slot name="collapse" />
      </collapse>
    </div>
  </nav>
</template>

<script setup>
import Collapse from '../collapse/Collapse.vue';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  fluid: { type: Boolean, default: true },
  fixedTop: Boolean,
  fixedBottom: Boolean,
  staticTop: Boolean,
  inverse: Boolean,
});
const emit = defineEmits(['update:modalValue']);
const show = ref(false);
const navClasses = computed(() => ({
  navbar: true,
  'navbar-default': !props.inverse,
  'navbar-inverse': props.inverse,
  'navbar-static-top': props.staticTop,
  'navbar-fixed-bottom': props.fixedBottom,
  'navbar-fixed-top': props.fixedTop,
}));

watch(
  () => props.modelValue,
  (v) => {
    show.value = v;
  }
);

onMounted(() => {
  show.value = !!props.modelValue;
});

function toggle() {
  show.value = !show.value;
  emit('update:modalValue', show.value);
}
</script>
