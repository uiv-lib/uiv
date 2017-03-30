'use strict'

import types from './mutationTypes'

export default {
  [types.TOGGLE_ASIDE] (state, show) {
    if (typeof show !== 'undefined') {
      state.asideShow = !!show
    } else {
      state.asideShow = !state.asideShow
    }
  }
}
