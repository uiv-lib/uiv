import { TYPES } from '../../constants/messagebox.constants'
import Local from '../../mixins/locale.mixin'
import Modal from '../../components/modal/Modal.vue'
import Btn from '../../components/button/Btn'
import { isExist } from '../../utils/object.utils'

export default {
  mixins: [Local],
  components: { Modal, Btn },
  props: {
    backdrop: null,
    title: String,
    content: String,
    html: {
      type: Boolean,
      default: false
    },
    okText: String,
    okType: {
      type: String,
      default: 'primary'
    },
    cancelText: String,
    cancelType: {
      type: String,
      default: 'default'
    },
    type: {
      type: Number,
      default: TYPES.ALERT
    },
    size: {
      type: String,
      default: 'sm'
    },
    cb: {
      type: Function,
      required: true
    },
    validator: {
      type: Function,
      default: () => null
    },
    customClass: null,
    defaultValue: String,
    inputType: {
      type: String,
      default: 'text'
    },
    autoFocus: {
      type: String,
      default: 'ok'
    },
    reverseButtons: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      TYPES,
      show: false,
      input: '',
      dirty: false
    }
  },
  mounted () {
    if (this.defaultValue) {
      this.input = this.defaultValue
    }
  },
  computed: {
    closeOnBackdropClick () {
      // use backdrop prop if exist
      // otherwise, only not available if render as alert
      return isExist(this.backdrop) ? Boolean(this.backdrop) : (this.type !== TYPES.ALERT)
    },
    inputError () {
      return this.validator(this.input)
    },
    inputNotValid () {
      return this.dirty && this.inputError
    },
    okBtnText () {
      return this.okText || this.t('uiv.modal.ok')
    },
    cancelBtnText () {
      return this.cancelText || this.t('uiv.modal.cancel')
    }
  },
  methods: {
    toggle (show, msg) {
      this.$refs.modal.toggle(show, msg)
    },
    validate () {
      this.dirty = true
      if (!isExist(this.inputError)) {
        this.toggle(false, { value: this.input })
      }
    }
  }
}
