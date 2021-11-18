import Alert from './Alert';
import { createWrapper, nextTick, sleep } from '../../__test__/utils';

const DEFAULT_ALERT_CLASS = 'alert-info';

describe('Alert', () => {
  test('renders correctly', () => {
    const wrapper = createWrapper(`<alert>EMT YES</alert>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should be able to add alert with no type', () => {
    const wrapper = createWrapper(`<alert>EMT YES</alert>`);
    expect(wrapper.classes()).toContain('alert');
    expect(wrapper.classes()).toContain(DEFAULT_ALERT_CLASS);
  });

  it('should be able to dismiss alerts', async () => {
    const wrapper = createWrapper(
      `<section>
    <alert type="warning" v-if="show" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
  </section>`,
      {
        show: true,
      }
    );
    expect(wrapper.findComponent(Alert).classes()).toContain('alert-warning');
    await wrapper.find('button.close').trigger('click');
    expect(wrapper.vm.show).toEqual(false);
  });

  it('should be able to add dismissible alerts', async () => {
    const wrapper = createWrapper(
      `<section>
    <alert type="warning" v-if="show" dismissible @dismissed="show = false">
      <b>Warning!</b> Better check yourself, you're not looking too good.
    </alert>
    <alert v-for="(item, index) in alerts" dismissible :key="item.key" @dismissed="alerts.splice(index, 1)">
      <b>Heads up!</b> This alert needs your attention, but it's not super important.
    </alert>
    <hr/>
    <btn type="primary" @click="addDismissibleAlert()">Add Dismissible Alert</btn>
  </section>`,
      {
        show: true,
        alerts: [],
      },
      {
        methods: {
          addDismissibleAlert() {
            this.alerts.push({ key: new Date().getTime() });
          },
        },
      }
    );
    const alertInstancesBefore = wrapper.findAll(
      `.${DEFAULT_ALERT_CLASS}`
    ).length;
    await wrapper.find('.btn-primary').trigger('click');
    const alertInstancesAfter = wrapper.findAll(
      `.${DEFAULT_ALERT_CLASS}`
    ).length;
    expect(alertInstancesAfter).toEqual(alertInstancesBefore + 1);
  });

  it('should be able to add auto dismiss alerts', async () => {
    const wrapper = createWrapper(
      `
      <section>
    <alert v-for="(item, index) in alerts" :duration="duration" :key="item.key" @dismissed="alerts.splice(index, 1)">
      This alert <b>will dismiss after {{duration}}ms</b>.
    </alert>
    <hr/>
    <btn type="primary" @click="addAutoDismissAlert()">Add Auto Dismiss Alert</btn>
  </section>
    `,
      {
        alerts: [],
        duration: 2000,
      },
      {
        methods: {
          addAutoDismissAlert() {
            this.alerts.push({ key: new Date().getTime() });
          },
        },
      }
    );
    wrapper.vm.duration = 1000;
    await nextTick();
    const alertInstancesBefore = wrapper.findAll(
      `.${DEFAULT_ALERT_CLASS}`
    ).length;
    await wrapper.find('.btn-primary').trigger('click');
    await nextTick();
    const alertInstancesAfter = wrapper.findAll(
      `.${DEFAULT_ALERT_CLASS}`
    ).length;
    expect(alertInstancesAfter).toEqual(alertInstancesBefore + 1);
    await sleep(wrapper.vm.duration + 200);
    const alertInstancesAfterDelay = wrapper.findAll(
      `.${DEFAULT_ALERT_CLASS}`
    ).length;
    expect(alertInstancesAfterDelay).toEqual(alertInstancesBefore);
  });
});
