# uiv 

[![Build Status](https://travis-ci.org/wxsms/uiv.svg?branch=master)](https://travis-ci.org/wxsms/uiv)
[![Coverage Status](https://coveralls.io/repos/github/wxsms/uiv/badge.svg?branch=master)](https://coveralls.io/github/wxsms/uiv?branch=master)
[![license](https://img.shields.io/github/license/wxsms/uiv.svg)](https://github.com/wxsms/uiv)

[![NPM](https://nodei.co/npm/uiv.png)](https://npmjs.org/package/uiv)

> Bootstrap components implemented by Vue

[Demo & Docs](https://wxsm.space/uiv)

## Dependencies:

* **Vue 2** (tested on ^2.2.1)
* **Bootstrap 3 CSS** (tested on ^3.3.7)

## Supported Browsers

Components and directives are tested with the following browsers:

* Chrome
* Firefox
* Safari
* IE 9 / 10 / 11

## Install

uiv is using Webpack UMD exporter, which means you can use it in both:

* **ES6**
* **CommonJS**
* **AMD**
* **Browser**

You can simply include uiv into you js files or HTML page and start working.

### ES6 Sample

```js
$ npm install uiv

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
<script>
  new Vue({
    components: {
      Tabs: uiv.Tabs, Tab: uiv.Tab
    }
  })
</script>
```

## Build Setup

```bash
# install dependencies
npm install

# serve docs with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build docs
npm run build-docs

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## License

MIT
