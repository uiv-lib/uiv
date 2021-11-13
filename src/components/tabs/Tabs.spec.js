import { createWrapper, sleep, triggerEvent } from '../../__test__/utils'

function baseVm() {
  return createWrapper(`<div><tabs>
  <tab title="Home">
    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
  </tab>
  <tab title="Profile">
    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
  </tab>
  <tab title="@vue" group="Dropdown">
    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
  </tab>
  <tab title="@bootstrap" group="Dropdown">
    <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial keffiyeh echo park vegan.</p>
  </tab>
</tabs></div>`)
}

function dynamicVm() {
  return createWrapper(
    `<section>
    <tabs v-model="index">
      <tab v-for="tab in tabs" :title="tab" :key="tab">
        <p>Dynamic {{tab}}</p>
        <btn type="danger" @click="close">Close this tab</btn>
      </tab>
      <template slot="nav-right">
        <btn size="sm" @click="push">
          <i class="glyphicon glyphicon-plus"></i> Add
        </btn>
      </template>
    </tabs>
  </section>`,
    {
      tabs: ['Tab 1'],
      count: 1,
      index: 0,
    },
    {
      methods: {
        push() {
          this.tabs.push(`Tab ${++this.count}`)
          // open the new tab after created
          this.$nextTick(() => {
            this.index = this.tabs.length - 1
          })
        },
        close() {
          this.tabs.splice(this.index, 1)
          // select prev tab if the closed tab is the last one
          if (this.index === this.tabs.length && this.index > 0) {
            --this.index
          }
        },
      },
    }
  )
}

