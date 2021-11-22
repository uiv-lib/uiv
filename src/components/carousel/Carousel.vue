<template>
  <div
    class="carousel slide"
    data-ride="carousel"
    @mouseenter="stopInterval"
    @mouseleave="startInterval"
  >
    <slot
      v-if="indicators"
      name="indicators"
      :select="select"
      :active-index="activeIndex"
    >
      <ol class="carousel-indicators">
        <li
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: index === activeIndex }"
          @click="select(index)"
        />
      </ol>
    </slot>
    <div class="carousel-inner" role="listbox">
      <slot></slot>
    </div>
    <a
      v-if="controls"
      class="left carousel-control"
      href="#"
      role="button"
      @click.prevent="prev()"
    >
      <span :class="iconControlLeft" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      v-if="controls"
      class="right carousel-control"
      href="#"
      role="button"
      @click.prevent="next()"
    >
      <span :class="iconControlRight" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script setup>
import { isExist } from '../../utils/object.utils';
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  nextTick,
} from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: undefined },
  indicators: { type: Boolean, default: true },
  controls: { type: Boolean, default: true },
  interval: { type: Number, default: 5000 },
  iconControlLeft: {
    type: String,
    default: 'glyphicon glyphicon-chevron-left',
  },
  iconControlRight: {
    type: String,
    default: 'glyphicon glyphicon-chevron-right',
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

let activeIndex = ref(0);
let timeoutId = 0;
let intervalId = 0;
const slides = reactive([]);

function run(newIndex, oldIndex) {
  const currentActiveIndex = oldIndex || 0;
  let direction;
  if (newIndex > currentActiveIndex) {
    direction = ['next', 'left'];
  } else {
    direction = ['prev', 'right'];
  }
  slides[newIndex].exposed.slideClass[direction[0]] = true;
  nextTick(() => {
    slides[newIndex].vnode.el.offsetHeight;
    slides.forEach((slide, i) => {
      if (i === currentActiveIndex) {
        slide.exposed.slideClass.active = true;
        slide.exposed.slideClass[direction[1]] = true;
      } else if (i === newIndex) {
        slide.exposed.slideClass[direction[1]] = true;
      }
    });
    timeoutId = setTimeout(() => {
      _select(newIndex);
      emit('change', newIndex);
      timeoutId = 0;
    }, 600);
  });
}

function startInterval() {
  stopInterval();
  if (props.interval > 0) {
    intervalId = setInterval(() => {
      next();
    }, props.interval);
  }
}

function stopInterval() {
  clearInterval(intervalId);
  intervalId = 0;
}

function resetAllSlideClass() {
  slides.forEach((slide) => {
    slide.exposed.slideClass.active = false;
    slide.exposed.slideClass.left = false;
    slide.exposed.slideClass.right = false;
    slide.exposed.slideClass.next = false;
    slide.exposed.slideClass.prev = false;
  });
}

function _select(index) {
  resetAllSlideClass();
  slides[index].exposed.slideClass.active = true;
}

function select(index) {
  if (timeoutId !== 0 || index === activeIndex.value) {
    return;
  }
  if (isExist(props.modelValue)) {
    emit('update:modelValue', index);
  } else {
    run(index, activeIndex.value);
    activeIndex.value = index;
  }
}

function prev() {
  select(activeIndex.value === 0 ? slides.length - 1 : activeIndex.value - 1);
}

function next() {
  select(activeIndex.value === slides.length - 1 ? 0 : activeIndex.value + 1);
}

watch(
  () => props.interval,
  () => {
    startInterval();
  }
);

watch(
  () => props.modelValue,
  (index, oldValue) => {
    run(index, oldValue);
    activeIndex.value = index;
  }
);

onMounted(() => {
  if (isExist(props.modelValue)) {
    activeIndex.value = props.modelValue;
  }
  if (slides.length > 0) {
    _select(activeIndex.value);
  }
  startInterval();
});

onBeforeUnmount(() => {
  stopInterval();
});

defineExpose({
  slides,
});
</script>
