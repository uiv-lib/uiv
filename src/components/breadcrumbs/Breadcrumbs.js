import {mergeData} from 'vue-functional-data-merge'
/* eslint-disable no-unused-vars */
import BreadcrumbItem from './BreadcrumbItem.js'

export default {
  functional: true,
  render (h, {props, data, children}) {
    let slot = []
    if (children && children.length) {
      slot = children
    } else if (props.items) {
      slot = props.items.map((item, index) => {
        return (
          <BreadcrumbItem
            key={item.hasOwnProperty('key') ? item.key : index}
            active={item.hasOwnProperty('active') ? item.active : index === props.items.length - 1}
            href={item.href}
            target={item.target}
            to={item.to}
            replace={item.replace}
            append={item.append}
            exact={item.exact}>
            {item.text}
          </BreadcrumbItem>
        )
      })
    }
    return h('ol', mergeData(data, {class: 'breadcrumb'}), slot)
  },
  props: {
    items: Array
  }
}
