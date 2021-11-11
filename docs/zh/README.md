---
home: true
heroImage: /assets/image/logo.png
heroText: uiv
tagline: 基于 Vue 2 的 Bootstrap 3 组件库
actionText: 使用教程
actionLink: /zh/usage/getting-started
features:
- title: 轻量
  details: 所有组件 Gzip 后约 20KB。
- title: 兼容
  details: IE 9 以上，以及现代浏览器支持。
- title: SSR
  details: 服务端渲染支持。
footer: MIT Licensed | Designed and built by @wxsm
---

::: tip
中文文档正在逐步完善中，欢迎提交 PR 至 [uiv-lib/website](https://github.com/uiv-lib/website)
:::

<p align="center">
<a href="https://github.com/uiv-lib/uiv"><img src="https://github.com/uiv-lib/uiv/workflows/CI/badge.svg" alt="Build Status"></a>
<a href="https://coveralls.io/github/uiv-lib/uiv?branch=dev"> <img src="https://coveralls.io/repos/github/uiv-lib/uiv/badge.svg?branch=dev" alt="Coverage Status"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://badgen.net/npm/dm/uiv" alt="NPM Downloads"></a>
<a href="https://www.npmjs.com/package/uiv"><img src="https://badgen.net/npm/v/uiv" alt="NPM Version"></a>
<a href="https://github.com/uiv-lib/uiv"><img src="https://badgen.net/github/license/uiv-lib/uiv" alt="License"></a>
</p>


### 安装

```shell script
$ yarn add uiv
```

### 使用

```javascript
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import * as uiv from 'uiv'

Vue.use(uiv)
```

<br/>
