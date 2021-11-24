<template>
  <section class="uiv">
    <nav
      v-scrollspy:scrollspy-example
      class="navbar navbar-default navbar-static"
    >
      <div class="container-fluid">
        <div class="navbar-header">
          <button
            class="collapsed navbar-toggle"
            type="button"
            @click="show = !show"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a role="button" class="navbar-brand">Project Name</a>
        </div>
        <Collapse v-model="show" class="navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#vue">@vue</a></li>
            <li class=""><a href="#bootstrap">@bootstrap</a></li>
            <Dropdown tag="li">
              <a class="dropdown-toggle" role="button"
                >Dropdown <span class="caret"></span
              ></a>
              <template #dropdown>
                <li><a href="#one">one</a></li>
                <li><a href="#two">two</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#three">three</a></li>
              </template>
            </Dropdown>
          </ul>
        </Collapse>
      </div>
    </nav>
    <div id="scrollspy-example" ref="target">
      <h4 id="vue">@vue</h4>
      <p>
        Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim
        lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights
        whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo
        booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg
        hoodie minim qui you probably haven't heard of them et cardigan trust
        fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus,
        cred irony biodiesel keffiyeh artisan ullamco consequat.
      </p>
      <h4 id="bootstrap">@bootstrap</h4>
      <p>
        Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork
        beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four
        loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck,
        mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial.
        Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing
        craft beer vice keytar deserunt.
      </p>
      <h4 id="one">one</h4>
      <p>
        Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea.
        Lomo bicycle rights adipisicing banh mi, velit ea sunt next level
        locavore single-origin coffee in magna veniam. High life id vinyl, echo
        park consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing.
        Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable
        delectus consectetur fanny pack iphone.
      </p>
      <h4 id="two">two</h4>
      <p>
        In incididunt echo park, officia deserunt mcsweeney's proident master
        cleanse thundercats sapiente veniam. Excepteur VHS elit, proident
        shoreditch +1 biodiesel laborum craft beer. Single-origin coffee
        wayfarers irure four loko, cupidatat terry richardson master cleanse.
        Assumenda you probably haven't heard of them art party fanny pack,
        tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial
        keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland
        before they sold out four loko. Locavore enim nostrud mlkshk brooklyn
        nesciunt.
      </p>
      <h4 id="three">three</h4>
      <p>
        Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim
        lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights
        whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo
        booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg
        hoodie minim qui you probably haven't heard of them et cardigan trust
        fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus,
        cred irony biodiesel keffiyeh artisan ullamco consequat.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { scrollspy as vScrollspy, Collapse, Dropdown } from 'uiv';

const show = ref(false);
</script>

<style>
#scrollspy-example {
  position: relative;
  height: 200px;
  margin-top: 10px;
  overflow: auto;
}
</style>
