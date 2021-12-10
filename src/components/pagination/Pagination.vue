<template>
  <nav aria-label="Page navigation" :class="navClasses">
    <ul class="pagination" :class="classes">
      <li
        v-if="boundaryLinks"
        :class="{ disabled: modelValue <= 1 || disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="First"
          @click.prevent="onPageChange(1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-if="directionLinks"
        :class="{ disabled: modelValue <= 1 || disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Previous"
          @click.prevent="onPageChange(modelValue - 1)"
        >
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li v-if="sliceStart > 0" :class="{ disabled: disabled }">
        <a
          href="#"
          role="button"
          aria-label="Previous group"
          @click.prevent="toPage(1)"
        >
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li
        v-for="item in sliceArray"
        :key="item"
        :class="{ active: modelValue === item + 1, disabled: disabled }"
      >
        <a href="#" role="button" @click.prevent="onPageChange(item + 1)">{{
          item + 1
        }}</a>
      </li>
      <li
        v-if="sliceStart < totalPage - maxSize"
        :class="{ disabled: disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Next group"
          @click.prevent="toPage(0)"
        >
          <span aria-hidden="true">&hellip;</span>
        </a>
      </li>
      <li
        v-if="directionLinks"
        :class="{ disabled: modelValue >= totalPage || disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Next"
          @click.prevent="onPageChange(modelValue + 1)"
        >
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li
        v-if="boundaryLinks"
        :class="{ disabled: modelValue >= totalPage || disabled }"
      >
        <a
          href="#"
          role="button"
          aria-label="Last"
          @click.prevent="onPageChange(totalPage)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { range } from '../../utils/array.utils';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Number, required: true, validator: (v) => v >= 1 },
  boundaryLinks: { type: Boolean, default: false },
  directionLinks: { type: Boolean, default: true },
  size: { type: String, default: undefined },
  align: { type: String, default: undefined },
  totalPage: { type: Number, required: true, validator: (v) => v >= 0 },
  maxSize: { type: Number, default: 5, validator: (v) => v >= 0 },
  disabled: Boolean,
});
const emit = defineEmits(['update:modelValue', 'change']);

const sliceStart = ref(0);

const navClasses = computed(() => ({
  [`text-${props.align}`]: !!props.align,
}));
const classes = computed(() => ({
  [`pagination-${props.size}`]: !!props.size,
}));
const sliceArray = computed(() =>
  range(props.totalPage).slice(
    sliceStart.value,
    sliceStart.value + props.maxSize
  )
);

watch(
  () => [props.modelValue, props.maxSize, props.totalPage],
  () => {
    calculateSliceStart();
  },
  {
    immediate: true,
  }
);

function calculateSliceStart() {
  const currentPage = props.modelValue;
  const chunkSize = props.maxSize;
  const currentChunkStart = sliceStart.value;
  const currentChunkEnd = currentChunkStart + chunkSize;
  if (currentPage > currentChunkEnd) {
    const lastChunkStart = props.totalPage - chunkSize;
    if (currentPage > lastChunkStart) {
      sliceStart.value = lastChunkStart;
    } else {
      sliceStart.value = currentPage - 1;
    }
  } else if (currentPage < currentChunkStart + 1) {
    if (currentPage > chunkSize) {
      sliceStart.value = currentPage - chunkSize;
    } else {
      sliceStart.value = 0;
    }
  }
}

function onPageChange(page) {
  if (
    !props.disabled &&
    page > 0 &&
    page <= props.totalPage &&
    page !== props.modelValue
  ) {
    emit('update:modelValue', page);
    emit('change', page);
  }
}

function toPage(pre) {
  if (props.disabled) {
    return;
  }
  const chunkSize = props.maxSize;
  const currentChunkStart = sliceStart.value;
  const lastChunkStart = props.totalPage - chunkSize;
  const start = pre
    ? currentChunkStart - chunkSize
    : currentChunkStart + chunkSize;
  if (start < 0) {
    sliceStart.value = 0;
  } else if (start > lastChunkStart) {
    sliceStart.value = lastChunkStart;
  } else {
    sliceStart.value = start;
  }
}
</script>
