# Getting Started

**uiv** is a Bootstrap 3 component lib implemented by Vue.

* **Lightweight**
  * All components **~20KB** Gziped.
  * No extra CSS file.
  * Individually import supported.
* **Vue 3** supported.
* **SSR** (server-side rendering) supported.
* All env supported:
  * UMD build `uiv.min.js` can be used in all environments (including browser)
  * ES Module build `uiv.esm.js` is for modern bundlers like [webpack 2](https://webpack.js.org) or [rollup](https://rollupjs.org)
  * CommonJS build `uiv.common.js` is for older bundlers like [browserify](http://browserify.org) or [webpack 1](https://webpack.github.io).

## Versions

uiv version | Vue.js version | document
----------- | -------        | -----------
2.x         | 3.x            | [https://uiv.wxsm.space](https://uiv.wxsm.space)
1.x         | 2.x            | [https://uiv-v1.wxsm.space](https://uiv-v1.wxsm.space)
0.x         | 2.x            | [https://uiv-v0.wxsm.space](https://uiv-v0.wxsm.space)

## Install

If you are using module bundlers such as Webpack, you can directly include package into your project via:

```bash
$ npm i uiv --save
```

Then register uiv components and directives all at once in your app's entry:

```javascript
// main.js
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import * as uiv from 'uiv'

const app = createApp({ ... })

app.use(uiv)

app.mount(...)
```

That's it. Happy coding!

### No conflict

All components & directives will be installed with no prefix by default, you can add any prefix to them to avoid conflicts with other libs if needed.

For example:

```javascript
Vue.use(uiv, {prefix: 'uiv'})
```

Results in:

* Components such as `<alert>` becomes `<uiv-alert>`
* Directives such as `v-tooltip` becomes `v-uiv-tooltip`
* Global methods such as `$alert` becomes `$uiv_alert`

## Import individually

If you don't want all of the components for some reason (e.g. to save the bundle size), you can also import them individually.

### Example

```javascript
import { Alert } from 'uiv'
// or
// import Alert from 'uiv/dist/Alert'

export default {
  components: {
    Alert
  },
  ...
}
```

::: tip
Import from `uiv/dist/something` can ensure bundle size saving, others might not (depend on bundler's tree-shaking).
:::

## Browsers

You can load & install uiv package directly in browsers. For example:

```html
<!-- Remember to import Vue and Bootstrap CSS file before this! -->
<script src="//unpkg.com/uiv"></script>
```

This will simply load the latest version of `uiv.min.js` into your page. For detail usages (e.g. load specify version, IMPORTANT in production mode) and different CDN providers, you can visit:

* [https://unpkg.com](https://unpkg.com)
* [https://www.jsdelivr.com](https://www.jsdelivr.com/)
* [https://cdnjs.com/libraries/uiv](https://cdnjs.com/libraries/uiv)

## Browser compatibility

All browsers supported by [Vue](https://github.com/vuejs/vue-next) and [Bootstrap 3 CSS](https://github.com/twbs/bootstrap) are supposed to be also supported by this lib.
