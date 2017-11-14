export default {
  transitionDuration: 300,
  triggerEvent (elm, name, ...opts) {
    let eventName
    if (/^mouse|click/.test(name)) {
      eventName = 'MouseEvents'
    } else if (/^key/.test(name)) {
      eventName = 'KeyboardEvent'
    } else {
      eventName = 'HTMLEvents'
    }
    const evt = document.createEvent(eventName)
    evt.initEvent(name, ...opts)
    elm.dispatchEvent
      ? elm.dispatchEvent(evt)
      : elm.fireEvent('on' + name, evt)
    return elm
  },
  triggerKey (el, key, type = 'down') {
    if (document.createEventObject) {
      let eventObj = document.createEventObject()
      eventObj.keyCode = key
      el.fireEvent(`onkey${type}`, eventObj)
      eventObj.keyCode = key
    } else if (document.createEvent) {
      let eventObj = document.createEvent('Events')
      eventObj.initEvent(`key${type}`, true, true)
      eventObj.which = key
      eventObj.keyCode = key
      el.dispatchEvent(eventObj)
    }
  },
  sleep (time) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
}
