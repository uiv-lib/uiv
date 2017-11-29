<p align="center">
<img src="https://raw.githubusercontent.com/wxsms/uiv/master/static/logo.png" alt="uiv-logo.png">
</p>

<p align="center">
<a href="https://travis-ci.org/wxsms/uiv"><img src="https://travis-ci.org/wxsms/uiv.svg?branch=master" alt="Build Status"></a>
<a href="https://coveralls.io/github/wxsms/uiv?branch=master"><img src="https://coveralls.io/repos/github/wxsms/uiv/badge.svg?branch=master" alt="Coverage Status"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://img.shields.io/npm/dm/uiv.svg" alt="NPM Downloads"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://img.shields.io/npm/v/uiv.svg" alt="NPM Version"></a>
<a href="https://github.com/wxsms/uiv"><img src="https://img.shields.io/github/license/wxsms/uiv.svg" alt="License"></a>
</p>

## Introduction

**uiv** is a Bootstrap 3 component lib implemented by Vue 2.

* **Lightweight**
  * All components **~22KB** Gziped.
  * Dependencies only **Vue & Bootstrap CSS**.
  * No extra CSS.
  * Individually import supported.
* IE 9+ & modern browsers supported.
* **SSR** (server-side rendering) supported.
* ES6 / CommonJS / AMD / Browser supported.

## Documentation

To check out live examples and docs, visit [https://uiv.wxsm.space](https://uiv.wxsm.space).

## Install

If you are using module bundlers such as Webpack, you can directly include package into your project via:

**NPM**:

```bash
$ npm install uiv --save
```

or **Yarn**:

```bash
$ yarn add uiv
```

Then register uiv components and directives all at once in your app's entry:

```javascript
// main.js
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import * as uiv from 'uiv'

Vue.use(uiv)
```

That's it. Happy coding!

### No Conflict

All components & directives will be installed with no prefix by default, you can add any prefix to them to avoid conflicts with other libs if needed.

For example:

```javascript
Vue.use(uiv, {prefix: 'uiv'})
```

Results in:

* Components such as `<alert>` becomes `<uiv-alert>`
* Directives such as `v-tooltip` becomes `v-uiv-tooltip`
* Global methods such as `$alert` becomes `$uiv_alert`

## Import Individually

If you don't want all of the components for some reason (e.g. to save the bundle size), you can also import them individually.

### Example

```javascript
import { Alert } from 'uiv'

new Vue({
  components: {
    Alert
  }
})
```

## Browsers

You can load & install uiv package directly in browsers.

```html
<!-- Remember to import Vue and Bootstrap CSS file before this! -->
<!-- load uiv via unpkg -->
<script src="//unpkg.com/uiv/dist/uiv.min.js"></script>
<!-- or jsDelivr -->
<script src="//cdn.jsdelivr.net/npm/uiv/dist/uiv.min.js"></script>
```

These will simply load the latest `uiv.min.js` into your page. For detail usages (e.g. load specify version, IMPORTANT in production mode), you can visit:

* [https://unpkg.com](https://unpkg.com)
* [https://www.jsdelivr.com](https://www.jsdelivr.com/)

### Complete Usage Example

```html
<!-- index.html -->
<html>
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script type="text/javascript" src="//vuejs.org/js/vue.min.js"></script>
  <script type="text/javascript" src="//unpkg.com/uiv/dist/uiv.min.js"></script>
</head>
<body>
<div id="app">
  <tabs>
    <tab>Tab content 1.</tab>
    <tab>Tab content 2.</tab>
  </tabs>
</div>
<script>
  // No need to install uiv, we already do this for you after script loaded.
  new Vue().$mount('#app')
</script>
</body>
</html>
```

This will create a working **Tabs** component on your page.

## Browser Compatibility

All browsers supported by [Vue 2](https://github.com/vuejs/vue) and [Bootstrap 3 CSS](https://github.com/twbs/bootstrap) are suppose to be also supported by this lib  (IE8 and below are not supported).

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/wxsms/uiv/releases).

## Contribute

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

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
