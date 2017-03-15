<template>
  <section>
    <div class="row">
      <div class="col-xs-12">
        <anchor-header text="Dropdown"></anchor-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="dropdowns">
          <dropdown id="dropdown-1" ref="dropdown1">
            <button data-role="trigger" class="btn btn-default dropdown-toggle" type="button">
              <span>Dropdown 1</span>
              <span class="caret"></span>
            </button>
            <ul slot="dropdown" class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </dropdown>
          <dropdown id="dropdown-2">
            <button data-role="trigger" class="btn btn-primary dropdown-toggle" type="button">
              <span>Dropdown 2</span>
              <span class="caret"></span>
            </button>
            <ul slot="dropdown" class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </dropdown>
          <dropdown id="dropdown-3" class="btn-group">
            <button type="button" class="btn btn-danger">Split Button</button>
            <button type="button" class="btn btn-danger dropdown-toggle" data-role="trigger">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul slot="dropdown" class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </dropdown>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Note</h4>
        <ul>
          <li>
            <p>Use as the original Bootstrap style.</p>
          </li>
          <li>
            <p>The element attached with <code>data-role="trigger"</code> will be the dropdown trigger.</p>
          </li>
        </ul>
        <h4>Props</h4>
        <ul>
          <li>
            <p>
              <code>tag:String</code>
              <span>The HTML tag that render the dropdown component. Default: 'div'</span>
            </p>
          </li>
        </ul>
        <h4>Slots</h4>
        <ul>
          <li>
            <p>
              <code>dropdown</code>
              <span>Replace as the dropdown body.</span>
            </p>
          </li>
          <li>
            <p>
              <code>default</code>
              <span>Replace as the rest of the component (e.g. trigger stuffs).</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import AnchorHeader from './architectures/AnchorHeader.vue'
  import Dropdown from './../components/Dropdown.vue'

  export default {
    components: {AnchorHeader, Dropdown}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .dropdowns {
    .dropdown {
      display: inline-block;
    }
  }
</style>
