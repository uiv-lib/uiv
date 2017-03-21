import utils from './../../utils/domUtils'

const eventType = {
  hover: {show: 'mouseenter', hide: 'mouseleave'},
  focus: {show: 'focus', hide: 'blur'}
}

const toggle = (el) => {
  if (el.$$tooltip) {
    hide(el)
  } else {
    show(el)
  }
}

const show = (el) => {
  let props = el.$$binding.value
  if (!props || props.enable === false) {
    return
  }
  let placement = props.placement || 'top'
  if (el.$$tooltip) {
    el.$$tooltip.offsetHeight
    el.$$tooltip.className = `tooltip fade ${placement} in`
  } else {
    let appendToSelector = props.appendTo || 'body'
    let container = document.querySelector(appendToSelector)
    let tooltip = document.createElement('div')
    let text = typeof props.text !== 'undefined' ? props.text : props
    tooltip.setAttribute('role', 'tooltip')
    tooltip.className = `tooltip fade ${placement}`
    tooltip.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${text}</div>`
    container.appendChild(tooltip)
    utils.setTooltipPosition(tooltip, el, placement, appendToSelector)
    tooltip.offsetHeight
    tooltip.className += ' in'
    el.$$tooltip = tooltip
  }
}

const hide = (el) => {
  let props = el.$$binding.value
  if (el.$$tooltip) {
    let transitionEnd = utils.whichTransitionEvent(el.$$tooltip)
    if (transitionEnd) {
      el.$$tooltip.className = `tooltip fade ${props.placement || 'top'}`
      el.$$tooltip.addEventListener(transitionEnd, () => {
        try {
          el.$$tooltip.parentNode.removeChild(el.$$tooltip)
          delete el.$$tooltip
        } catch (e) {
          // Silent
        }
      })
    } else {
      el.$$tooltip.parentNode.removeChild(el.$$tooltip)
      delete el.$$tooltip
    }
  }
}

export default Vue => {
  Vue.directive('tooltip', {
    bind (el, binding) {
      el.$$binding = binding
      el.$$trigger = binding.value.trigger || 'hover'
      el.$$toggleHandler = () => {
        toggle(el)
      }
      el.$$showHandler = () => {
        show(el)
      }
      el.$$hideHandler = () => {
        hide(el)
      }
      if (el.$$trigger === 'click') {
        el.addEventListener('click', el.$$toggleHandler)
      } else {
        el.addEventListener(eventType[el.$$trigger].show, el.$$showHandler)
        el.addEventListener(eventType[el.$$trigger].hide, el.$$hideHandler)
      }
    },
    update (el, binding) {
      el.$$binding = binding
      let trigger = binding.value.trigger || 'hover'
      if (el.$$trigger !== trigger) {
        if (el.$$trigger === 'click') {
          el.removeEventListener('click', el.$$toggleHandler)
        } else {
          el.removeEventListener(eventType[el.$$trigger].show, el.$$showHandler)
          el.removeEventListener(eventType[el.$$trigger].hide, el.$$hideHandler)
        }
        el.$$trigger = trigger
        if (el.$$trigger === 'click') {
          el.addEventListener('click', el.$$toggleHandler)
        } else {
          el.addEventListener(eventType[el.$$trigger].show, el.$$showHandler)
          el.addEventListener(eventType[el.$$trigger].hide, el.$$hideHandler)
        }
      }
    },
    unbind (el) {
      if (el.$$trigger === 'click') {
        el.removeEventListener('click', el.$$toggleHandler)
      } else {
        el.removeEventListener(eventType[el.$$trigger].show, el.$$showHandler)
        el.removeEventListener(eventType[el.$$trigger].hide, el.$$hideHandler)
      }
    }
  })
}
