# Collapse

> Flexible plugin for easy toggle behavior.

## Example

Click the button below to show and hide another element.

```html
<template>
  <div>
    <button type="button" class="btn btn-primary" @click="show=!show">Click me!</button>
  </div>
  <br/>
  <collapse v-model="show">
    <div class="well" style="margin-bottom: 0">Hi there.</div>
  </collapse>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    }
  }
</script>

<!-- Live demo -->
```

### Accordion Example

Extend the default collapse behavior to create an accordion with the panel component.

```html
<template>
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
</template>

<script>
  export default {
    data () {
      return {
        showAccordion: [true, false, false]
      }
    },
    methods: {
      toggleAccordion (index) {
        if (this.showAccordion[index]) {
          this.$set(this.showAccordion, index, false)
        } else {
          this.showAccordion = this.showAccordion.map((v, i) => i === index)
        }
      }
    }
  }
</script>

<!-- Live demo -->
```

## Navbar Example

**Note**:

* Change viewport to **mobile size** to view the collapse part.
* Remember to add `class="navbar-collapse"` to the collapse component.

```html
<template>
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
</template>

<script>
  export default {
    data () {
      return {
        showNavbar: false
      }
    }
  }
</script>

<!-- Live demo -->
```

# API Reference

## [Collapse.vue](https://github.com/wxsms/uiv/tree/master/src/components/collapse/Collapse.vue)


<div class="table-responsive">
  <table class="table table-bordered">
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Props</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th width="50px">Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>v-model</code></td>
      <td>Boolean</td>
      <td>false</td>
      <td><i class="glyphicon glyphicon-ok"></i></td>
      <td>Show / hide the component</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>tag</code></td>
      <td>String</td>
      <td>div</td>
      <td></td>
      <td>The HTML tag that render the collapse component</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>transition-duration</code></td>
      <td>Number</td>
      <td>350</td>
      <td></td>
      <td>Collapse transition speed. Set to 0 to disable transition.</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Slots</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th colspan="4">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>default</code></td>
      <td colspan="4">Replace as the collapse body</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td colspan="5"><span class="label label-default">Events</span></td>
    </tr>
    <tr>
      <th>Name</th>
      <th>Params</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>show</code></td>
      <td></td>
      <td colspan="3">This event fires immediately when the v-model prop is set to true.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>shown</code></td>
      <td></td>
      <td colspan="3">
        This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).
      </td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hide</code></td>
      <td></td>
      <td colspan="3">This event is fired immediately when the v-model prop is set to false.</td>
    </tr>
    <tr>
      <td nowrap="nowrap"><code>hidden</code></td>
      <td></td>
      <td colspan="3">
        This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete).
      </td>
    </tr>
    </tbody>
  </table>
</div>


<!-- Live demo script
<script>
  export default {
    data () {
      return {
        show: false,
        showAccordion: [true, false, false],
        showNavbar: false
      }
    },
    methods: {
      toggleAccordion (index) {
        if (this.showAccordion[index]) {
          this.$set(this.showAccordion, index, false)
        } else {
          this.showAccordion = this.showAccordion.map((v, i) => i === index)
        }
      }
    }
  }
</script>
-->
