<template>
  <modal
    ref="modal"
    auto-focus
    v-model="show"
    :size="size"
    :title="title"
    :header="!!title"
    :backdrop="closeOnBackdropClick"
    :cancel-text="cancelText"
    :ok-text="okText"
    :class="customClass"
    @hide="cb">
    <div v-if="html" v-html="content"></div>
    <p v-else>{{content}}</p>
    <div v-if="type===TYPES.PROMPT">
      <div class="form-group" :class="{'has-error':inputNotValid}">
        <input
          ref="input"
          :type="inputType"
          v-model="input"
          class="form-control"
          required
          data-action="auto-focus"
          @change="dirty=true"
          @keyup.enter="validate"/>
        <span class="help-block" v-show="inputNotValid">{{inputError}}</span>
      </div>
    </div>
    <template slot="footer" v-if="type===TYPES.ALERT">
      <btn
        :type="okType"
        @click="toggle(false,'ok')"
        :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
        v-text="okBtnText"
      />
    </template>
    <template slot="footer" v-else>
      <btn
        :type="cancelType"
        @click="toggle(false,'cancel')"
        :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
        v-text="cancelBtnText"
      />
      <btn
        :type="okType"
        v-if="type===TYPES.CONFIRM"
        @click="toggle(false,'ok')"
        :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
        v-text="okBtnText"
      />
      <btn
        :type="okType"
        v-else
        @click="validate"
        v-text="okBtnText"
      />
    </template>
  </modal>
</template>

<script>
  import {TYPES} from './constants'
  import Local from '../../mixins/localeMixin'
  import Modal from '../../components/modal/Modal.vue'
  import Btn from '../../components/button/Btn'
  import {isExist} from '../../utils/objectUtils'

  export default {
    mixins: [Local],
    components: {Modal, Btn},
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
          this.toggle(false, {value: this.input})
        }
      }
    }
  }
</script>
