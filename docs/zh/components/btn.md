# Button 按钮

## 样例

使用任一类型快速创建带有样式的按钮。

<btn-example/>

<<< @/.vitepress/components/btn/example.vue

## 链接

带有 `href` 或 `to` 参数的按钮会使用链接标签进行渲染。

<btn-links/>

<<< @/.vitepress/components/btn/links.vue

## 尺寸

需要更大或者更小的按钮？通过 `lg`, `sm`, 或 `xs` 来渲染不同的尺寸。

<btn-sizes/>

<<< @/.vitepress/components/btn/sizes.vue

通过添加 `block` 参数来创建块级按钮，它会占满父容器的宽度。

<btn-block/>

<<< @/.vitepress/components/btn/block.vue

## 激活状态

添加 `active` 参数可以让按钮看起来像被按下了一样（更深色的背景以及边框，以及内嵌阴影）。 

<btn-active/>

<<< @/.vitepress/components/btn/active.vue

## 禁用状态

添加 `disabled` 参数可以让按钮无法点击。

<btn-disabled/>

<<< @/.vitepress/components/btn/disabled.vue

## 多选、单选

添加 `input-type` 参数以将 `<btn>` 渲染为 `checkbox` 或 `radio` 输入。

::: tip
这需要与 [`btn-group`](/zh/components/btn-group.html) 配合使用，以获得正确的样式。
:::

### 多选样例

<br/>

<btn-checkbox/>

<<< @/.vitepress/components/btn/checkbox.vue

### 单选样例

<br/>

<btn-radio/>

<<< @/.vitepress/components/btn/radio.vue

## API 文档

### [Btn](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/Btn.js)

#### 参数

名字             | 类型             | 默认值  | 必填 | 描述
---------------- | ----------       | -------- | -------- | -----------------------
`type`           | String           | default  |          | Bootstrap 的按钮类型，支持的值： `default`, `primary`, `info`, `success`, `warning`, `danger`, `link`
`native-type`    | String           | button   |          | 原生按钮类型。 支持的值:`button`, `submit`, `reset`
`size`           | String           |          |          | 可选尺寸， 支持的值: `lg`, `sm`, `xs`
`block`          | Boolean          | false    |          | 块级样式
`active`         | Boolean          | false    |          | 激活状态
`disabled`       | Boolean          | false    |          | 禁用状态
`href`           | String           |          |          | 如果指定了该参数，将渲染为链接标签
`target`         | String           |          |          | 原生链接标签参数
`to`             | String or Object |          |          | 如果指定了该参数，将渲染为 Vue-Router 链接标签
`replace`        | Boolean          | false    |          | Vue-Router 链接标签参数
`append`         | Boolean          | false    |          | Vue-Router 链接标签参数
`exact`          | Boolean          | false    |          | Vue-Router 链接标签参数
`input-type`     | String           |          |          | 如果指定了该参数，将渲染为单选或多选输入，支持的值: `checkbox` / `radio`
`input-value`    |                  |          |          | 输入值
`v-model`        |                  |          |          | 输入 model，注意在指定了 `input-type` 时，该参数是**必填**的
`justified`      | Boolean          | false    |          | 由于 Bootstrap 限制， 当在 `<btn-group justified>` 中使用 `<btn>` 时需要指定该参数，其余情况可以忽略

#### 插槽

名字      | 描述
--------- | -----------------------
`default` | 按钮体

#### 事件

名字        | 参数 | 描述
----------- | ------ | ---------------
`click`     |        | 点击事件

::: tip
使用 `.native` 修饰符来捕获浏览器原生事件，如 `@click.native="..."` ， `@mouseover.native="..."`，等等。
:::
