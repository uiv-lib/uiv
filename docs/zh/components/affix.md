# Affix 悬浮

> 悬浮组件通过切换 `position: fixed` 开关，来模拟 `position: sticky` 的效果。

::: tip
你必须为悬浮内容提供 CSS 以定义位置与宽高
:::

::: warning
不要在相对定位的容器内使用悬浮组件，比如 pulled 或 pushed column。
:::

## 样例

尝试滚动本页面并观察警告框的变化：

<affix-example/>

<<< @/.vitepress/components/affix/example.vue

## API 文档

### [Affix](https://github.com/uiv-lib/uiv/blob/1.x/src/components/affix/Affix.vue)

#### 参数

名字             | 类型       | 默认值      | 必填 | 描述
---------------- | ---------- | ------------ | -------- | -----------------------
`offset`         | Number     | 0            |          | 当计算滚动悬浮位置时，相对屏幕的偏移像素值

#### Slots

名字      | 描述
--------- | -----------------------
`default` | 悬浮体

#### Events

名字      | 描述
--------- | -----------------------
`affix`   | 该事件在元素被悬浮前触发
`affixed` | 该事件在元素被悬浮后触发
