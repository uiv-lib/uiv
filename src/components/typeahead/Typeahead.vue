<template>
  <dropdown
    ref="dropdown"
    v-model="open"
    tag="section"
    :append-to-body="appendToBody"
    :not-close-elements="elements"
    :position-element="inputEl"
  >
    <template #dropdown>
      <slot
        name="item"
        :items="items"
        :active-index="activeIndex"
        :select="selectItem"
        :highlight="highlight"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="{ active: activeIndex === index }"
        >
          <a href="#" @click.prevent="selectItem(item)">
            <span v-html="highlight(item)"></span>
          </a>
        </li>
      </slot>
      <slot v-if="!items || items.length === 0" name="empty" />
    </template>
  </dropdown>
</template>

<script setup>
import { request } from '../../utils/http.utils';
import { isString } from '../../utils/object.utils';
import {
  on,
  off,
  EVENTS,
  getElementBySelectorOrRef,
} from '../../utils/dom.utils';
import Dropdown from '../dropdown/Dropdown.vue';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  useSlots,
} from 'vue';

const slots = useSlots();

const props = defineProps({
  modelValue: { type: null, required: true },
  data: { type: Array, default: undefined },
  itemKey: { type: String, default: undefined },
  appendToBody: { type: Boolean, default: false },
  ignoreCase: { type: Boolean, default: true },
  matchStart: { type: Boolean, default: false },
  forceSelect: { type: Boolean, default: false },
  forceClear: { type: Boolean, default: false },
  limit: { type: Number, default: 10 },
  asyncSrc: { type: String, default: undefined },
  asyncKey: { type: String, default: undefined },
  asyncFunction: { type: Function, default: undefined },
  debounce: { type: Number, default: 200 },
  openOnFocus: { type: Boolean, default: true },
  openOnEmpty: { type: Boolean, default: false },
  target: { required: true, type: null },
  preselect: { type: Boolean, default: true },
});
const emit = defineEmits([
  'update:modelValue',
  'loading',
  'loaded',
  'loaded-error',
  'selected-item-changed',
]);

const inputEl = ref(null);
const items = ref([]);
const activeIndex = ref(0);
const elements = ref([]);
const open = ref(false);
const dropdown = ref(null);

let dropdownMenuEl = null;
let timeoutID = 0;

const regexOptions = computed(() => {
  let options = '';
  if (props.ignoreCase) {
    options += 'i';
  }
  if (!props.matchStart) {
    options += 'g';
  }
  return options;
});

watch(
  () => props.target,
  (el) => {
    removeListeners();
    initInputElByTarget(el);
    initListeners();
  }
);
watch(
  () => props.modelValue,
  (value) => {
    setInputTextByValue(value);
  }
);
watch(
  () => activeIndex.value,
  (index) => {
    index >= 0 && emit('selected-item-changed', index);
  }
);

onMounted(async () => {
  await nextTick();
  initInputElByTarget(props.target);
  initListeners();
  dropdownMenuEl = dropdown.value.$el.querySelector('.dropdown-menu');
  // set input text if v-model not empty
  if (props.modelValue) {
    setInputTextByValue(props.modelValue);
  }
});

onBeforeUnmount(() => {
  removeListeners();
});

function setInputTextByValue(value) {
  if (isString(value)) {
    // direct
    inputEl.value.value = value;
  } else if (value) {
    // is object
    inputEl.value.value = props.itemKey ? value[props.itemKey] : value;
  } else if (value === null) {
    // is null or undefined or something else not valid
    inputEl.value.value = '';
  }
}

function hasEmptySlot() {
  return !!slots.empty;
}

function initInputElByTarget(target) {
  if (!target) {
    return;
  }
  inputEl.value = getElementBySelectorOrRef(target);
}

function initListeners() {
  if (inputEl.value) {
    elements.value = [inputEl.value];
    on(inputEl.value, EVENTS.FOCUS, inputFocused);
    on(inputEl.value, EVENTS.BLUR, inputBlured);
    on(inputEl.value, EVENTS.INPUT, inputChanged);
    on(inputEl.value, EVENTS.KEY_DOWN, inputKeyPressed);
  }
}

