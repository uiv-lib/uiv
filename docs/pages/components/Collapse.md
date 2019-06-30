# Collapse

> Flexible plugin for easy toggle behavior.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

## Example

Click the button below to show and hide another element.

```html
<template>
  <section>
    <div>
      <btn type="primary" @click="show=!show">Click me!</btn>
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

# API Reference

## [Collapse](https://github.com/wxsms/uiv/blob/master/src/components/collapse/Collapse.vue)

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
