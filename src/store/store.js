'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  asideShow: false,
  asideItems: [
    {path: '/getting-started', label: 'Getting Started'},
    {
      label: 'Components',
      show: true,
      items: [
        {path: '/alert', label: 'Alert'},
        {path: '/carousel', label: 'Carousel'},
        {path: '/collapse', label: 'Collapse'},
        {path: '/date-picker', label: 'Date Picker'},
        {path: '/dropdown', label: 'Dropdown'},
        {path: '/modal', label: 'Modal'},
        {path: '/pagination', label: 'Pagination'},
        {path: '/popover', label: 'Popover'},
        {path: '/tabs', label: 'Tabs'},
        {path: '/time-picker', label: 'Time Picker'},
        {path: '/tooltip', label: 'Tooltip'},
        {path: '/typeahead', label: 'Typeahead'}
      ]
    }
  ]
}

export default new Vuex.Store({
  state,
  mutations
})
