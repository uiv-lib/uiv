'use strict'

import hljs from './../../utils/hljsUtils'

let mixin = {
  mounted () {
    try {
      let blocks = this.$el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    } catch (e) {
      // Silent
    }
  }
}

export default mixin
