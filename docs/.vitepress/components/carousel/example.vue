<template>
  <section class="uiv">
    <carousel
      ref="carousel"
      :indicators="indicators"
      :controls="controls"
      :interval="interval"
    >
      <slide v-for="(slide, index) in slides" :key="index">
        <div
          style="width: 100%; height: 400px"
          :style="{ background: index % 2 === 0 ? '#99a9bf' : '#d3dce6' }"
        ></div>
        <div class="carousel-caption">
          <h3>This is {{ slide.title }}</h3>
        </div>
      </slide>
    </carousel>
    <br />
    <form class="form-inline">
      <btn @click="indicators = !indicators">Toggle Indicators</btn>
      <btn @click="controls = !controls">Toggle Controls</btn>
      <btn @click="pushSlide">Push Slide</btn>
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
  </section>
</template>
<script setup>
import { reactive, ref } from 'vue';

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
