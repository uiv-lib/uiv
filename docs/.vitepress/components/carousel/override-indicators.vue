<template>
  <div class="uiv">
    <carousel>
      <slide v-for="(slide, index) in slides" :key="index">
        <div
          style="width: 100%; height: 400px"
          :style="{ background: index % 2 === 0 ? '#99a9bf' : '#d3dce6' }"
        ></div>
        <div class="carousel-caption">
          <h3>This is {{ slide.title }}</h3>
        </div>
      </slide>
      <!-- Use this slot for custom indicators -->
      <template #indicators="props">
        <ol class="carousel-indicators custom-carousel-indicators">
          <li
            v-for="(slide, index) in slides"
            :key="index"
            :class="{ active: index === props.activeIndex }"
            @click="props.select(index)"
          >
            <!-- Anything you like here -->
          </li>
        </ol>
      </template>
    </carousel>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const slides = reactive([
  { title: 'Slide 1' },
  { title: 'Slide 2' },
  { title: 'Slide 3' },
  { title: 'Slide 4' },
]);
</script>
<style>
.uiv .custom-carousel-indicators li,
.uiv .custom-carousel-indicators li.active {
  width: 50px !important;
  height: 8px !important;
  margin: 0 3px !important;
  border-radius: 0 !important;
}
</style>
