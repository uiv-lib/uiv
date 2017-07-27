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

:gem: **[Demo & Docs](https://uiv.wxsm.space)**

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

uiv is using UMD exporter, which means you can use it in both ES6 / CommonJS / AMD / Browser.

### ES6 Sample

```js
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

<!-- Import and register all components once -->
<script>
  Vue.use(uiv)
</script>

<!-- Or import respectively -->
<script>
  new Vue({
    components: {
      Tabs: uiv.Tabs, Tab: uiv.Tab
    }
  })
</script>
```

## Contribute

Welcome and thanks to use and contribute to this project. Your support is very important.

If you found any problem / bug during the use of uiv, or have any suggustion that can make this lib better, please [create an issue](https://github.com/wxsms/uiv/issues/new). 

Pull requests are also welcome! However, before you started working on a PR, it is highly recommend to **create an issue with your idea first**, so people can know what's going to happen and avoid duplicated work.

## Build Setup

```bash
# install dependencies
npm install

# serve demos & docs with hot reload at localhost:8080
npm run dev

# build uiv lib
npm run build

# build document
npm run build-docs

# run all tests
npm test
```

## License

MIT
