import { mergeData } from 'vue-functional-data-merge'
import BreadcrumbItem from './BreadcrumbItem.js'
import { hasOwnProperty } from '../../utils/object.utils'

export default {
  functional: true,
  render(h, { props, data, children }) {
    let slot = []
    if (children && children.length) {
      slot = children
    } else if (props.items) {
      slot = props.items.map((item, index) => {
        return h(
          BreadcrumbItem,
          {
            key: hasOwnProperty(item, 'key') ? item.key : index,
            props: {
              active: hasOwnProperty(item, 'active')
                ? item.active
                : index === props.items.length - 1,
              href: item.href,
              target: item.target,
              to: item.to,
              replace: item.replace,
              append: item.append,
              exact: item.exact,
            },
          },
          item.text
        )
      })
    }
    return h('ol', mergeData(data, { class: 'breadcrumb' }), slot)
  },
  props: {
    items: Array,
  },
}
