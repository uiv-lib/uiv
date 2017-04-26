const EVENTS = {
  MOUSE_ENTER: 'mouseenter',
  MOUSE_LEAVE: 'mouseleave',
  FOCUS: 'focus',
  BLUR: 'blur',
  CLICK: 'click',
  INPUT: 'input',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  KEY_PRESS: 'keypress'
}

const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  HOVER_FOCUS: 'hover-focus',
  OUTSIDE_CLICK: 'outside-click',
  MANUAL: 'manual'
}

const PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
}

export default {
  events: EVENTS,
  triggers: TRIGGERS,
  placements: PLACEMENTS,
  on (element, event, handler) {
    element.addEventListener(event, handler)
  },
  off (element, event, handler) {
    element.removeEventListener(event, handler)
  },
  removeFromDom (element) {
    try {
      element.parentNode.removeChild(element)
    } catch (e) {
      // Silent
    }
  },
  ensureElementMatchesFunction () {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          let matches = (this.document || this.ownerDocument).querySelectorAll(s)
          let i = matches.length
          while (--i >= 0 && matches.item(i) !== this) {
          }
          return i > -1
        }
    }
  },
  addClass (element, className) {
    if (element.className) {
      let classes = element.className.split(' ')
      if (classes.indexOf(className) < 0) {
        classes.push(className)
        element.className = classes.join(' ')
      }
    } else {
      element.className = className
    }
  },
  removeClass (element, className) {
    if (element.className) {
      let classes = element.className.split(' ')
      let newClasses = []
      for (let i = 0, l = classes.length; i < l; i++) {
        if (classes[i] !== className) {
          newClasses.push(classes[i])
        }
      }
      element.className = newClasses.join(' ')
    }
  },
  hasClass (element, className) {
    let classes = element.className.split(' ')
    for (let i = 0, l = classes.length; i < l; i++) {
      if (classes[i] === className) {
        return true
      }
    }
    return false
  },
  getViewportSize () {
    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    return {width, height}
  },
  setDropdownPosition (dropdown, trigger, options = {}) {
    let doc = document.documentElement
    let containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    let containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    let rect = trigger.getBoundingClientRect()
    let dropdownRect = dropdown.getBoundingClientRect()
    dropdown.style.right = 'auto'
    dropdown.style.bottom = 'auto'
    if (options.menuRight) {
      dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px'
    } else {
      dropdown.style.left = containerScrollLeft + rect.left + 'px'
    }
    if (options.dropup) {
      dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + 'px'
    } else {
      dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px'
    }
  },
  isAvailableAtPosition (trigger, popup, placement) {
    let triggerRect = trigger.getBoundingClientRect()
    let popupRect = popup.getBoundingClientRect()
    let viewPortSize = this.getViewportSize()
    let available
    switch (placement) {
      case PLACEMENTS.TOP:
        available = triggerRect.top >= popupRect.height
        break
      case PLACEMENTS.RIGHT:
        available = triggerRect.right + popupRect.width <= viewPortSize.width
        break
      case PLACEMENTS.BOTTOM:
        available = triggerRect.bottom + popupRect.height <= viewPortSize.height
        break
      case PLACEMENTS.LEFT:
        available = triggerRect.left - popupRect.width >= 0
        break
    }
    return available
  },
  setTooltipPosition (tooltip, trigger, placement, auto, appendToSelector) {
    let container
    let containerScrollTop
    let containerScrollLeft
    if (typeof appendToSelector === 'undefined' || appendToSelector === 'body') {
      container = document.body
      let doc = document.documentElement
      containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    } else {
      container = document.querySelector(appendToSelector)
      containerScrollLeft = container.scrollLeft
      containerScrollTop = container.scrollTop
    }
    // auto adjust placement
    if (auto) {
      let placements = [PLACEMENTS.TOP, PLACEMENTS.RIGHT, PLACEMENTS.BOTTOM, PLACEMENTS.LEFT]
      if (!this.isAvailableAtPosition(trigger, tooltip, placement)) {
        for (let i = 0, l = placements.length; i < l; i++) {
          for (let j = 0; j < l; j++) {
            this.removeClass(tooltip, placements[j])
          }
          this.addClass(tooltip, placements[i])
          if (this.isAvailableAtPosition(trigger, tooltip, placements[i])) {
            placement = placements[i]
            break
          }
        }
      }
    }
    // fix left and top for tooltip
    let rect = trigger.getBoundingClientRect()
    let tooltipRect = tooltip.getBoundingClientRect()
    if (placement === PLACEMENTS.BOTTOM) {
      tooltip.style.top = containerScrollTop + rect.top + rect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    } else if (placement === PLACEMENTS.LEFT) {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left - tooltipRect.width + 'px'
    } else if (placement === PLACEMENTS.RIGHT) {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width + 'px'
    } else {
      tooltip.style.top = containerScrollTop + rect.top - tooltipRect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    }
  },
  hasScrollbar (element) {
    return element.scrollHeight > element.clientHeight
  },
  scrollbarWidth: (() => {
    let scrollbarWidth = null
    return (recalculate) => {
      if (recalculate === null) {
        recalculate = false
      }
      if ((scrollbarWidth !== null) && !recalculate) {
        return scrollbarWidth
      }
      if (document.readyState === 'loading') {
        return null
      }
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px'
      div1.style.overflow = 'scroll'
      div2.style.overflow = 'hidden'
      document.body.appendChild(div1)
      document.body.appendChild(div2)
      scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight)
      document.body.removeChild(div1)
      document.body.removeChild(div2)
      return scrollbarWidth
    }
  })(),
  toggleBodyOverflow (enable) {
    if (enable) {
      document.body.style.paddingRight = null
    } else {
      if (this.hasScrollbar(document.documentElement)) {
        document.body.style.paddingRight = `${this.scrollbarWidth()}px`
      }
    }
  }
}
