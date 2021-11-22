import { createWrapper, sleep, triggerEvent } from '../../__test__/utils';
import Collapse from './Collapse.vue';

describe('Collapse', () => {
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
    );
    const trigger = wrapper.findAll('button')[0];
    const collapse = wrapper.findAll('.collapse')[0];
    expect(collapse.classes()).toEqual(['collapse']);
    await triggerEvent(trigger, 'click');
    await sleep(400);
    expect(collapse.classes()).toEqual(['collapse', 'in']);
    await triggerEvent(trigger, 'click');
    await sleep(400);
    expect(collapse.classes()).toEqual(['collapse']);
  });

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
              this.showAccordion[index] = false;
            } else {
              this.showAccordion = this.showAccordion.map(
                (v, i) => i === index
              );
            }
          },
        },
      }
    );
    await sleep(400);
    const triggers = wrapper.findAll('.panel-heading');
    const collapse = wrapper.findAll('.collapse');
    expect(collapse[0].classes()).toEqual(['collapse', 'in']);
    expect(collapse[1].classes()).toEqual(['collapse']);
    await triggerEvent(triggers[1], 'click');
    await sleep(400);
    expect(collapse[0].classes()).toEqual(['collapse']);
    expect(collapse[1].classes()).toEqual(['collapse', 'in']);
    await triggerEvent(triggers[1], 'click');
    await sleep(400);
    expect(collapse[1].classes()).toEqual(['collapse']);
  });
});
