import { enableAutoDestroy } from '@vue/test-utils'

window.scrollTo = (x, y) => {
  document.documentElement.scrollTop = y
  document.documentElement.scrollLeft = x
  window.pageYOffset = y
  window.pageXOffset = x
  window.dispatchEvent(new Event('resize'))
}

enableAutoDestroy(afterEach)

afterEach(() => {
  document.body.innerHTML = ''
})
