import mergeData from 'vue-functional-data-merge'
import BtnGroup from './BtnGroup'

const INPUT_TYPE_CHECKBOX = 'checkbox'
const INPUT_TYPE_RADIO = 'radio'

export default {
  functional: true,
  render (h, {children, props, data}) {
    // event listeners
    const listeners = data.on || {}
    // checkbox: model contain inputValue
    // radio: model === inputValue
    const isInputActive = props.inputType === INPUT_TYPE_CHECKBOX ? props.value.indexOf(props.inputValue) >= 0 : props.value === props.inputValue
    // button class
    const classes = {
      btn: true,
      active: props.inputType ? isInputActive : props.active,
      disabled: props.disabled,
      'btn-block': props.block,
      [`btn-${props.type}`]: Boolean(props.type),
      [`btn-${props.size}`]: Boolean(props.size)
    }
    // prevent event for disabled links
    const on = {
      click (e) {
        if (props.disabled && e instanceof Event) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }
    // render params
    let tag, options, slot

    if (props.href) {
      // is native link
      tag = 'a'
      slot = children
      options = mergeData(data, {
        on,
        class: classes,
        attrs: {
          role: 'button',
          href: props.href,
          target: props.target
        }
      })
    } else if (props.to) {
      // is vue router link
      tag = 'router-link'
      slot = children
      options = mergeData(data, {
        nativeOn: on,
        class: classes,
        props: {
          event: props.disabled ? '' : 'click', // prevent nav while disabled
          to: props.to,
          replace: props.replace,
          append: props.append,
          exact: props.exact
        },
        attrs: {
          role: 'button'
        }
      })
    } else if (props.inputType) {
      // is input checkbox or radio
      tag = 'label'
      options = mergeData(data, {
        on,
        class: classes
      })
      slot = [
        h('input', {
          attrs: {
            autocomplete: 'off',
            type: props.inputType,
            checked: isInputActive ? 'checked' : null,
            disabled: props.disabled
          },
          domProps: {
            checked: isInputActive // required
          },
          on: {
            change () {
              if (props.inputType === INPUT_TYPE_CHECKBOX) {
                if (isInputActive) {
                  props.value.splice(props.value.indexOf(props.inputValue), 1)
                } else {
                  props.value.push(props.inputValue)
                }
              } else {
                listeners['input'](props.inputValue)
              }
            }
          }
        }),
        children
      ]
    } else if (props.justified) {
      // is in justified btn-group
      tag = BtnGroup
      options = {}
      slot = [
        h('button', mergeData(data, {
          on,
          class: classes,
          attrs: {
            type: props.nativeType,
            disabled: props.disabled
          }
        }), children)
      ]
    } else {
      // is button
      tag = 'button'
      slot = children
      options = mergeData(data, {
        on,
        class: classes,
        attrs: {
          type: props.nativeType,
          disabled: props.disabled
        }
      })
    }

    return h(tag, options, slot)
  },
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: String,
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // <a> props
    href: String,
    target: {
      type: String,
      default: '_self'
    },
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    },
    // <input> props
    value: null,
    inputValue: null,
    inputType: {
      type: String,
      validator (value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      }
    }
  }
}
