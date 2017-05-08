<p align="center">
<img src="https://raw.githubusercontent.com/wxsms/wxsms-img-holder/master/uiv-logo.png" alt="uiv-logo.png">
</p>

<p align="center">
<a href="https://travis-ci.org/wxsms/uiv"><img src="https://travis-ci.org/wxsms/uiv.svg?branch=master" alt="Build Status"></a>
<a href="https://coveralls.io/github/wxsms/uiv?branch=master"><img src="https://coveralls.io/repos/github/wxsms/uiv/badge.svg?branch=master" alt="Coverage Status"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://img.shields.io/npm/dm/uiv.svg" alt="NPM Downloads"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://img.shields.io/npm/v/uiv.svg" alt="NPM Version"></a>
<a href="https://github.com/wxsms/uiv"><img src="https://img.shields.io/github/license/wxsms/uiv.svg" alt="License"></a>
</p>

## Intro

Bootstrap 3  components implemented by Vue 2.

[Demo & Docs](https://uiv.wxsm.space)

## Dependencies

* **Vue 2** (tested on ^2.2.6)
* **Bootstrap 3 CSS** (tested on ^3.3.7)

## Supported Browsers

Components and directives are tested with the following browsers:

* Chrome
* Firefox
* Safari
* Edge
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
