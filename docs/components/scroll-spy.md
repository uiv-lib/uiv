# ScrollSpy

> Update nav targets based on scroll position automatically.

## Example

Scroll the area below the navbar and watch the active class change. The dropdown sub items will be highlighted as well:

<ClientOnly><scroll-spy-example/></ClientOnly>

<<< @/.vitepress/components/scroll-spy/example.vue

## Usage

```
v-scrollspy:arg="option"
```

Where:

* `arg` is the ID (without prefix `#`) of the element to scrollspy on (optional), leave it empty to spy on `<body>`.
* `options` is an object of configuration (optional).

### Bootstrap nav required

Scrollspy currently requires the use of a Bootstrap nav component for proper highlighting of active links.

### Resolvable ID targets required

Navbar links must have resolvable id targets. For example, a `<a href="#home">home</a>` must correspond to something in the DOM like `<div id="home"></div>`.

### Relative positioning required

No matter the implementation method, scrollspy requires the use of `position: relative;` on the element you're spying on. In most cases this is the `<body>`. When scrollspying on elements other than the `<body>`, be sure to have a `height` set and `overflow-y: scroll;` applied.

## API Reference

### [scrollspy](https://github.com/uiv-lib/uiv/blob/1.x/src/directives/scrollspy/scrollspy.js)

#### Options

| Name       | Type     | Default | Required | Description                                                                                              |
|------------|----------|---------|----------|----------------------------------------------------------------------------------------------------------|
| `offset`   | Number   | 10      |          | Pixels to offset from top when calculating position of scroll.                                           |
| `callback` | Function |         |          | `callback(ele)` fires whenever a new item becomes activated by the scrollspy, with the element as param. |
