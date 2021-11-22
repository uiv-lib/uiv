<template>
  <div class="item" :class="slideClass">
    <slot></slot>
  </div>
</template>

<script setup>
import { spliceIfExist } from '../../utils/array.utils';
import {
  onBeforeMount,
  onBeforeUnmount,
  getCurrentInstance,
  reactive,
} from 'vue';

const instance = getCurrentInstance();

const slideClass = reactive({
  active: false,
  prev: false,
  next: false,
  left: false,
  right: false,
});

onBeforeMount(() => {
  instance.parent?.exposed?.slides?.push(instance);
});

onBeforeUnmount(() => {
  spliceIfExist(instance.parent?.exposed?.slides, instance);
});

defineExpose({
  slideClass,
});
</script>
