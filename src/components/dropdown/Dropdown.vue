<script lang="jsx">
import {
  setDropdownPosition,
  on,
  off,
  EVENTS,
  focus,
} from '../../utils/dom.utils';
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  Teleport,
} from 'vue';

const DEFAULT_TAG = 'div';

export default defineComponent({
  props: {
    tag: { type: String, default: DEFAULT_TAG },
    appendToBody: { type: Boolean, default: false },
    modelValue: Boolean,
    dropup: { type: Boolean, default: false },
    menuRight: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    notCloseElements: { type: Array, default: () => [] },
    positionElement: { type: null, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const show = ref(false);
    const triggerEl = ref(undefined);
    const dropdown = ref(null);
    const element = ref(null);

    function getFocusItem() {
      return dropdown.value?.querySelector('li > a:focus');
    }

    function onKeyPress(event) {
      if (show.value) {
        const dropdownEl = dropdown.value;
        const keyCode = event.keyCode;
        if (keyCode === 27) {
          // esc
          toggle(false);
          triggerEl.value?.focus();
        } else if (keyCode === 13) {
          // enter
          getFocusItem()?.click();
        } else if (keyCode === 38 || keyCode === 40) {
          // up || down
          event.preventDefault();
          event.stopPropagation();
          const currentFocus = getFocusItem();
          const items = dropdownEl.querySelectorAll('li:not(.disabled) > a');
          if (!currentFocus) {
            focus(items[0]);
          } else {
            for (let i = 0; i < items.length; i++) {
              if (currentFocus === items[i]) {
                if (keyCode === 38 && i < items.length > 0) {
                  focus(items[i - 1]);
                } else if (keyCode === 40 && i < items.length - 1) {
                  focus(items[i + 1]);
                }
                break;
              }
            }
          }
        }
      }
    }

    function initTrigger() {
      const trigger =
        element.value?.querySelector('[data-role="trigger"]') ||
        element.value?.querySelector('.dropdown-toggle') ||
        element.value?.firstChild;
      triggerEl.value = trigger && trigger !== dropdown.value ? trigger : null;
    }

    function toggle(s) {
      if (props.disabled) {
        return;
      }
      if (typeof s === 'boolean') {
        show.value = s;
      } else {
        show.value = !show.value;
      }
      if (props.appendToBody) {
        if (show.value) {
          dropdown.value.style.display = 'block';
          const positionElement = props.positionElement || element.value;
          setDropdownPosition(dropdown.value, positionElement, props);
        } else {
          dropdown.value?.removeAttribute('style');
        }
      }
      emit('update:modelValue', show.value);
    }

    function windowClicked(event) {
      const target = event.target;
      if (show.value && target) {
        let targetInNotCloseElements = false;
        if (props.notCloseElements) {
          for (let i = 0, l = props.notCloseElements.length; i < l; i++) {
            const isTargetInElement =
              props.notCloseElements[i].contains(target);
            let shouldBreak = isTargetInElement;
            /* istanbul ignore else */
            if (props.appendToBody) {
              const isTargetInDropdown = dropdown.value?.contains(target);
              const isElInElements =
                props.notCloseElements.indexOf(element.value) >= 0;
              shouldBreak =
                isTargetInElement || (isTargetInDropdown && isElInElements);
            }
            if (shouldBreak) {
              targetInNotCloseElements = true;
              break;
            }
          }
        }
        const targetInDropdownBody = dropdown.value?.contains(target);
        const targetInTrigger =
          element.value?.contains(target) && !targetInDropdownBody;
        // normally, a dropdown select event is handled by @click that trigger after @touchend
        // then @touchend event have to be ignore in this case
        const targetInDropdownAndIsTouchEvent =
          targetInDropdownBody && event.type === 'touchend';
        if (
          !targetInTrigger &&
          !targetInNotCloseElements &&
          !targetInDropdownAndIsTouchEvent
        ) {
          toggle(false);
        }
      }
    }

    onMounted(() => {
      initTrigger();
      if (triggerEl.value) {
        on(triggerEl.value, EVENTS.CLICK, toggle);
        on(triggerEl.value, EVENTS.KEY_DOWN, onKeyPress);
      }
      on(dropdown.value, EVENTS.KEY_DOWN, onKeyPress);
      on(window, EVENTS.CLICK, windowClicked);
      on(window, EVENTS.TOUCH_END, windowClicked);
      if (props.modelValue) {
        toggle(true);
      }
    });

    onBeforeUnmount(() => {
      if (triggerEl.value) {
        off(triggerEl.value, EVENTS.CLICK, toggle);
        off(triggerEl.value, EVENTS.KEY_DOWN, onKeyPress);
      }
      off(dropdown.value, EVENTS.KEY_DOWN, onKeyPress);
      off(window, EVENTS.CLICK, windowClicked);
      off(window, EVENTS.TOUCH_END, windowClicked);
    });

    watch(
      () => props.modelValue,
      (value) => {
        toggle(value);
      }
    );

    return () => {
      const Tag = props.tag;
      return (
        <Tag
          ref={element}
          class={{
            'btn-group': props.tag === DEFAULT_TAG,
            dropdown: !props.dropup,
            dropup: props.dropup,
            open: show.value,
          }}
        >
          {slots.default?.()}
          <Teleport to="body" disabled={!props.appendToBody || !show.value}>
            <ul
              ref={dropdown}
              class={{
                'dropdown-menu': true,
                'dropdown-menu-right': props.menuRight,
              }}
            >
              {slots.dropdown?.()}
            </ul>
          </Teleport>
        </Tag>
      );
    };
  },
});
</script>
