<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Collapse" source-folder="collapse"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3>Basic Example</h3>
        <div>
          <button type="button" class="btn btn-default" @click="showCollapse1=!showCollapse1">Click me!</button>
        </div>
        <br/>
        <collapse v-model="showCollapse1">
          <div class="well">
            Hi there.




          </div>
        </collapse>
        <h3>Accordion</h3>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading" role="button" @click="toggleAccordion(0)">
              <h4 class="panel-title">
                Collapsible Group Item #1
              </h4>
            </div>
            <collapse v-model="showAccordion[0]">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.




              </div>
            </collapse>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading" role="button" @click="toggleAccordion(1)">
              <h4 class="panel-title">
                Collapsible Group Item #2
              </h4>
            </div>
            <collapse v-model="showAccordion[1]">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.




              </div>
            </collapse>
          </div>
          <div class="panel panel-info">
            <div class="panel-heading" role="button" @click="toggleAccordion(2)">
              <h4 class="panel-title">
                Collapsible Group Item #3
              </h4>
            </div>
            <collapse v-model="showAccordion[2]">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.




              </div>
            </collapse>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <demo-code-panel demo-file="CollapseDoc.vue">
        <pre><code>
&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; @click=&quot;showCollapse1=!showCollapse1&quot;&gt;Click me!&lt;/button&gt;

&lt;collapse v-model=&quot;showCollapse1&quot;&gt;
  &lt;div class=&quot;well&quot;&gt;
    Hi there.
  &lt;/div&gt;
&lt;/collapse&gt;
        </code></pre>
        </demo-code-panel>
        <api-panel :api="api" folder="collapse" file="Collapse.vue"></api-panel>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from '../architecture/AnchorHeader.vue'
  import DemoCodePanel from '../architecture/DemoCodePanel.vue'
  import ApiPanel from './../architecture/ApiPanel.vue'
  import Collapse from '../../components/collapse/Collapse.vue'
  import hljsMixin from './../mixins/hljsMixin'
  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Collapse, ApiPanel},
    data () {
      return {
        api: {
          props: [
            {
              name: 'v-model',
              type: 'Boolean',
              desc: 'Show / hide the component',
              'default': false,
              required: true
            },
            {
              name: 'tag',
              type: 'String',
              desc: 'The HTML tag that render the collapse component',
              'default': 'div'
            }
          ],
          slots: [
            {
              name: 'default',
              desc: 'Replace as the collapse body'
            }
          ]
        },
        showCollapse1: false,
        showAccordion: [true, false, false]
      }
    },
    methods: {
      toggleAccordion (index) {
        if (this.showAccordion[index]) {
          this.showAccordion[index] = false
        } else {
          for (let i = 0; i < this.showAccordion.length; i++) {
            this.showAccordion[i] = false
          }
          this.showAccordion[index] = true
        }
        this.showAccordion = this.showAccordion.map(v => v)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
