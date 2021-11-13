---
home: true
heroImage: /assets/image/logo.png
heroText: uiv
tagline: Bootstrap 3 Components implemented by Vue.
actionText: Getting Started
actionLink: /usage/getting-started
features:
- title: Lightweight
  details: All components ~20KB Gziped.
- title: Vue 3
  details: Vue 3 supported.
- title: SSR
  details: Server-side rendering supported.
footer: MIT Licensed | Designed and built by @wxsm
---

:::tip
This version of uiv is for **Vue.js v3**, if you're looking for the old one for v2, please visit [uiv-v1.wxsm.space](https://uiv-v1.wxsm.space/).
:::

<p align="center">
<a href="https://github.com/uiv-lib/uiv"><img src="https://github.com/uiv-lib/uiv/workflows/CI/badge.svg" alt="Build Status"></a>
<a href="https://coveralls.io/github/uiv-lib/uiv?branch=dev"> <img src="https://coveralls.io/repos/github/uiv-lib/uiv/badge.svg?branch=dev" alt="Coverage Status"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://badgen.net/npm/dm/uiv" alt="NPM Downloads"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://badgen.net/npm/v/uiv" alt="NPM Version"></a>
<a href="https://github.com/uiv-lib/uiv"><img src="https://badgen.net/github/license/uiv-lib/uiv" alt="License"></a>
</p>


### Install

```shell script
$ npm i uiv --save
```

### Usage

```javascript
// main.js
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import * as uiv from 'uiv'

const app = createApp({ ... })

app.use(uiv)

app.mount(...)
```

<br/>
