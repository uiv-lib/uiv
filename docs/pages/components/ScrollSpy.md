# ScrollSpy

> Update nav targets based on scroll position automatically.

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-4714899946256166"
     data-ad-slot="4603582855"></ins>

## Example

The navigation on the right is a live demo of the scrollspy directive (hidden on mobile devices).

Another example below, scroll the area below the navbar and watch the active class change. The dropdown sub items will be highlighted as well:

```html
<template>
  <section>
    <nav class="navbar navbar-default navbar-static"  v-scrollspy:[id]>
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="collapsed navbar-toggle" type="button" @click="show=!show">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a role="button" class="navbar-brand" @click="id=1">Project Name</a>
        </div>
        <collapse class="navbar-collapse" v-model="show">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#vue">@vue</a></li>
            <li class=""><a href="#bootstrap">@bootstrap</a></li>
            <dropdown tag="li">
              <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
              <template slot="dropdown">
                <li><a href="#one">one</a></li>
                <li><a href="#two">two</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#three">three</a></li>
              </template>
            </dropdown>
          </ul>
        </collapse>
      </div>
    </nav>
    <div id="scrollspy-example" ref="target">
      <h4 id="vue">@vue</h4>
      <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
      <h4 id="bootstrap">@bootstrap</h4>
      <p>Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
      <h4 id="one">one</h4>
      <p>Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
      <h4 id="two">two</h4>
      <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.</p>
      <h4 id="three">three</h4>
      <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
    </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        id: 'scrollspy-example'
      }
    }
  }
</script>
<style>
  #scrollspy-example {
    position: relative;
    height: 200px;
    margin-top: 10px;
    overflow: auto;
  }
</style>
<!-- scrollspy-example-in-navbar.vue -->
```

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

# API Reference

## [scrollspy](https://github.com/wxsms/uiv/blob/master/src/directives/scrollspy/scrollspy.js)

### Options

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`offset`         | Number     | 10           |          | Pixels to offset from top when calculating position of scroll.
`callback`       | Function   |              |          | `callback(ele)` fires whenever a new item becomes activated by the scrollspy, with the element as param.
