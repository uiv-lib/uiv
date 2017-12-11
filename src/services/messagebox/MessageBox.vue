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
    <p>{{content}}</p>
    <div v-if="type===TYPES.PROMPT">
      <div class="form-group" :class="{'has-error':inputNotValid}">
        <input
          ref="input"
          type="text"
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
      <btn :type="okType" @click="toggle(false,'ok')" data-action="auto-focus">{{okBtnText}}</btn>
    </template>
    <template slot="footer" v-else>
      <btn :type="cancelType" @click="toggle(false,'cancel')">{{cancelBtnText}}</btn>
      <btn :type="okType" v-if="type===TYPES.CONFIRM" @click="toggle(false,'ok')" data-action="auto-focus">
        <template>{{okBtnText}}</template>
      </btn>
      <btn :type="okType" v-else @click="validate">{{okBtnText}}</btn>
    </template>
  </modal>
</template>

<script>
  import {TYPES} from './constants'
  import Local from '@src/mixins/localeMixin'
  import Modal from '@src/components/modal/Modal.vue'
  import Btn from '@src/components/button/Btn'
  import {isExist} from '@src/utils/objectUtils'

  export default {
    mixins: [Local],
    components: {Modal, Btn},
    props: {
      backdrop: null,
      title: String,
      content: String,
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
      customClass: null
    },
    data () {
      return {
        TYPES,
        show: false,
        input: '',
        dirty: false
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
