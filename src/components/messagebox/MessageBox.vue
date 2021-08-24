<template>
  <modal
    ref="modal"
    v-model="show"
    auto-focus
    :size="size"
    :title="title"
    :header="!!title"
    :backdrop="closeOnBackdropClick"
    :cancel-text="cancelText"
    :ok-text="okText"
    :class="customClass"
    @hide="cb"
  >
    <div v-if="html" v-html="content"></div>
    <p v-else>{{ content }}</p>
    <div v-if="type === TYPES.PROMPT">
      <div class="form-group" :class="{ 'has-error': inputNotValid }">
        <input
          ref="input"
          v-model="input"
          :type="inputType"
          class="form-control"
          required
          data-action="auto-focus"
          @change="dirty = true"
          @keyup.enter="validate"
        />
        <span v-show="inputNotValid" class="help-block">{{ inputError }}</span>
      </div>
    </div>
    <template v-if="type === TYPES.ALERT" slot="footer">
      <btn
        :type="okType"
        :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
        @click="toggle(false, 'ok')"
        v-text="okBtnText"
      />
    </template>
    <template v-else slot="footer">
      <template v-if="reverseButtons">
        <btn
          v-if="type === TYPES.CONFIRM"
          :type="okType"
          :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
          @click="toggle(false, 'ok')"
          v-text="okBtnText"
        />
        <btn v-else :type="okType" @click="validate" v-text="okBtnText" />
        <btn
          :type="cancelType"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          @click="toggle(false, 'cancel')"
          v-text="cancelBtnText"
        />
      </template>
      <template v-else>
        <btn
          :type="cancelType"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          @click="toggle(false, 'cancel')"
          v-text="cancelBtnText"
        />
        <btn
          v-if="type === TYPES.CONFIRM"
          :type="okType"
          :data-action="autoFocus === 'ok' ? 'auto-focus' : ''"
          @click="toggle(false, 'ok')"
          v-text="okBtnText"
        />
        <btn v-else :type="okType" @click="validate" v-text="okBtnText" />
      </template>
    </template>
  </modal>
</template>

<script src="./MessageBox.js" />
