import Carousel from './carousel/Carousel.vue'
import Slide from './carousel/Slide.vue'
import Collapse from './collapse/Collapse.vue'
import Dropdown from './dropdown/Dropdown.vue'
import Modal from './modal/Modal.vue'
import Tab from './tabs/Tab.vue'
import Tabs from './tabs/Tabs.vue'
import DatePicker from './datepicker/DatePicker.vue'
import Affix from './affix/Affix.vue'
import Alert from './alert/Alert.vue'
import Pagination from './pagination/Pagination.vue'
import Tooltip from './tooltip/Tooltip.vue'
import Popover from './popover/Popover.vue'
import TimePicker from './timepicker/TimePicker.vue'
import Typeahead from './typeahead/Typeahead.vue'
import ProgressBar from './progressbar/ProgressBar.vue'
import ProgressBarStack from './progressbar/ProgressBarStack.vue'
import locale from './../locale'

const components = {
  Affix,
  Tooltip,
  Carousel,
  Slide,
  Collapse,
  Dropdown,
  Modal,
  Tab,
  Tabs,
  DatePicker,
  Alert,
  Pagination,
  Popover,
  TimePicker,
  Typeahead,
  ProgressBar,
  ProgressBarStack
}

const install = (Vue, options = {}) => {
  locale.use(options.locale)
  locale.i18n(options.i18n)
  for (let key in components) {
    Vue.component(key, components[key])
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  Affix,
  Tooltip,
  Carousel,
  Slide,
  Collapse,
  Dropdown,
  Modal,
  Tab,
  Tabs,
  DatePicker,
  Alert,
  Pagination,
  Popover,
  TimePicker,
  Typeahead,
  ProgressBar,
  ProgressBarStack
}
