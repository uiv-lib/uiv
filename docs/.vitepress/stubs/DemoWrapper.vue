<template>
  <div v-if="show" class="uiv-demo">
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>

<style lang="less">
.uiv-demo {
  position: relative;
  padding: 45px 15px 15px;
  border: 1px solid #ddd;
  border-radius: 4px 4px 0 0;

  &:after {
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 12px;
    font-weight: 700;
    color: #959595;
    text-transform: uppercase;
    letter-spacing: 1px;
    content: 'Example';
  }
}
</style>
