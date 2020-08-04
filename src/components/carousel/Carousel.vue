<template>
  <div class="carousel slide" data-ride="carousel" @mouseenter="stopInterval" @mouseleave="startInterval">
    <slot v-if="indicators" name="indicators" :select="select" :active-index="activeIndex">
      <ol class="carousel-indicators">
        <li v-for="(slide, index) in slides" :class="{active: index === activeIndex}" @click="select(index)"></li>
      </ol>
    </slot>
    <div class="carousel-inner" role="listbox">
      <slot></slot>
    </div>
    <a class="left carousel-control" href="#" role="button" v-if="controls" @click.prevent="prev()">
      <span :class="iconControlLeft" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#" role="button" v-if="controls" @click.prevent="next()">
      <span :class="iconControlRight" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script src="./Carousel.js"/>
