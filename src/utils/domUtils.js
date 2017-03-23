'use strict'

export default {
  setDropdownPosition (dropdown, trigger) {
    let doc = document.documentElement
    let containerScrollLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
    let containerScrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    let rect = trigger.getBoundingClientRect()
    // let dropdownRect = dropdown.getBoundingClientRect()
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px'
    dropdown.style.left = containerScrollLeft + rect.left + 'px'
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
    if (placement === 'bottom') {
      tooltip.style.top = containerScrollTop + rect.top + rect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    } else if (placement === 'left') {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left - tooltipRect.width + 'px'
    } else if (placement === 'right') {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width + 'px'
    } else {
      tooltip.style.top = containerScrollTop + rect.top - rect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    }
  }
}
