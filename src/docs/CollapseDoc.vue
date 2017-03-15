<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Collapse"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <h3>Basic Example</h3>
        <div>
          <button type="button" class="btn btn-default" @click="showCollapse1=!showCollapse1">Click me!</button>
        </div>
        <br/>
        <collapse :show="showCollapse1">
          <div class="well">
            Hi there.
          </div>
        </collapse>
        <h3>Accordion Example</h3>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a role="button" @click="showAccordion1=!showAccordion1">Collapsible Group Item #1</a>
              </h4>
            </div>
            <collapse :show="showAccordion1">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              </div>
            </collapse>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a role="button" @click="showAccordion2=!showAccordion2">Collapsible Group Item #2</a>
              </h4>
            </div>
            <collapse :show="showAccordion2">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              </div>
            </collapse>
          </div>
          <div class="panel panel-info">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a role="button" @click="showAccordion3=!showAccordion3">Collapsible Group Item #3</a>
              </h4>
            </div>
            <collapse :show="showAccordion3">
              <div class="panel-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              </div>
            </collapse>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Note</h4>
        <ul>
          <li>
            <p>You may use it on any element that needs collapse.</p>
          </li>
          <li>
            <p>The Collapse component controls only show / hide, advance logic (e.g. accordion once at a time) should be
              implement by yourself.</p>
          </li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li>
            <p>
              <code>tag:String</code>
              <span>The HTML tag that render the collapse component. Default: 'div'</span>
            </p>
          </li>
          <li>
            <p>
              <code>show:Boolean</code>
              <span>Show / hide the component. Default: false</span>
            </p>
          </li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li>
            <p>
              <code>default</code>
              <span>Replace as the collapse body</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import Collapse from './../components/Collapse.vue'

  export default {
    components: {AnchorHeader, Collapse},
    data () {
      return {
        showCollapse1: false,
        showAccordion1: false,
        showAccordion2: false,
        showAccordion3: false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .dropdowns {
    .dropdown {
      display: inline-block;
    }
  }
</style>
