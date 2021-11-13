# ButtonGroup 按钮组

::: warning
当在按钮组的元素中使用 tooltips 或 popovers 时，请确保它们是附加到 body 节点上的。
:::

## 样例

将一系列 `<btn>` 包裹至 `<btn-group>` 中：

<btn-group-example/>

<<< @/docs/.vuepress/components/btn-group/example.vue

## 按钮工具栏

将一系列 `<btn-group>` 包裹至 `<btn-toolbar>` 中以实现更复杂的场景：

<btn-group-toolbar/>

<<< @/docs/.vuepress/components/btn-group/toolbar.vue

## 尺寸

不需要给按钮组中的每个按钮都增加尺寸样式，只需要给 `<btn-group>` 添加 `size` 属性即可：

<btn-group-sizes/>

<<< @/docs/.vuepress/components/btn-group/sizes.vue

## 嵌套下拉菜单

当在按钮组中嵌套了下拉菜单时，`btn-group` 会被自动添加到 `<dropdown>` 组件：

<btn-group-nesting/>

<<< @/docs/.vuepress/components/btn-group/nesting.vue

## 垂直排列

通过给按钮组增加 `vertical` 属性来将他们变为垂直排列： 

::: warning
分裂为两个按钮的下拉菜单不支持在此处使用
:::

<btn-group-vertical/>

<<< @/docs/.vuepress/components/btn-group/vertical.vue

## 横向填充

通过添加 `justified` 属性来允许按钮撑满按钮组的宽度，同样支持下拉菜单。

::: warning
由于 Bootstrap 的限制， `<btn>` 在渲染为 `button` 时需要添加 `justified` 属性。
:::

<btn-group-justified/>

<<< @/docs/.vuepress/components/btn-group/justified.vue

## API 文档

### [BtnGroup](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/BtnGroup.js)

#### 参数

名字              | 类型       | 默认值    | 必填  | 描述
---------------- | ---------- | -------- | -------- | -----------------------
`size`           | String     |          |          | 自定义尺寸，可选的值：`lg`, `sm`, `xs`.
`vertical`       | Boolean    | false    |          | 垂直样式
`justified`      | Boolean    | false    |          | 横向填充样式

#### 插槽

名字       | 描述
--------- | -----------------------
`default` | 按钮组体

### [BtnToolbar](https://github.com/uiv-lib/uiv/blob/1.x/src/components/button/BtnToolbar.js)

该组件没有参数。