function removeListeners() {
  elements.value = [];
  if (inputEl.value) {
    off(inputEl.value, EVENTS.FOCUS, inputFocused);
    off(inputEl.value, EVENTS.BLUR, inputBlured);
    off(inputEl.value, EVENTS.INPUT, inputChanged);
    off(inputEl.value, EVENTS.KEY_DOWN, inputKeyPressed);
  }
}

function prepareItems(data, disableFilters = false) {
  if (disableFilters) {
    items.value = data.slice(0, props.limit);
    return;
  }
  items.value = [];
  activeIndex.value = props.preselect ? 0 : -1;
  for (let i = 0, l = data.length; i < l; i++) {
    const item = data[i];
    let key = props.itemKey ? item[props.itemKey] : item;
    key = key.toString();
    let index = -1;
    if (props.ignoreCase) {
      index = key.toLowerCase().indexOf(inputEl.value.value.toLowerCase());
    } else {
      index = key.indexOf(inputEl.value.value);
    }
    if (props.matchStart ? index === 0 : index >= 0) {
      items.value.push(item);
    }
    if (items.value.length >= props.limit) {
      break;
    }
  }
}

function fetchItems(value, debounce) {
  clearTimeout(timeoutID);
  if (value === '' && !props.openOnEmpty) {
    open.value = false;
  } else if (props.data) {
    prepareItems(props.data);
    open.value = hasEmptySlot() || Boolean(items.value.length);
  } else if (props.asyncSrc) {
    timeoutID = setTimeout(() => {
      emit('loading');
      request(props.asyncSrc + encodeURIComponent(value))
        .then((data) => {
          if (inputEl.value.matches(':focus')) {
            prepareItems(props.asyncKey ? data[props.asyncKey] : data, true);
            open.value = hasEmptySlot() || Boolean(items.value.length);
          }
          emit('loaded');
        })
        .catch((err) => {
          console.error(err);
          emit('loaded-error');
        });
    }, debounce);
  } else if (props.asyncFunction) {
    const cb = (data) => {
      if (inputEl.value.matches(':focus')) {
        prepareItems(data, true);
        open.value = hasEmptySlot() || Boolean(items.value.length);
      }
      emit('loaded');
    };
    timeoutID = setTimeout(() => {
      emit('loading');
      props.asyncFunction(value, cb);
    }, debounce);
  }
}

function inputChanged() {
  const value = inputEl.value.value;
  fetchItems(value, props.debounce);
  emit('update:modelValue', props.forceSelect ? undefined : value);
}

function inputFocused() {
  if (props.openOnFocus) {
    const value = inputEl.value.value;
    fetchItems(value, 0);
  }
}

async function inputBlured() {
  if (!dropdownMenuEl.matches(':hover')) {
    open.value = false;
  }
  if (inputEl.value && props.forceClear) {
    await nextTick();
    if (typeof props.modelValue === 'undefined') {
      inputEl.value.value = '';
    }
  }
}

function inputKeyPressed(event) {
  event.stopPropagation();
  if (open.value) {
    switch (event.keyCode) {
      case 13:
        if (activeIndex.value >= 0) {
          selectItem(items.value[activeIndex.value]);
        } else {
          open.value = false;
        }
        event.preventDefault();
        break;
      case 27:
        open.value = false;
        break;
      case 38:
        activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : 0;
        break;
      case 40: {
        const maxIndex = items.value.length - 1;
        activeIndex.value =
          activeIndex.value < maxIndex ? activeIndex.value + 1 : maxIndex;
        break;
      }
    }
  }
}

function selectItem(item) {
  emit('update:modelValue', item);
  open.value = false;
}

function highlight(item) {
  const value = props.itemKey ? item[props.itemKey] : item;
  const inputValue = inputEl.value.value.replace(
    /[-[\]{}()*+?.,\\^$|#\s]/g,
    '\\$&'
  );
  return value.replace(
    new RegExp(`${inputValue}`, regexOptions.value),
    '<b>$&</b>'
  );
}
</script>
