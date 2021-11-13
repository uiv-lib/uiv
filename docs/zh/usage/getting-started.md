# 使用教程

**uiv** 是一个基于 Vue 2 的 Bootstrap 3 组件库。

* **轻量**
  * 所有组件 Gzip 后约 **20KB**。
  * 没有额外的 CSS 样式。
  * 支持独立引入。
* IE 9 以上，以及现代浏览器支持。
* **SSR** (服务端渲染) 支持。
* 各类打包环境支持：
  * UMD 构建 `uiv.min.js` 可以在所有环境中使用（包括浏览器）
  * ES Module 构建 `uiv.esm.js` 供现代打包工具使用，如 [webpack 2](https://webpack.js.org) 或 [rollup](https://rollupjs.org)
  * CommonJS 构建 `uiv.common.js` 供老式打包工具使用，如 [browserify](http://browserify.org) 或 [webpack 1](https://webpack.github.io).

## 安装

如果你正在使用模块打包工具（如 Webpack），可以直接通过 npm 安装：

**NPM**:

```bash
$ npm install uiv --save
```

或 **Yarn**:

```bash
$ yarn add uiv
```

然后一次性将所有组件与指令等注册到全局：

```javascript
// main.js
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import * as uiv from 'uiv'

Vue.use(uiv)
```

就好了。

### 无冲突模式

默认情况下所有组件与指令在安装时都没有注入前缀，如有需要，可以通过增加前缀来避免与其它库冲突。

举例：

```javascript
Vue.use(uiv, {prefix: 'uiv'})
```

将导致：

* 组件如 `<alert>` 将变为 `<uiv-alert>`
* 指令如 `v-tooltip` 将变为 `v-uiv-tooltip`
* 全局方法如 `$alert` 将变为 `$uiv_alert`

## 独立引入

如果你不需要一次性引入所有组件（如希望减小包体大小），同样可以将它们独立引入。

### 样例

```javascript
import { Alert } from 'uiv'
// 或
// import Alert from 'uiv/dist/Alert'

new Vue({
  components: {
    Alert
  }
})
```

::: tip
从 `uiv/dist/something` 导入将保证可以节省包体大小，其它方式则未必（取决于打包工具的剪枝能力）。
:::

## 浏览器

你可以直接从将 uiv 库加载到浏览器中使用，如：

```html
<!-- 在此之间记得先加载 Vue.js 与 Bootstrap CSS！ -->
<script src="//unpkg.com/uiv"></script>
```

会直接将 `uiv.min.js` 加载到你的页面中去。 详细用法（如指定版本号，在生产环境中十分重要）以及其他 CDN 供应商，可以访问以下链接：

* [https://unpkg.com](https://unpkg.com)
* [https://www.jsdelivr.com](https://www.jsdelivr.com/)
* [https://cdnjs.com/libraries/uiv](https://cdnjs.com/libraries/uiv)

### 完整样例

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
  // 不需要安装 uiv，当 script 加载完后已经自动安装了，
  // 如果需要自定义安装参数，可以通过在这之前定义 `window.__uiv_options` 来实现。
  new Vue().$mount('#app')
</script>
</body>
</html>
```

这段代码将会在页面上创建一个可使用的 [Tabs](/components/tabs.html) 组件。

## 浏览器兼容性

所有支持 [Vue 2](https://github.com/vuejs/vue) 与 [Bootstrap 3 CSS](https://github.com/twbs/bootstrap) 的浏览器都能够兼容本库。

::: warning
IE8 及以下不在支持范围内。
:::
