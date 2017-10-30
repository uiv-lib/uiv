# Collapse

> Flexible plugin for easy toggle behavior.

## Example

Click the button below to show and hide another element.

```html
<template>
  <section>
    <div>
      <button type="button" class="btn btn-primary" @click="show=!show">Click me!</button>
    </div>
    <br/>
    <collapse v-model="show">
      <div class="well" style="margin-bottom: 0">Hi there.</div>
    </collapse>
  </section>
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
<!-- collapse-example.vue -->
```

## Accordion

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
<!-- collapse-accordion.vue -->
```

## Navbar

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
            <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
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
<!-- collapse-navbar.vue -->
```

# API Reference

## [Collapse.vue](https://github.com/wxsms/uiv/tree/master/src/components/collapse/Collapse.vue)

### Props

Name                  | Type       | Default  | Required | Description
----------------      | ---------- | -------- | -------- | -----------------------
`v-model`             | Boolean    | false    | &#10004; | Show / hide the component.
`tag`                 | String     | div      |          | The HTML tag that render the collapse component.
`transition-duration` | Number     | 350      |          | Collapse transition speed. Use 0 to disable transition.

### Slots

Name      | Description
--------- | -----------------------
`default` | Replace as the collapse body.

### Events

Name        | Params | Description
----------- | ------ | ---------------
`show`      |        | This event fires immediately when the v-model prop is set to true.
`shown`     |        | This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).
`hide`      |        | 	This event is fired immediately when the v-model prop is set to false.
`hidden`    |        | This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete).
