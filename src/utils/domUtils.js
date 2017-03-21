'use strict'

export default {
  whichTransitionEvent (el) {
    let transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }
    for (let t in transitions) {
      if (typeof el.style[t] !== 'undefined') {
        return transitions[t]
      }
    }
    return ''
  },
  setTooltipPosition (tooltip, trigger, placement, appendToSelector) {
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
    let rect = trigger.getBoundingClientRect()
    let tooltipRect = tooltip.getBoundingClientRect()
    if (placement === 'top') {
      tooltip.style.top = containerScrollTop + rect.top - rect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    } else if (placement === 'bottom') {
      tooltip.style.top = containerScrollTop + rect.top + rect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    } else if (placement === 'left') {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left - tooltipRect.width + 'px'
    } else if (placement === 'right') {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width + 'px'
    }
  }
}
