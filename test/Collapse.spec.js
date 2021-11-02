import $ from 'jquery'
import { createWrapper, destroyVm, triggerEvent, sleep } from '../utils'

describe('Collapse', () => {
  let vm
  let $el

  afterEach(() => {
    destroyVm(vm)
  })

  it('should be able to toggle collapse on trigger click', async () => {
    const wrapper = createWrapper(
      `<section>
    <div>
      <btn type="primary" @click="show=!show">Click me!</btn>
    </div>
    <br/>
    <collapse v-model="show">
      <div class="well" style="margin-bottom: 0">Hi there.</div>
    </collapse>
  </section>`,
      {
        show: false,
      }
    )
    $el = $(vm.$el)
    const trigger = $el.find('button').get(0)
    const collapse = $el.find('.collapse').get(0)
    expect(collapse.className).toEqual('collapse')
    triggerEvent(trigger, 'click')
    await sleep(400)
    expect(collapse.className).toEqual('collapse in')
    triggerEvent(trigger, 'click')
    await sleep(400)
    expect(collapse.className).toEqual('collapse')
  })

  it('should be able to toggle accordion', async () => {
    const wrapper = createWrapper(
      `<div><div class="panel-group">
    <div class="panel panel-default">
      <div class="panel-heading" role="button" @click="toggleAccordion(0)">
        <h4 class="panel-title">Collapsible Group Item #1</h4>
      </div>
      <collapse v-model="showAccordion[0]">
        <div class="panel-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
        </div>
      </collapse>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading" role="button" @click="toggleAccordion(1)">
        <h4 class="panel-title">Collapsible Group Item #2</h4>
      </div>
      <collapse v-model="showAccordion[1]">
        <div class="panel-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
        </div>
      </collapse>
    </div>
    <div class="panel panel-info">
      <div class="panel-heading" role="button" @click="toggleAccordion(2)">
        <h4 class="panel-title">Collapsible Group Item #3</h4>
      </div>
      <collapse v-model="showAccordion[2]">
        <div class="panel-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
          moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
        </div>
      </collapse>
    </div>
  </div></div>`,
      {
        showAccordion: [true, false, false],
      },
      {
        methods: {
          toggleAccordion(index) {
            if (this.showAccordion[index]) {
              this.$set(this.showAccordion, index, false)
            } else {
              this.showAccordion = this.showAccordion.map((v, i) => i === index)
            }
          },
        },
      }
    )
    $el = $(vm.$el)
    const triggers = $el.find('.panel-heading')
    const collapse = $el.find('.collapse')
    expect(collapse.get(0).className).toEqual('collapse in')
    expect(collapse.get(1).className).toEqual('collapse')
    triggerEvent(triggers.get(1), 'click')
    await sleep(400)
    expect(collapse.get(0).className).toEqual('collapse')
    expect(collapse.get(1).className).toEqual('collapse in')
    triggerEvent(triggers.get(1), 'click')
    await sleep(400)
    expect(collapse.get(1).className).toEqual('collapse')
  })
})
