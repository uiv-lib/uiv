<template>
  <div class="uiv">
    <carousel
      icon-control-left="my-icon glyphicon glyphicon-arrow-left"
      icon-control-right="my-icon glyphicon glyphicon-arrow-right"
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
/* Using custom icons may require some additional CSS declarations */
.uiv .carousel-control .my-icon {
  position: absolute;
  top: 50%;
  margin-top: -10px;
}
</style>
