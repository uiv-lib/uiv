<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-12">
        <anchor-header :text="$t('menu.collapse')" source-folder="collapse"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <h3 class="page-header">{{$t('common.basicExample')}}</h3>
        <div>
          <button type="button" class="btn btn-default" @click="showCollapse1=!showCollapse1">Click me!</button>
        </div>
        <collapse v-model="showCollapse1">
          <br/>
          <div class="well" style="margin-bottom: 0">Hi there.</div>
        </collapse>
        <h3 class="page-header">{{$t('collapse.accordion')}}</h3>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading" role="button" @click="toggleAccordion(0)">
              <h4 class="panel-title">Collapsible Group Item #1</h4>
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
              <h4 class="panel-title">Collapsible Group Item #2</h4>
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
              <h4 class="panel-title">Collapsible Group Item #3</h4>
            </div>
            <collapse v-model="showAccordion[2]">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              </div>
            </collapse>
          </div>
        </div>
        <h3 class="page-header">{{$t('collapse.navbar')}}</h3>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" @click="showNavbar=!showNavbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" role="button">Brand</a>
            </div>
            <collapse class="navbar-collapse" v-model="showNavbar">
              <ul class="nav navbar-nav">
                <li class="active"><a role="button">Link <span class="sr-only">(current)</span></a></li>
                <li><a role="button">Link</a></li>
                <dropdown tag="li">
                  <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown <span class="caret"></span></a>
                  <template slot="dropdown">
                    <li><a role="button">Action</a></li>
                    <li><a role="button">Another action</a></li>
                    <li><a role="button">Something else here</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a role="button">Separated link</a></li>
                  </template>
                </dropdown>
              </ul>
              <form class="navbar-form navbar-left">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
              </form>
              <ul class="nav navbar-nav navbar-right">
                <li><a role="button">Link</a></li>
                <dropdown tag="li">
                  <a class="dropdown-toggle" role="button" data-role="trigger">Dropdown <span class="caret"></span></a>
                  <template slot="dropdown">
                    <li><a role="button">Action</a></li>
                    <li><a role="button">Another action</a></li>
                    <li><a role="button">Something else here</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a role="button">Separated link</a></li>
                  </template>
                </dropdown>
              </ul>
            </collapse>
          </div>
        </nav>
        <p>{{$t('collapse.navbarNote')}}</p>
        <ul>
          <li v-html="$t('collapse.navbarNote1')"></li>
          <li v-html="$t('collapse.navbarNote2')"></li>
        </ul>
        <br/>
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
  import ApiPanel from '../architecture/ApiPanel.vue'
  import Collapse from '../../../src/components/collapse/Collapse.vue'
  import Dropdown from '../../../src/components/dropdown/Dropdown.vue'
  import hljsMixin from '../../mixins/hljsMixin'

  export default {
    mixins: [hljsMixin],
    components: {AnchorHeader, DemoCodePanel, Collapse, ApiPanel, Dropdown},
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
            },
            {
              name: 'transition-duration',
              type: 'Number',
              desc: 'Collapse transition speed. Set to 0 to disable transition.',
              'default': 350
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
        showAccordion: [true, false, false],
        showNavbar: false
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