describe('Tabs', () => {
  it('should not be able hide tabs using `hidden` prop', async () => {
    const wrapper = createWrapper(
      `<tabs>
    <tab hidden>1</tab>
    <tab>2</tab>
    <tab group="Dropdown" hidden>3</tab>
    <tab group="Dropdown">4</tab>
    <tab group="Dropdown2" hidden>5</tab>
    <tab group="Dropdown2" hidden>6</tab>
</tabs>`
    )
    const vm = wrapper.vm
    await vm.$nextTick()
    // 1,2
    expect(
      vm.$el.querySelectorAll('.nav.nav-tabs > li')[0].style.display
    ).toEqual('none')
    expect(
      vm.$el.querySelectorAll('.nav.nav-tabs > li')[1].style.display
    ).not.toEqual('none')
    // 3,4
    expect(
      vm.$el.querySelectorAll('.nav.nav-tabs .dropdown')[0].style.display
    ).not.toEqual('none')
    expect(
      vm.$el
        .querySelectorAll('.nav.nav-tabs .dropdown')[0]
        .querySelectorAll('li')[0].style.display
    ).toEqual('none')
    expect(
      vm.$el
        .querySelectorAll('.nav.nav-tabs .dropdown')[0]
        .querySelectorAll('li')[1].style.display
    ).not.toEqual('none')
    // 5,6
    expect(
      vm.$el.querySelectorAll('.nav.nav-tabs .dropdown')[1].style.display
    ).toEqual('none')
    expect(
      vm.$el
        .querySelectorAll('.nav.nav-tabs .dropdown')[1]
        .querySelectorAll('li')[0].style.display
    ).toEqual('none')
    expect(
      vm.$el
        .querySelectorAll('.nav.nav-tabs .dropdown')[1]
        .querySelectorAll('li')[1].style.display
    ).toEqual('none')
  })

  it('should not be able to work if not using <tabs><tab>...</tab></tabs>', () => {
    expect(
      createWrapper.bind(null, '<tabs><tab><tab>{{ msg }}</tab></tab></tabs>', {
        msg: 'hello',
      })
    ).toThrow('<tab> parent must be <tabs>.')
  })

  it('should be able to add String `customNavClass`', () => {
    const wrapper = createWrapper(
      '<tabs custom-nav-class="custom-nav-class"><tab>123</tab></tabs>'
    )
    const vm = wrapper.vm
    expect(vm.$el.querySelector('.nav.nav-tabs').className).toContain(
      'custom-nav-class'
    )
  })

  it('should be able to add Object `customNavClass`', () => {
    const wrapper = createWrapper(
      '<tabs :custom-nav-class="{\'custom-nav-class\':true}"><tab>123</tab></tabs>'
    )
    const vm = wrapper.vm
    expect(vm.$el.querySelector('.nav.nav-tabs').className).toContain(
      'custom-nav-class'
    )
  })

  it('should be ok if no <tab> present in <tabs>', () => {
    const wrapper = createWrapper('<tabs>{{msg}}</tabs>', {
      msg: 'hello',
    })
  })

  it('should be able to render first tab on open', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    const $el = vm.$el
    await vm.$nextTick()
    await vm.$nextTick()
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Home')
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].querySelector('p').textContent).toContain(
      'Raw denim you probably haven'
    )
  })

  it('should be able to open correct tab content after click on tab nav', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    const $el = vm.$el
    await vm.$nextTick()
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    const tab = nav.querySelectorAll('li')[1].querySelector('a')
    triggerEvent(tab, 'click')
    await vm.$nextTick()
    await sleep(350)
    // Double click should be fine
    triggerEvent(tab, 'click')
    await vm.$nextTick()
    await sleep(350)
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Profile')
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].querySelector('p').textContent).toContain(
      'Food truck fixie locavore, accusamus mcsw'
    )
  })

  it('should not be able to select disabled tab', async () => {
    const wrapper = createWrapper(`<div><tabs>
  <tab title="Home">
    <p>Home tab.</p>
  </tab>
  <tab title="Profile" disabled>
    <p>Profile tab.</p>
  </tab>
  <tab title="@vue" group="Dropdown">
    <p>@vue tab.</p>
  </tab>
  <tab title="@bootstrap" group="Dropdown" disabled>
    <p>@bootstrap tab.</p>
  </tab>
</tabs></div>`)
    const vm = wrapper.vm
    await vm.$nextTick()
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    // In nav
    const tab1 = nav.querySelectorAll('li')[1]
    expect(tab1.className).toEqual('disabled')
    triggerEvent(tab1.querySelector('a'), 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(tab1.className).toEqual('disabled')
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].querySelector('p').textContent).toContain(
      'Home tab'
    )
    // In dropdown
    const tab2 = nav.querySelector('.dropdown').querySelectorAll('li')[1]
    expect(tab2.className).toEqual('disabled')
    triggerEvent(tab2.querySelector('a'), 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(tab2.className).toEqual('disabled')
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].querySelector('p').textContent).toContain(
      'Home tab'
    )
  })

  it('should not be able to render HTML title with deprecated prop', async () => {
    const wrapper = createWrapper(`<div><tabs>
  <tab title="<i class='glyphicon glyphicon-home'></i> Home" html-title>
    <p>This tab has a <code>html-title</code>.</p>
  </tab>
  <tab>
    <div slot="title">
      <i class="glyphicon glyphicon-user"></i> Profile
    </div>
    <p>This tab has a <code>title</code> slot.</p>
  </tab>
</tabs></div>`)
    const vm = wrapper.vm
    const $el = vm.$el
    await vm.$nextTick()
    const nav = $el.querySelector('.nav-tabs')
    const tab = nav.querySelectorAll('li')[0]
    expect(tab.querySelector('i')).toBeNull()
  })

  it('should be able to render HTML title with slot', async () => {
    const wrapper = createWrapper(`<div><tabs>
  <tab title="<i class='glyphicon glyphicon-home'></i> Home" html-title>
    <p>This tab has a <code>html-title</code>.</p>
  </tab>
  <tab>
    <div slot="title">
      <i class="glyphicon glyphicon-user"></i> Profile
    </div>
    <p>This tab has a <code>title</code> slot.</p>
  </tab>
</tabs></div>`)
    const vm = wrapper.vm
    await vm.$nextTick()
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    const tab = nav.querySelectorAll('li')[1]
    expect(tab.querySelector('i')).toBeDefined()
  })

  it('should be able to run callback function', async () => {
    const wrapper = createWrapper(
      `<div><tabs @change="onChange">
    <tab title="Home">
      <p>Home tab.</p>
    </tab>
    <tab title="Profile">
      <p>Profile tab.</p>
    </tab>
    <tab title="<i class='glyphicon glyphicon-bell'></i> Alert!" html-title>
      <p>This tab has HTML title and callback function!</p>
    </tab>
  </tabs></div>`,
      {},
      {
        methods: {
          onChange(index) {
            if (index === 2) {
              window.alert('You clicked on a tab that has callback function!')
            }
          },
        },
      }
    )
    const vm = wrapper.vm
    const $el = vm.$el
    await vm.$nextTick()
    const nav = $el.querySelector('.nav-tabs')
    const _savedAlert = window.alert
    window.alert = () => {
      // Silent to remove out logs in terminal
    }
    const spy = jest.spyOn(window, 'alert')
    triggerEvent(nav.querySelectorAll('li > a')[1], 'click')
    await vm.$nextTick()
    await sleep(350)
    triggerEvent(nav.querySelectorAll('li > a')[2], 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(spy).toBeCalled()
    window.alert = _savedAlert
  })

  it('should be able to open grouped tab', async () => {
    const wrapper = baseVm()
    const vm = wrapper.vm
    await vm.$nextTick()
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    const tab5 = nav.querySelector('li.dropdown')
    triggerEvent(tab5.querySelectorAll('a')[0], 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(tab5.querySelector('.dropdown-menu')).toBeDefined()
    expect(tab5.className).toContain('dropdown')
    expect(tab5.className).toContain('open')
    triggerEvent(
      tab5
        .querySelector('.dropdown-menu')
        .querySelector('li')
        .querySelector('a'),
      'click'
    )
    await vm.$nextTick()
    await sleep(350)
    expect(tab5.className).toContain('active')
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].querySelector('p').textContent).toContain(
      'Etsy mixtape wayfarers'
    )
  })

  it('should be able to use with v-model', async () => {
    const wrapper = dynamicVm()
    const vm = wrapper.vm
    const $el = vm.$el
    await vm.$nextTick()
    await vm.$nextTick()
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    // 1 tab + 1 btn
    expect(nav.querySelectorAll('li').length).toEqual(1 + 1)
    // check active tab
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Tab 1')
    // check active content
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].textContent).toContain('Tab 1')
  })

  it('should be able to push tab', async () => {
    const wrapper = dynamicVm()
    const vm = wrapper.vm
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    const pushBtn = nav.querySelector('.btn')
    await vm.$nextTick()
    await vm.$nextTick()
    // Add a tab
    triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(nav.querySelectorAll('li').length).toEqual(2 + 1)
    // check active tab
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Tab 2')
    // check active content
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].textContent).toContain('Tab 2')
  })

  it('should be able to close tab', async () => {
    const wrapper = dynamicVm()
    const vm = wrapper.vm
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    const pushBtn = nav.querySelector('.btn')
    await vm.$nextTick()
    await vm.$nextTick()
    // Add a tab
    triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    await sleep(350)
    // Delete a tab
    triggerEvent(content.querySelector('.tab-pane.active .btn'), 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(nav.querySelectorAll('li').length).toEqual(1 + 1)
    // check active tab
    const activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Tab 1')
    // check active content
    const activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].textContent).toContain('Tab 1')
  })

  it('should be able to select dynamic tab', async () => {
    const wrapper = dynamicVm()
    const vm = wrapper.vm
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    const content = $el.querySelector('.tab-content')
    const pushBtn = nav.querySelector('.btn')
    await vm.$nextTick()
    await vm.$nextTick()
    // Add a tab
    triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    triggerEvent(pushBtn, 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(nav.querySelectorAll('li').length).toEqual(4 + 1)
    vm.index = 1
    await vm.$nextTick()
    await sleep(350)
    // check active tab
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Tab 2')
    // check active content
    let activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].textContent).toContain('Tab 2')
    triggerEvent(content.querySelector('.tab-pane.active .btn'), 'click')
    await vm.$nextTick()
    await sleep(350)
    expect(nav.querySelectorAll('li').length).toEqual(3 + 1)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Tab 3')
    // check active content
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].textContent).toContain('Tab 3')
    // switch tab
    const tab2 = nav.querySelectorAll('li')[2]
    triggerEvent(tab2.querySelector('a'), 'click')
    await vm.$nextTick()
    await sleep(350)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Tab 4')
    // check active content
    activeContent = content.querySelectorAll('.tab-pane.active')
    expect(activeContent.length).toEqual(1)
    expect(activeContent[0].textContent).toContain('Tab 4')
  })

  it('should not display tab if before-change callback return false', async () => {
    const wrapper = createWrapper(
      `<section>
    <tabs v-model="index" @before-change="onBeforeChange">
      <tab title="Home">
        <div>
          <br/>
          <form class="form-inline">
            <div class="form-group">
              <label for="exampleInputName">Name</label>
              <input v-model="input" type="text" class="form-control" id="exampleInputName" placeholder="Please fill this section">
            </div>
          </form>
        </div>
      </tab>
      <tab title="Profile">
        <p>Profile tab.</p>
      </tab>
      <tab title="Others">
        <p>Others tab.</p>
      </tab>
    </tabs>
  </section>`,
      {
        index: 0,
        input: '',
      },
      {
        methods: {
          onBeforeChange(indexFrom, indexTo, done) {
            if (indexFrom === 0 && this.input === '') {
              this.$notify('Please fill your name first.')
              done(1)
            } else {
              done()
            }
          },
        },
      }
    )
    const vm = wrapper.vm
    const $el = vm.$el
    const nav = $el.querySelector('.nav-tabs')
    await vm.$nextTick()
    await vm.$nextTick()
    expect(nav.querySelectorAll('li').length).toEqual(3)
    // check active tab
    let activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Home')
    // click on tab #2
    triggerEvent(nav.querySelectorAll('li > a')[1], 'click')
    await vm.$nextTick()
    await sleep(350)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Home')
    // fill input
    vm.input = 'test'
    await vm.$nextTick()
    // click on tab #2
    triggerEvent(nav.querySelectorAll('li > a')[1], 'click')
    await vm.$nextTick()
    await sleep(350)
    // check active tab
    activeTab = nav.querySelectorAll('.active')
    expect(activeTab.length).toEqual(1)
    expect(activeTab[0].querySelector('a').textContent).toEqual('Profile')
  })
})
