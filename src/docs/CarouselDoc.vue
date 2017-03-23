<template>
  <section id="carousel-doc">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Carousel" source-folder="carousel"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <carousel :indicators="indicators" :controls="controls" :interval="interval" ref="carousel">
          <slide v-for="(slide,index) in slides" :key="index">
            <div style="width: 100%;height: 300px;" :style="{background:index%2===0?'#99a9bf':'#d3dce6'}"></div>
            <div class="carousel-caption">
              <h3>This is {{slide.title}}</h3>
            </div>
          </slide>
        </carousel>
        <br/>
        <div class="well">
          <form class="form-inline">
            <button type="button" class="btn btn-default" @click="indicators=!indicators">Toggle Indicators</button>
            <button type="button" class="btn btn-default" @click="controls=!controls">Toggle Controls</button>
            <button type="button" class="btn btn-default" @click="pushSlide">Push Slide</button>
          </form>
          <br/>
          <form class="form-inline">
            <div class="form-group">
              <label>Interval</label>
              <input type="number" class="form-control" placeholder="e.g. 2000" step="1" min="0"
                     v-model.number="interval">
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Props (Carousel)</h4>
        <ul>
          <li>
            <p>
              <code>indicators: Boolean</code>
              <span>Show / hide the indicators. Default: true</span>
            </p>
          </li>
          <li>
            <p>
              <code>controls: Boolean</code>
              <span>Show / hide the controls. Default: true</span>
            </p>
          </li>
          <li>
            <p>
              <code>interval: Number</code>
              <span>Slides running interval time. Default: 2000</span>
            </p>
          </li>
        </ul>
        <h4>Methods (Carousel)</h4>
        <ul>
          <li>
            <p>
              <code>select(index: Number)</code>
              <span>Show slide @index</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-block demo-file="CarouselDoc.vue">
        <pre><code>
&lt;carousel&gt;
  &lt;slide&gt;...&lt;/slide&gt;
  &lt;slide&gt;...&lt;/slide&gt;
&lt;/carousel&gt;
        </code></pre>
        </demo-code-block>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import DemoCodeBlock from './architectures/DemoCodeBlock.vue'
  import Carousel from '../components/carousel/Carousel.vue'
  import Slide from '../components/carousel/Slide.vue'
  export default {
    components: {AnchorHeader, Carousel, Slide, DemoCodeBlock},
    data () {
      return {
        interval: 2000,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
