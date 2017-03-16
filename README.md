# uiv 

[![Build Status](https://travis-ci.org/wxsms/uiv.svg?branch=master)](https://travis-ci.org/wxsms/uiv)
[![Coverage Status](https://coveralls.io/repos/github/wxsms/uiv/badge.svg?branch=master)](https://coveralls.io/github/wxsms/uiv?branch=master)
[![license](https://img.shields.io/github/license/wxsms/uiv.svg)](https://github.com/wxsms/uiv)

[![NPM](https://nodei.co/npm/uiv.png)](https://npmjs.org/package/uiv)

> Bootstrap components implemented by Vue

[Demo](https://wxsm.space/uiv)

Dependencies:

* **Vue** (tested on ^2.2.1)
* **Bootstrap CSS** (tested on ^3.3.7)

## Install

### ES6

```js
$ npm install uiv

import { Dropdown } from 'uiv'

new Vue({
  components: {
    Dropdown
  }``
})
```

### CommonJS

```js
$ npm install uiv

const Dropdown = require('uiv').Dropdown

new Vue({
  components: {
    Dropdown
  }``
})
```

### Browser

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
