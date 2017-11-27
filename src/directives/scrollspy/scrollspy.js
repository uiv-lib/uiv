import {
  addClass,
  removeClass,
  EVENTS,
  on,
  off,
  isElement,
  getViewportSize,
  getClosest,
  getParents
} from '@src/utils/domUtils'
import {isString} from '@src/utils/objectUtils'

function ScrollSpy (element, options = {}) {
  this.el = element
  this.opts = Object.assign({}, ScrollSpy.DEFAULTS, options)
  const target = this.opts.target
  if (target === 'body' || target === document.body) {
    this.scrollElement = window
  } else if (isElement(target)) {
    this.scrollElement = target
  } else if (isString(target)) {
    this.scrollElement = document.querySelector(target)
  }
  this.selector = 'li > a'
  this.offsets = []
  this.targets = []
  this.activeTarget = null
  this.scrollHeight = 0
  if (this.scrollElement) {
    this.refresh()
    this.process()
  }
}

ScrollSpy.DEFAULTS = {
  offset: 10
}

ScrollSpy.prototype.getScrollHeight = function () {
  return this.scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

ScrollSpy.prototype.refresh = function () {
  this.offsets = []
  this.targets = []
  this.scrollHeight = this.getScrollHeight()
  let list = [...this.el.querySelectorAll(this.selector)]
  const isWindow = this.scrollElement === window
  list
    .map(ele => {
      const href = ele.getAttribute('href')
      if (/^#./.test(href)) {
        const doc = document.documentElement
        const rootEl = isWindow ? document : this.scrollElement
        const hrefEl = rootEl.querySelector(`[id='${href.slice(1)}']`)
        const windowScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        const offset = isWindow ? hrefEl.getBoundingClientRect().top + windowScrollTop : hrefEl.offsetTop + this.scrollElement.scrollTop
        return [offset, href]
      } else {
        return null
      }
    })
    .filter(item => item)
    .sort((a, b) => a[0] - b[0])
    .forEach(item => {
      this.offsets.push(item[0])
      this.targets.push(item[1])
    })
  console.log(this.offsets, this.targets)
}

ScrollSpy.prototype.process = function () {
  const isWindow = this.scrollElement === window
  const scrollTop = (isWindow ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset
  const scrollHeight = this.getScrollHeight()
  const scrollElementHeight = isWindow ? getViewportSize().height : this.scrollElement.getBoundingClientRect().height
  const maxScroll = this.opts.offset + scrollHeight - scrollElementHeight
  const offsets = this.offsets
  const targets = this.targets
  const activeTarget = this.activeTarget
  let i
  if (this.scrollHeight !== scrollHeight) {
    this.refresh()
  }
  if (scrollTop >= maxScroll) {
    return activeTarget !== (i = targets[targets.length - 1]) && this.activate(i)
  }
  if (activeTarget && scrollTop < offsets[0]) {
    this.activeTarget = null
    return this.clear()
  }
  for (i = offsets.length; i--;) {
    activeTarget !== targets[i] &&
    scrollTop >= offsets[i] &&
    (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) &&
    this.activate(targets[i])
  }
}

ScrollSpy.prototype.activate = function (target) {
  this.activeTarget = target
  this.clear()
  const selector = this.selector +
    '[data-target="' + target + '"],' +
    this.selector + '[href="' + target + '"]'
  let active = [...this.el.querySelectorAll(selector)]
  active.forEach(ele => {
    getParents(ele, 'li')
      .forEach(item => {
        addClass(item, 'active')
      })
    if (getParents(ele, '.dropdown-menu').length) {
      addClass(getClosest(ele, 'li.dropdown'), 'active')
    }
  })
}

ScrollSpy.prototype.clear = function () {
  let list = [...this.el.querySelectorAll(this.selector)]
  list.forEach(ele => {
    getParents(ele, '.active', this.opts.target).forEach(item => {
      removeClass(item, 'active')
    })
  })
}

const INSTANCE = '_uiv_scrollspy_instance'
const events = [EVENTS.RESIZE, EVENTS.SCROLL]

const bind = (el, binding) => {
  // console.log('bind')
  unbind(el)
  const scrollSpy = new ScrollSpy(el, binding.value)
  scrollSpy.handler = () => {
    scrollSpy.process()
  }
  events.forEach(event => {
    on(window, event, scrollSpy.handler)
  })
  el[INSTANCE] = scrollSpy
}

const unbind = (el) => {
  // console.log('unbind')
  let instance = el[INSTANCE]
  if (instance) {
    events.forEach(event => {
      off(window, event, instance.handler)
    })
    delete el[INSTANCE]
  }
}

const update = (el, binding) => {
  // console.log('update')
  if (binding.value !== binding.oldValue) {
    bind(el, binding)
  }
}

export default {bind, unbind, update}
