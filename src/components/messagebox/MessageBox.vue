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
    <p v-else>{{ content }}</p>
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
        <span class="help-block" v-show="inputNotValid">{{ inputError }}</span>
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
      <template v-if="reverseButtons">
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
        <btn
          :type="cancelType"
          @click="toggle(false,'cancel')"
          :data-action="autoFocus === 'cancel' ? 'auto-focus' : ''"
          v-text="cancelBtnText"
        />
      </template>
      <template v-else>
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
    </template>
  </modal>
</template>

<script src="./MessageBox.js"/>
