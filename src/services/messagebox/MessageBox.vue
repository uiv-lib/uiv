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
      <btn type="primary" @click="toggle(false,'ok')" data-action="auto-focus">{{okText || t('uiv.modal.ok')}}</btn>
    </template>
    <template slot="footer" v-if="type===TYPES.PROMPT">
      <btn @click="toggle(false,'cancel')">{{cancelText || t('uiv.modal.cancel')}}</btn>
      <btn type="primary" @click="validate">{{okText || t('uiv.modal.ok')}}</btn>
    </template>
  </modal>
</template>

<script>
  import {TYPES} from './constants'
  import Local from '@src/mixins/locale'
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
      cancelText: String,
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
