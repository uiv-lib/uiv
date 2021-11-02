import {
  createWrapper,
  keyCodes,
  nextTick,
  sleep,
  transition,
  triggerEvent,
  triggerKey,
} from '../../__test__/utils'

const expectActive = ($nav, hash) => {
  expect($nav.querySelectorAll('li.active').length).toEqual(1)
  expect($nav.querySelector('li.active > a').getAttribute('href')).toEqual(hash)
}

const expectDropdownActive = ($nav, hash) => {
  expect($nav.querySelectorAll('li.active').length).toEqual(2)
  expect($nav.querySelectorAll('li.dropdown.active').length).toEqual(1)
  expect(
    $nav.querySelectorAll('li.dropdown.active > ul > li.active').length
  ).toEqual(1)
  expect(
    $nav
      .querySelector('li.dropdown.active > ul > li.active > a')
      .getAttribute('href')
  ).toEqual(hash)
}

// todo
describe.skip('scrollspy', () => {
  let vm

  beforeEach(() => {
    const wrapper = createWrapper(
      `
  <section>
    <nav class="navbar navbar-default navbar-static"  v-scrollspy:scrollspy-example>
      <div class="container-fluid">
        <div class="navbar-header">
          <button class="collapsed navbar-toggle" type="button" @click="show=!show">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a role="button" class="navbar-brand">Project Name</a>
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
    <div id="scrollspy-example" ref="target" style="position: relative;height: 200px;width: 729px;margin-top: 10px;overflow: auto;">
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
    `,
      { show: false }
    )
    vm = wrapper.vm
  })

  it('should be able to toggle active class', async () => {
    // console.log(window.innerWidth, window.innerHeight)
    await vm.$nextTick()
    const _$el = vm.$el
    expectActive(_$el, '#vue')
    const scrollEl = _$el.querySelector('#scrollspy-example')
    scrollEl.scrollTop = _$el.querySelector('#vue').offsetTop
    await sleep(100)
    expectActive(_$el, '#vue')
    scrollEl.scrollTop = _$el.querySelector('#bootstrap').offsetTop
    await sleep(100)
    expectActive(_$el, '#bootstrap')
  })

  it('should be able to toggle dropdown active class', async () => {
    await vm.$nextTick()
    const _$el = vm.$el
    const scrollEl = _$el.querySelector('#scrollspy-example')
    scrollEl.scrollTop = _$el.querySelector('#one').offsetTop
    await sleep(100)
    expectDropdownActive(_$el, '#one')
    scrollEl.scrollTop = _$el.querySelector('#two').offsetTop
    await sleep(100)
    expectDropdownActive(_$el, '#two')
    scrollEl.scrollTop = _$el.querySelector('#three').offsetTop
    await sleep(100)
    expectDropdownActive(_$el, '#three')
  })

  it('should be able to refresh on target height changed', async () => {
    await vm.$nextTick()
    const _$el = vm.$el
    const scrollEl = _$el.querySelector('#scrollspy-example')
    scrollEl.scrollTop = _$el.querySelector('#two').offsetTop
    await sleep(100)
    expectDropdownActive(_$el, '#two')
    _$el.find('#one').css('height', 200)
    scrollEl.scrollTop = 0
    await sleep(100)
    scrollEl.scrollTop = _$el.querySelector('#two').offsetTop
    await sleep(100)
    expectDropdownActive(_$el, '#two')
  })

  it('should be able to append to body', async () => {
    const wrapper = createWrapper(`
<section style="height: 5000px;">
  <ul class="nav" v-scrollspy style="height: 200px">
    <li><a href="#1">1</a></li>
    <li><a href="#2">2</a></li>
    <li><a href="#3">3</a></li>
  </ul>
  <div id="1" style="height: 200px">1</div>
  <div id="2" style="height: 500px">2</div>
  <div id="3" style="height: 300px">3</div>
</section>`)
    await vm.$nextTick()
    const $el = vm.$el
    expect($el.querySelector('li.active').length).toEqual(0)
    window.scrollTo(0, $el.querySelector('#1').offsetTop)
    await sleep(100)
    expectActive($el, '#1')
    window.scrollTo(0, $el.querySelector('#2').offsetTop)
    await sleep(100)
    expectActive($el, '#2')
    window.scrollTo(0, $el.querySelector('#3').offsetTop)
    await sleep(100)
    expectActive($el, '#3')
    window.scrollTo(0, 0)
    await sleep(100)
    expect($el.find('li.active').length).toEqual(0)
  })

  it('should be able to handle invalid target', async () => {
    const wrapper = createWrapper(
      `
<section style="height: 5000px">
  <ul class="nav" v-scrollspy:test="opts" style="height: 200px">
    <li><a href="#1">{{msg}}</a></li>
  </ul>
</section>
    `,
      {
        opts: {},
        msg: 'test',
      }
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    vm.opts = { offset: 100 }
    await vm.$nextTick()
    vm.msg = '12345'
    await vm.$nextTick()
    // no err should be throw here
  })
})
