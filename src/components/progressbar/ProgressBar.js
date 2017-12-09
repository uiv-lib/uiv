import {mergeData} from 'vue-functional-data-merge'
import ProgressBarStack from './ProgressBarStack'

export default {
  functional: true,
  render (h, {props, data, children}) {
    return h(
      'div',
      mergeData(data, {class: 'progress'}),
      children && children.length ? children : [h(ProgressBarStack, {props})]
    )
  }
}
