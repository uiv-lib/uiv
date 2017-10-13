<template>
  <section class="container-fluid" id="carousel-doc">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.carousel')" source-folder="carousel"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <carousel :indicators="indicators" :controls="controls" :interval="interval" ref="carousel" @change="change">
          <slide v-for="(slide,index) in slides" :key="index">
            <div style="width: 100%;height: 400px;" :style="{background:index%2===0?'#99a9bf':'#d3dce6'}"></div>
            <div class="carousel-caption">
              <h3>This is {{slide.title}}</h3>
            </div>
          </slide>
        </carousel>
        <br/>
        <div class="well">
          <form class="form-inline">
            <button type="button" class="btn btn-default" @click="indicators=!indicators">{{$t('carousel.toggleIndicators')}}</button>
            <button type="button" class="btn btn-default" @click="controls=!controls">{{$t('carousel.toggleControls')}}</button>
            <button type="button" class="btn btn-default" @click="pushSlide">{{$t('carousel.pushSlide')}}</button>
          </form>
          <br/>
          <form class="form-inline">
            <div class="form-group">
              <label>{{$t('carousel.interval')}}</label>
              <input type="number" class="form-control" placeholder="e.g. 2000" step="1" min="0"
                     v-model.number="interval">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="CarouselDoc.vue">
        <pre><code>
&lt;carousel v-model=&quot;index&quot;&gt;
  &lt;slide v-for=&quot;(slide,index) in slides&quot; :key=&quot;index&quot;&gt;
    ...
  &lt;/slide&gt;

  &lt;!-- If need custom indicators --&gt;
  &lt;template slot=&quot;indicators&quot;&gt;
    &lt;ol class=&quot;carousel-indicators&quot;&gt;
      &lt;li v-for=&quot;(slide,index) in slides&quot;
          :class=&quot;{active:index===currentIndex}&quot;
          @click=&quot;currentIndex = index&quot;&gt;&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/template&gt;
&lt;/carousel&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="carouselApi" folder="carousel" file="Carousel.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import ApiPanel from './../architecture/ApiPanel.vue'
  import Carousel from '../../components/carousel/Carousel.vue'
  import Slide from '../../components/carousel/Slide.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, Carousel, Slide, DemoCodePanel, ApiPanel},
    data () {
      return {
        carouselApi: {
          slots: [
            {
              name: 'indicators',
              desc: 'Override indicators, see example in code panel below.'
            }
          ],
          props: [
            {
              name: 'v-model',
              type: 'Number',
              desc: 'The current slide index, use this to manual change slide index.'
            },
            {
              name: 'indicators',
              type: 'Boolean',
              desc: 'Show / hide the indicators.',
              'default': true
            },
            {
              name: 'controls',
              type: 'Boolean',
              desc: 'Show / hide the controls.',
              'default': true
            },
            {
              name: 'interval',
              type: 'Number',
              desc: 'Slides running interval time.',
              'default': 2000
            },
            {
              name: 'icon-control-left',
              type: 'String',
              desc: 'The left control icon font class.',
              'default': 'glyphicon glyphicon-chevron-left'
            },
            {
              name: 'icon-control-right',
              type: 'String',
              desc: 'The right control icon font class.',
              'default': 'glyphicon glyphicon-chevron-right'
            }
          ],
          events: [
            {
              name: 'change',
              params: ['index'],
              desc: 'Fire after slide changed, with the index number changed to.'
            }
          ]
        },
        interval: 2000,
        indicators: true,
        controls: true,
        currentIndex: 0,
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
      },
      change (index) {
        // console.log('Slide change to', index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
