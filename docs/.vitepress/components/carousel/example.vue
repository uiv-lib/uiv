<template>
  <Carousel
    ref="carousel"
    :indicators="indicators"
    :controls="controls"
    :interval="interval"
  >
    <Slide v-for="(slide, index) in slides" :key="index">
      <div
        style="width: 100%; height: 400px"
        :style="{ background: index % 2 === 0 ? '#99a9bf' : '#d3dce6' }"
      ></div>
      <div class="carousel-caption">
        <h3>This is {{ slide.title }}</h3>
      </div>
    </Slide>
  </Carousel>
  <br />
  <form class="form-inline">
    <Btn @click="indicators = !indicators">Toggle Indicators</Btn>
    <Btn @click="controls = !controls">Toggle Controls</Btn>
    <Btn @click="pushSlide">Push Slide</Btn>
    <div class="form-group">
      <div class="input-group">
        <span class="input-group-addon">Interval</span>
        <input
          v-model.number="interval"
          type="number"
          class="form-control"
          step="1"
          min="0"
          style="width: 100px"
        />
        <span class="input-group-addon">ms</span>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Carousel, Slide, Btn } from 'uiv';

const interval = ref(5000);
const indicators = ref(true);
const controls = ref(true);
const slides = reactive([
  { title: 'Slide 1' },
  { title: 'Slide 2' },
  { title: 'Slide 3' },
  { title: 'Slide 4' },
]);

function pushSlide() {
  slides.push({ title: `Slide ${slides.length + 1}` });
}
</script>
