# Getting Started

## Introduction

Bootstrap 3 components implemented by Vue 2.

* **Lightweight**: ~14KB Gziped, Dependencies only Vue & Bootstrap CSS
* **SSR** (server-side rendering) supported.
* ES6 / CommonJS / AMD / Browser supported.

#### Browser Compatibility

All browsers supported by [Vue 2](https://github.com/vuejs/vue) and [Bootstrap 3 CSS](https://github.com/twbs/bootstrap) are suppose to be also supported by this lib  (IE8 and below are not supported).

## Install

### CDN

```html
<!-- Load Vue from CDN -->
<script src="//vuejs.org/js/vue.min.js"></script>

<!-- Load uiv from CDN -->
<script src="//unpkg.com/uiv/dist/uiv.min.js"></script>
```

### NPM

It is recommended to use NPM as package manager and ES6 / Webpack to develop Vue projects.

```bash
$ npm install uiv --save
```

## Usage

### ES6 Sample

```javascript
$ npm install uiv

// Import and register all components once
import * as uiv from 'uiv'
Vue.use(uiv)

// Or import respectively
import { Dropdown } from 'uiv'

new Vue({
  components: {
    Dropdown
  }
})
```

### Browser Sample

```html
<tabs>
  <tab>...</tab>
  <tab>...</tab>
</tabs>

<script src="path/to/vue.min.js"></script>
<script src="path/to/uiv.min.js"></script>

<!-- No need to install uiv, we already do this for you after script loaded. -->

<script>
  new Vue({
    components: {
      Tabs: uiv.Tabs, Tab: uiv.Tab
    }
  })
</script>
```


