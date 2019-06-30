# Carousel

> A slideshow component for cycling through elements, like a carousel. **Nested carousels are not supported**.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

## Example

```html
<template>
  <section>
    <carousel :indicators="indicators" :controls="controls" :interval="interval" ref="carousel">
      <slide v-for="(slide, index) in slides" :key="index">
        <div style="width: 100%;height: 400px;" :style="{background:index % 2 === 0? '#99a9bf' : '#d3dce6'}"></div>
        <div class="carousel-caption">
          <h3>This is {{slide.title}}</h3>
        </div>
      </slide>
    </carousel>
    <br/>
    <form class="form-inline">
      <btn @click="indicators=!indicators">Toggle Indicators</btn>
      <btn @click="controls=!controls">Toggle Controls</btn>
      <btn @click="pushSlide">Push Slide</btn>
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon">Interval</span>
          <input type="number" class="form-control" step="1" min="0" v-model.number="interval" style="width: 100px">
          <span class="input-group-addon">ms</span>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        interval: 5000,
        indicators: true,
        controls: true,
        slides: [
          {title: 'Slide 1'},
          {title: 'Slide 2'},
          {title: 'Slide 3'},
          {title: 'Slide 4'}
        ]
      }
    },
    methods: {
      pushSlide () {
        this.slides.push({title: `Slide ${this.slides.length + 1}`})
      }
    }
  }
</script>
<!-- carousel-example.vue -->
```

## Override indicators

Use the `indicators` slot to override default Bootstrap indicators. 

This is a scoped slot, use `slot-scope="props"` in Vue 2.5+, otherwise `scope="props"`.

```html
<template>
  <carousel>
    <slide v-for="(slide, index) in slides" :key="index">
      <div style="width: 100%;height: 400px;" :style="{background:index % 2 === 0 ? '#99a9bf' : '#d3dce6'}"></div>
      <div class="carousel-caption">
        <h3>This is {{slide.title}}</h3>
      </div>
    </slide>
    <!-- Use this slot for custom indicators -->
    <template slot="indicators" slot-scope="props">
      <ol class="carousel-indicators custom-carousel-indicators">
        <li v-for="(slide, index) in slides"
            :class="{active:index === props.activeIndex}"
            @click="props.select(index)">
            <!-- Anything you like here -->
        </li>
      </ol>
    </template>
  </carousel>
</template>
<script>
  export default {
    data () {
      return {
        slides: [
          {title: 'Slide 1'},
          {title: 'Slide 2'},
          {title: 'Slide 3'},
          {title: 'Slide 4'}
        ]
      }
    }
  }
</script>
<style>
  .custom-carousel-indicators li, .custom-carousel-indicators li.active {
    width: 50px;
    height: 8px;
    margin: 0 3px;
    border-radius: 0;
  }
</style>
<!-- carousel-override-indicators.vue -->
```

## Custom icons

**Note**: Bootstrap 3 has only 2 sets of icon supported for carousel at present:

* `glyphicon glyphicon-chevron-left` and `glyphicon glyphicon-chevron-right` (default)
* `icon-prev` and `icon-next`

Additional CSS may needed if you prefer other icons or font... 

Here is an example using `glyphicon-arrow-left` and `glyphicon-arrow-right`.

```html
<template>
  <carousel icon-control-left="my-icon glyphicon glyphicon-arrow-left" icon-control-right="my-icon glyphicon glyphicon-arrow-right">
    <slide v-for="(slide, index) in slides" :key="index">
      <div style="width: 100%;height: 400px;" :style="{background:index % 2 === 0 ? '#99a9bf' : '#d3dce6'}"></div>
      <div class="carousel-caption">
        <h3>This is {{slide.title}}</h3>
      </div>
    </slide>
  </carousel>
</template>
<script>
  export default {
    data () {
      return {
        slides: [
          {title: 'Slide 1'},
          {title: 'Slide 2'},
          {title: 'Slide 3'},
          {title: 'Slide 4'}
        ]
      }
    }
  }
</script>
<style>
/* Using custom icons may require some additional CSS declarations */
.carousel-control .my-icon {
  position: absolute;
  top: 50%;
  margin-top: -10px;
}
</style>
<!-- carousel-icons.vue -->
```

# API Reference

## [Carousel](https://github.com/wxsms/uiv/blob/master/src/components/carousel/Carousel.vue)

### Props

Name                 | Type       | Default                           | Required | Description
----------------     | ---------- | --------------------------------- | -------- | -----------------------
`v-model`            | Number     |                                   |          | The current slide index, use this to manual change slide index.
`indicators`         | Boolean    | true                              |          | Show / hide the indicators.
`controls`           | Boolean    | true                              |          | Show / hide the controls.
`interval`           | Number     | 5000                              |          | Slides running interval time in ms. Use `0` to stop interval.
`icon-control-left`  | String     | glyphicon glyphicon-chevron-left  |          | The left control icon font class.
`icon-control-right` | String     | glyphicon glyphicon-chevron-right |          | The right control icon font class.

### Slots

Name         | Description
---------    | -----------------------
`default`    | The carousel body.
`indicators` | Override indicators. This is a scoped slot with `activeIndex` prop and `select` method. See example section above for usage details.

### Events

Name        | Params | Description
----------- | ------ | ---------------
`change`    | index  | Fire after slide changed, with the index number changed to.
