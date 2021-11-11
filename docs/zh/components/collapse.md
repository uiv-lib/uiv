# Collapse 折叠面板

## 样例

点击以下按钮来显示或隐藏一些内容：

<collapse-example/>

<<< @/.vitepress/components/collapse/example.vue

## 手风琴

通过拓展折叠面板来实现手风琴效果：

<collapse-accordion/>

<<< @/.vitepress/components/collapse/accordion.vue

## API 文档

### [Collapse](https://github.com/uiv-lib/uiv/blob/1.x/src/components/collapse/Collapse.vue)

#### 参数

名字                  | 类型       | 默认值  | 必填 | 描述
----------------      | ---------- | -------- | -------- | -----------------------
`v-model`             | Boolean    | false    | &#10004; | 显示或隐藏
`tag`                 | String     | div      |          | 渲染使用的 HTML 标签
`transition`          | Number     | 350      |          | 折叠动画速度，设置为 0 以禁用动画

#### 插槽

名字      | 描述
--------- | -----------------------
`default` | Replace as the collapse body.

#### 事件

名字        | 参数 | 描述
----------- | ------ | ---------------
`show`      |        | 该事件会在 v-model 设置为 true 后立触发
`shown`     |        | 该事件会在折叠内容完全展示后触发（将等待动画结束）
`hide`      |        | 该事件会在 v-model 设置为 false 后立触发
`hidden`    |        |  该事件会在折叠内容完全隐藏后触发（将等待动画结束）
